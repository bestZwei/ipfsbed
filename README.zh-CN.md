# IPFSBED - 去中心化IPFS文件托管服务

[English](README.md) | [中文](README.zh-CN.md)

[![演示](https://img.shields.io/badge/演示-在线预览-blue)](https://ipfsbed.is-an.org/)
[![许可证](https://img.shields.io/badge/许可证-MIT-green.svg)](LICENSE)
[![IPFS](https://img.shields.io/badge/IPFS-驱动-65c2cb.svg)](https://ipfs.io/)

## 概述

IPFSBED是一个基于星际文件系统（IPFS）构建的去中心化文件托管平台。它允许用户通过分布式IPFS网络上传和共享各种格式的文件，使内容全球可访问，而无需依赖中央服务器。

![IPFSBED截图](https://i0.img2ipfs.com/ipfs/QmXKo32jvDsMUaFxCSBMpPLFoRnNu5r1yMW63HJJuvTDL2?filename=ipfsbed-screenshot.png)

## 主要功能

- **去中心化存储**：文件存储在IPFS网络上，而非中央服务器
- **多种上传方式**：拖放上传、剪贴板粘贴或传统文件选择
- **广泛的格式支持**：图片、文档、视频、压缩包等多种文件类型
- **密码保护**：为敏感文件提供可选的加密和密码保护
- **批量共享**：通过单个链接一次共享多个文件
- **多网关支持**：从各种IPFS网关中选择，以获得最佳访问速度
- **国际化**：用户界面支持12种语言
- **无需注册**：无需创建账户即可立即使用

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
   - 无密码：`share.html?cid=...&filename=...`（公开访问）

### 批量共享

1. 上传多个文件
2. 使用复选框选择要共享的文件
3. 点击“批量共享”
4. （可选）为这批文件设置密码
5. 点击“确认并复制链接”
6. 与接收者分享生成的链接
   - 带密码：`batch-share.html?share=encrypted_data`
   - 无密码：`batch-share.html?files=data`

### 访问共享文件

1. 打开共享链接
2. 如果有密码保护，请在提示时输入密码
3. 对于批量共享：
   - 您可以选择要下载的文件
   - 下载单个文件或将所有文件作为ZIP压缩包下载
   - 复制单个文件的链接

## 高级功能

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

## 自托管

您可以通过修改`static/file.js`文件来自定义IPFS上传端点：

```javascript
function uploadToImg2IPFS(file) {
    // ...
    const apis = [
        'https://your-custom-ipfs-node/api/v0/add?pin=true',
        // 添加更多IPFS API端点
    ];
    // ...
}
```

关于设置您自己的IPFS网关，请参考此[指南](https://forum.conflux.fun/t/ipfs/14771)。

## 隐私与安全

- 使用密码上传的文件在共享前在客户端进行加密
- 加密密钥（密码）永远不会发送到任何服务器
- 没有正确的密码，加密文件无法访问
- 公共文件（无密码）可被任何拥有链接的人访问

## 贡献

欢迎贡献！请随时提交Pull Request或创建Issue以改进项目。

## 参考

- [IPFS](https://ipfsscan.io/)
- [img2ipfs](https://github.com/jialezi/img2ipfs)

## 许可证

本项目使用MIT许可证。
