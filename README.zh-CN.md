# IPFSBED - 去中心化IPFS文件托管服务

[English](README.md) | [中文](README.zh-CN.md)

[![演示](https://img.shields.io/badge/演示-在线预览-blue)](https://ipfsbed.is-an.org/)
[![许可证](https://img.shields.io/badge/许可证-MIT-green.svg)](LICENSE)
[![IPFS](https://img.shields.io/badge/IPFS-驱动-65c2cb.svg)](https://ipfs.io/)

## 概述

IPFSBED是一个基于星际文件系统（IPFS）构建的去中心化文件托管平台。它允许用户通过分布式IPFS网络上传和共享各种格式的文件，使内容全球可访问，而无需依赖中央服务器。

![IPFSBED截图](img/jt.png)

## 主要功能

- **去中心化存储**：文件存储在IPFS网络上，而非中央服务器
- **多种上传方式**：拖放上传、剪贴板粘贴或传统文件选择
- **广泛的格式支持**：图片、文档、视频、压缩包等多种文件类型
- **密码保护**：为敏感文件提供可选的加密和密码保护
- **批量共享**：通过单个链接一次共享多个文件
- **短链接**：通过集成的URL缩短服务生成简短易分享的链接
- **文件夹支持**：上传整个文件夹并保留目录结构
- **多网关支持**：从各种IPFS网关中选择，以获得最佳访问速度
- **国际化**：用户界面支持12种语言
- **无需注册**：无需创建账户即可立即使用
- **上传历史**：查看、搜索、筛选、导出和导入您的上传历史

## 使用方法

### 单文件上传

1. 打开[IPFSBED](https://ipfsbed.is-an.org/)
2. （可选）如果要保护您的文件，请在密码字段中输入密码
3. 通过以下方式上传文件：
   - 点击上传区域并选择文件
   - 拖放文件
   - 从剪贴板粘贴图片（Ctrl+V）
4. 上传后，您将获得一个分享链接
   - 带密码：`share.html?share=encrypted_data`（接收者需要密码）
   - 无密码：`share.html?d=compressed_data`（公开访问）
   - 两种格式都会自动生成短链接，便于共享

### 文件夹上传

1. 使用上传区域顶部的开关切换到"文件夹模式"
2. 点击上传区域并选择一个文件夹，或拖放一个文件夹
3. 整个文件夹结构将被保留并上传到IPFS
4. 分享生成的链接，接收者可以浏览文件夹内容（文件夹仅支持在线浏览，不支持下载）

### 批量共享

1. 上传多个文件或文件夹
2. 使用复选框选择要共享的项目
3. 点击"批量共享"
4. （可选）为这批文件设置密码
5. 点击"确认并复制链接"
6. 与接收者分享生成的链接
   - 带密码：`batch-share.html?share=encrypted_data`
   - 无密码：`batch-share.html?d=compressed_data`或`batch-share.html?files=data`（旧格式）

### 访问共享文件

1. 打开共享链接
2. 如果有密码保护，请在提示时输入密码
3. 对于批量共享：
   - 您可以选择要下载的文件
   - 下载单个文件或将所有文件作为ZIP压缩包下载
   - 复制单个文件的链接

### 上传历史页面

您可以通过点击右上角的“上传历史”链接来查看您的上传历史。历史记录页面允许您：

- 查看您已上传的所有文件和文件夹（存储在您的浏览器中）
- 搜索、按类型/时间/加密筛选和排序您的上传
- 将您的上传历史记录导出为 JSON 文件，或从另一个浏览器导入历史记录
- 删除单个记录、批量删除或清除所有历史记录
- 直接从历史记录页面复制共享链接或 CID

> **注意：** 上传历史记录存储在您的浏览器本地，不会在设备之间同步。

## 高级功能

### 短链接生成

IPFSBED包含与URL缩短服务的集成，使共享链接更紧凑、更易于分享。此功能：

- 自动为所有共享内容生成短链接
- 适用于单个文件/文件夹和批量共享
- 可通过"短网址"选项打开或关闭
- 如果缩短服务不可用，会回退到常规完整链接

### 多网关支持

IPFSBED提供多种IPFS网关来访问您的文件。根据您的位置和网络条件，不同的网关可能提供更好的性能。

### 语言支持

界面支持多种语言：
- 英语（English）
- 中文（简体中文）
- 德语（Deutsch）
- 俄语（Русский）
- 法语（Français）
- 西班牙语（Español）
- 阿拉伯语（العربية）
- 波斯语（فارسی）
- 土耳其语（Türkçe）
- 葡萄牙语（Português）
- 韩语（조선어）
- 日语（日本語）

使用右上角的地球图标更改语言。

## 使用Cloudflare Pages部署

您可以使用Cloudflare Pages轻松部署自己的IPFSBED实例：

1. 在GitHub上fork此仓库
2. 登录您的Cloudflare控制面板并导航至Pages
3. 点击"创建项目"并选择"连接到Git"
4. 选择您fork的仓库并配置构建设置：
   - 构建命令：留空
   - 构建输出目录：`/`（根目录）
5. 在环境变量部分，如果要使用URL缩短功能，添加以下内容：
   - `YOURLS_SIGNATURE`：您的YOURLS API签名令牌（在`https://yourdomain.com/admin/tools.php`获取）
   - `YOURLS_API_ENDPOINT`：您的YOURLS API端点URL（例如，`https://yourdomain.com/yourls-api.php`）
6. 点击"保存并部署"

部署后，您的IPFSBED实例将在`your-project-name.pages.dev`上可用。您还可以在Cloudflare Pages设置中配置自定义域名。

### 使用自己的IPFS网关

为了获得更好的性能和控制，您务必部署自己的IPFS网关：

1. 设置自己的IPFS节点并配置公共网关（例如使用[Kubo](https://github.com/ipfs/kubo)）
2. 在IPFS网关上配置CORS设置，允许来自您前端域名的请求：
   ```bash
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["https://your-frontend-domain.com", "https://your-project-name.pages.dev"]'
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
   ```
3. 如果使用单独的网关域名，还需在您的Web服务器中配置CORS头（Nginx示例）：

   ```nginx
   location /api/ {
       proxy_pass http://localhost:5001/;
       proxy_set_header Host $host;
       
       # CORS头
       add_header Access-Control-Allow-Origin "https://your-frontend-domain.com" always;
       add_header Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS" always;
       add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always;
       
       # 处理预检请求
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

### 自定义IPFS上传端点

要在应用程序中使用您的自定义网关，请修改`static/file.js`文件：

```javascript
function uploadToImg2IPFS(file) {
    // ...
    const apis = [
        'https://your-gateway.com/api/v0/add?pin=true',
        'https://your-backup-gateway.com/api/v0/add?pin=true',
        // 添加更多IPFS API端点
    ];
    // ...
}
```

同时在`static/common.js`中更新网关列表，添加您的网关用于下载：
```javascript
const commonGateways = [
    { value: "https://your-gateway.com", text: "您的网关" },
    // ...现有网关...
];
```

## 贡献

欢迎贡献！请随时提交Pull Request或创建Issue以改进项目。

## 参考

- [IPFS](https://ipfs.io/)
- [IPFS Scanner](https://ipfsscan.io/)
- [img2ipfs](https://github.com/jialezi/img2ipfs)
- [YOURLS - Your Own URL Shortener](https://yourls.org/)

## 许可证

本项目使用MIT许可证。
