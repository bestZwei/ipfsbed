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

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'success' && data.shorturl) {
      return new Response(JSON.stringify({ shortUrl: data.shorturl }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('YOURLS API error:', data.message);
      return new Response(JSON.stringify({ error: data.message || 'Failed to shorten URL via YOURLS.' }), {
        // 如果YOURLS API本身返回200但操作失败，我们返回一个代表应用层错误的500或4xx状态码
        status: response.status === 200 ? 502 : response.status, // 502 Bad Gateway if YOURLS is up but fails
        headers: { 'Content-Type': 'application/json' },
      });
    }
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
