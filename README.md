# IPFSBED - Decentralized IPFS File Hosting Service

[English](README.md) | [中文](README.zh-CN.md)

[![Demo](https://img.shields.io/badge/Demo-Live_Preview-blue)](https://ipfsbed.is-an.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![IPFS](https://img.shields.io/badge/IPFS-Powered-65c2cb.svg)](https://ipfs.io/)

## Overview

IPFSBED is a decentralized file hosting platform built on the InterPlanetary File System (IPFS). It allows users to upload and share files of various formats through the distributed IPFS network, making content accessible globally without relying on central servers.

![IPFSBED Screenshot](img/jt.png)

## Key Features

- **Decentralized Storage**: Files are stored on the IPFS network rather than centralized servers
- **Multiple Upload Methods**: Drag & drop, clipboard paste (all file types), or traditional file selection
- **Wide Format Support**: Images, documents, videos, archives, and many other file types
- **Password Protection**: Optional encryption for sensitive files with password protection
- **Batch Sharing**: Share multiple files at once with a single link
- **Short URLs**: Generate compact, easy-to-share URLs through integrated URL shortener
- **Folder Support**: Upload entire folders while preserving directory structure
- **Multiple Gateways**: Choose from various IPFS gateways for optimal access speed
- **Internationalization**: UI available in 12 languages
- **No Registration**: Use immediately without creating an account
- **Upload History**: View, search, filter, export, and import your upload history

## How to Use

### Single File Upload

1. Open [IPFSBED](https://ipfsbed.is-an.org/)
2. (Optional) Enter a passphrase in the password field if you want to protect your file
3. Upload a file by:
   - Clicking the upload area and selecting a file
   - Dragging and dropping a file
   - Pasting an image from clipboard (Ctrl+V)
4. After uploading, you'll get a share link
   - With passphrase: `share.html?share=encrypted_data` (recipient needs the passphrase)
   - Without passphrase: `share.html?d=compressed_data` (publicly accessible)
   - Both formats automatically generate a short URL for easier sharing

### Folder Upload

1. Toggle "Folder Mode" using the switch at the top of the upload area
2. Click the upload area and select a folder, or drag and drop a folder
3. The entire folder structure will be preserved and uploaded to IPFS
4. Share the generated link to allow recipients to browse and download the folder contents

### Batch Sharing

1. Upload multiple files or folders
2. Select the items you want to share using the checkboxes
3. Click "Batch Share"
4. (Optional) Set a passphrase for this batch of files
5. Click "Confirm & Copy Link"
6. Share the generated link with recipients
   - With passphrase: `batch-share.html?share=encrypted_data`
   - Without passphrase: `batch-share.html?d=compressed_data` or `batch-share.html?files=data` (legacy format)

### Accessing Shared Files

1. Open the shared link
2. If password-protected, enter the passphrase when prompted
3. For batch shares:
   - You can select which files to download
   - Download individual files or all files as a ZIP archive
   - Copy links to individual files

### Upload History Page

You can view your upload history by clicking the "上传历史" (Upload History) link in the top-right corner. The history page allows you to:

- View all files and folders you have uploaded (stored in your browser)
- Search, filter by type/time/encryption, and sort your uploads
- Export your upload history as a JSON file, or import history from another browser
- Delete individual records, batch delete, or clear all history
- Copy share links or CIDs directly from the history page

> **Note:** Upload history is stored locally in your browser and is not synced between devices.

## Advanced Features

### Short URL Generation

IPFSBED includes integration with a URL shortening service to make shared links more compact and easier to share. This feature:

- Automatically generates short URLs for all shared content
- Works for both single files/folders and batch shares
- Can be toggled on/off with the "Short URL" option
- Falls back to regular full-length URLs if the shortening service is unavailable

### Multiple Gateway Support

IPFSBED offers various IPFS gateways for accessing your files. Different gateways may provide better performance depending on your location and network conditions.

### Language Support

The interface is available in multiple languages:
- English
- Chinese (简体中文)
- German (Deutsch)
- Russian (Русский)
- French (Français)
- Spanish (Español)
- Arabic (العربية)
- Persian (فارسی)
- Turkish (Türkçe)
- Portuguese (Português)
- Korean (조선어)
- Japanese (日本語)

Change language using the globe icon in the top-right corner.

## Deployment with Cloudflare Pages

You can easily deploy your own instance of IPFSBED using Cloudflare Pages:

1. Fork this repository on GitHub
2. Log in to your Cloudflare dashboard and navigate to Pages
3. Click "Create a project" and select "Connect to Git"
4. Select your forked repository and configure the build settings:
   - Build command: `npm run build` (or leave empty if no build step)
   - Build output directory: `/` (root directory)
5. In the Environment Variables section, add the following if you want URL shortening:
   - `YOURLS_SIGNATURE`: Your YOURLS API signature token (obtain it from `https://yourdomain.com/admin/tools.php`)
   - `YOURLS_API_ENDPOINT`: Your YOURLS API endpoint URL (e.g., `https://yourdomain.com/yourls-api.php`)

After deployment, your IPFSBED instance will be available at `your-project-name.pages.dev`. You can also configure a custom domain in the Cloudflare Pages settings.

---

## Deployment with Tencent EdgeOne Pages

You can also deploy IPFSBED easily using [Tencent EdgeOne Pages](https://edgeone.ai/pages):

[![Use EdgeOne Pages to deploy](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fbestzwei%2Fipfsbed)

Click the button above to deploy this project to EdgeOne Pages.  
You can adjust build settings and environment variables as needed in the deployment console.

---

### Using Your Own IPFS Gateway

For better performance and control, you have to deploy your own IPFS gateway:

1. Set up your own IPFS node with a public gateway (e.g. using [Kubo](https://github.com/ipfs/kubo))
2. Configure CORS settings on your IPFS gateway to allow requests from your frontend domain:
   ```bash
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["https://your-frontend-domain.com", "https://your-project-name.pages.dev"]'
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
   ```
3. If using a separate gateway domain, also configure CORS headers in your web server (Nginx example):
   ```nginx
   location /api/ {
       proxy_pass http://localhost:5001/;
       proxy_set_header Host $host;
       
       # CORS headers
       add_header Access-Control-Allow-Origin "https://your-frontend-domain.com" always;
       add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS" always;
       add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always;
       
       # Handle preflight requests
       if ($request_method = 'OPTIONS') {
           add_header Access-Control-Allow-Origin "https://your-frontend-domain.com" always;
           add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS" always;
           add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always;
           add_header Access-Control-Max-Age 1728000;
           add_header Content-Type 'text/plain charset=UTF-8';
           add_header Content-Length 0;
           return 204;
       }
   }
   ```

### Customizing IPFS Upload Endpoints

To use your custom gateway in the application, modify the `static/file.js` file:

```javascript
function uploadToImg2IPFS(file) {
    // ...
    const apis = [
        'https://your-gateway.com/api/v0/add?pin=true',
        'https://your-backup-gateway.com/api/v0/add?pin=true',
        // Add more IPFS API endpoints
    ];
    // ...
}
```

Also update the gateway list in `static/common.js` to include your gateway for downloads:
```javascript
const commonGateways = [
    { value: "https://your-gateway.com", text: "Your Gateway" },
    // ...existing gateways...
];
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or create an Issue to improve the project.

## References

- [IPFS](https://ipfs.io/)
- [IPFS Scanner](https://ipfsscan.io/)
- [img2ipfs](https://github.com/jialezi/img2ipfs)
- [YOURLS - Your Own URL Shortener](https://yourls.org/)

## License

This project is available under the MIT License.
