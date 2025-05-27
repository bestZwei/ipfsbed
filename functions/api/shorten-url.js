export async function onRequestPost(context) {
  try {
    // 从环境变量中获取YOURLS配置
    // 您需要在Cloudflare Pages项目的设置中配置这些环境变量：
    // YOURLS_SIGNATURE = fec30a3e3c
    // YOURLS_API_ENDPOINT = https://url.is-an.org/yourls-api.php
    const { YOURLS_SIGNATURE, YOURLS_API_ENDPOINT } = context.env;

    if (!YOURLS_SIGNATURE || !YOURLS_API_ENDPOINT) {
      console.error('YOURLS_SIGNATURE or YOURLS_API_ENDPOINT is not configured in environment variables.');
      return new Response(JSON.stringify({ error: 'Shortener service configuration missing on server.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const requestBody = await context.request.json();
    const longUrl = requestBody.longUrl;

    if (!longUrl) {
      return new Response(JSON.stringify({ error: 'longUrl parameter is required in JSON body.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiUrl = `${YOURLS_API_ENDPOINT}?signature=${YOURLS_SIGNATURE}&action=shorturl&format=json&url=${encodeURIComponent(longUrl)}`;

    let fetchResponse;
    let responseData;
    const maxRetries = 2; // Total 3 attempts (initial + 2 retries)
    const initialRetryDelay = 500; // Milliseconds

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        fetchResponse = await fetch(apiUrl);
        responseData = await fetchResponse.json(); // YOURLS usually returns JSON, even for errors

        // Check for successful response from YOURLS
        if (fetchResponse.ok && responseData && responseData.status === 'success' && responseData.shorturl) {
          break; // Success, exit loop
        }

        // Check for "already exists" case, treat as success for retry logic
        if (responseData && responseData.status === 'fail' && responseData.message && responseData.message.includes('already exists in database')) {
          break; // Already exists, exit loop
        }
        
        // If not a clear success or "already exists"
        if (attempt < maxRetries) {
          console.warn(`YOURLS API attempt ${attempt + 1} failed or did not return expected success. Status: ${fetchResponse.status}. Retrying...`);
          // Exponential backoff or fixed delay
          await new Promise(resolve => setTimeout(resolve, initialRetryDelay * Math.pow(2, attempt)));
        } else {
          console.error(`YOURLS API final attempt ${attempt + 1} failed. Status: ${fetchResponse.status}, Data:`, responseData);
        }
      } catch (e) {
        console.error(`YOURLS API fetch/parse attempt ${attempt + 1} threw an error:`, e.message);
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, initialRetryDelay * Math.pow(2, attempt)));
        } else {
          // Last attempt failed with an exception (e.g., network error, invalid JSON from YOURLS)
          return new Response(JSON.stringify({ error: `Failed to communicate with YOURLS API after ${maxRetries + 1} attempts. Last error: ${e.message}` }), {
            status: 503, // Service Unavailable
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // Process responseData after the loop
    if (responseData && responseData.status === 'success' && responseData.shorturl) {
      return new Response(JSON.stringify({ shortUrl: responseData.shorturl }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (responseData && responseData.status === 'fail' && responseData.message && responseData.message.includes('already exists in database')) {
      // Extract the existing short URL from the error message
      const shortUrlMatch = responseData.message.match(/short URL: ([^)]+)/);
      if (shortUrlMatch && shortUrlMatch[1]) {
        const existingShortUrl = shortUrlMatch[1].startsWith('http') ? shortUrlMatch[1] : `https://${shortUrlMatch[1]}`;
        return new Response(JSON.stringify({ shortUrl: existingShortUrl }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle other error cases or if responseData is not as expected after retries
    const errorMessage = responseData ? (responseData.message || 'Failed to shorten URL via YOURLS after retries.') : 'No valid response from YOURLS API after retries.';
    console.error('YOURLS API error after all retries:', errorMessage, 'Full data:', responseData);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: fetchResponse ? (fetchResponse.status === 200 ? 502 : fetchResponse.status) : 502, // If YOURLS returned 200 but bad data, use 502. Else its status or 502.
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in shorten-url worker:', error.message, error.stack);
    return new Response(JSON.stringify({ error: 'Internal server error while shortening URL.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// 处理非POST请求
export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Only POST requests are accepted. Please send a JSON body: { "longUrl": "your_url_here" }' }), {
      status: 405, // Method Not Allowed
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }
  // 如果是POST请求，但没有被onRequestPost捕获（例如，如果移除了onRequestPost），可以在这里处理或让它自然失败
  // 对于Cloudflare Pages Functions, 命名为 onRequestPost, onRequestGet 等会自动路由。
  // 如果只有一个 onRequest, 它会处理所有方法。
  // 此处我们依赖 onRequestPost，所以这个通用的 onRequest 主要是为了明确拒绝其他方法。
  // 但实际上，如果定义了 onRequestPost，其他方法会默认404或类似，除非有更通用的 onRequest。
  // 为了清晰，保留 onRequestPost 并确保其他方法被优雅拒绝。
  // 如果上面的 onRequestPost 存在，这个 onRequest 可能不会被调用，除非路由配置特殊。
  // 最佳实践是只定义特定方法的 handlers (onRequestGet, onRequestPost, etc.)
}
