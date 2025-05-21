# IPFS图床

[![演示](https://img.shields.io/badge/演示-在线预览-blue)](https://ipfsbed.is-an.org/)

## 项目简介

IPFS图床是一个基于IPFS（星际文件系统）的去中心化文件存储平台，允许用户上传图片和其他文件到IPFS网络。通过IPFS，文件可以在全球范围内访问。

## 功能

- 支持图片和多种文件格式的上传
- 文件通过IPFS网络进行去中心化存储
- 支持拖拽、点击和粘贴上传
- 提供多种访问网关选择
- 自动生成文件的URL、HTML、Markdown等格式链接
- 上传进度显示和错误处理

## 使用方法

1. 打开项目页面。
2. 选择或拖拽文件到上传区域。
3. 等待文件上传完成，获取文件的访问链接。
4. 选择不同格式的链接（URL、HTML、Markdown等）进行复制和分享。

## 自定义上传接口

您可以通过修改`static/file.js`中的API上传接口来使用自己的IPFS节点或其他上传服务。

## 自部署IPFS网关

参考 https://forum.conflux.fun/t/ipfs/14771

## 参考项目

- [IPFS](https://ipfsscan.io/)
- [img2ipfs](https://github.com/jialezi/img2ipfs)

## 贡献指南

欢迎贡献代码和提出建议！请提交Pull Request或在Issues中反馈问题。
