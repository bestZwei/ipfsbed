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
- **Multiple Upload Methods**: Drag & drop, clipboard paste, or traditional file selection
- **Wide Format Support**: Images, documents, videos, archives, and many other file types
- **Password Protection**: Optional encryption for sensitive files with password protection
- **Batch Sharing**: Share multiple files at once with a single link
- **Short URLs**: Generate compact, easy-to-share URLs through integrated URL shortener
- **Folder Support**: Upload entire folders while preserving directory structure
- **Multiple Gateways**: Choose from various IPFS gateways for optimal access speed
- **Internationalization**: UI available in 12 languages
- **No Registration**: Use immediately without creating an account

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

## Self-Hosting

### Basic Setup

You can self-host IPFSBED with minimal configuration:

1. Clone this repository
2. Serve the static files using any web server (Apache, Nginx, etc.)
3. Customize the IPFS upload endpoints by modifying the `static/file.js` file:

```javascript
function uploadToImg2IPFS(file) {
    // ...
    const apis = [
        'https://your-custom-ipfs-node/api/v0/add?pin=true',
        // Add more IPFS API endpoints
    ];
    // ...
}
```

### URL Shortener Integration

IPFSBED can be integrated with YOURLS (Your Own URL Shortener) for generating short links:

1. Set up a [YOURLS](https://yourls.org/) instance on your server
2. For Cloudflare Pages hosting, configure environment variables:
   - `YOURLS_SIGNATURE`: Your YOURLS API signature token
   - `YOURLS_API_ENDPOINT`: URL to your YOURLS API endpoint (e.g., `https://yourdomain.com/yourls-api.php`)
3. The application will automatically use your YOURLS instance for URL shortening

For setting up your own IPFS gateway, refer to this [guide](https://forum.conflux.fun/t/ipfs/14771).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or create an Issue to improve the project.

## References

- [IPFS](https://ipfs.io/)
- [IPFS Scanner](https://ipfsscan.io/)
- [img2ipfs](https://github.com/jialezi/img2ipfs)
- [YOURLS - Your Own URL Shortener](https://yourls.org/)

## License

This project is available under the MIT License.
