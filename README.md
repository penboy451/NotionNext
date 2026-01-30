# penboy451 的数字花园 (Digital Garden)

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fwww.pengboyu.com&style=for-the-badge&label=Online)](https://www.pengboyu.com)

---

## 🚀 项目概述

这是 **penboy451** 的个人博客系统。基于 Next.js 框架与 Notion API 构建，实现了从 Notion 笔记到极速静态网页的自动化部署。

- **站点地址**: [www.pengboyu.com](https://www.pengboyu.com)
- **托管平台**: Vercel
- **内容仓库**: Notion Database

## 🛠️ 技术架构

本项目采用了现代化的前端技术栈，确保全球范围内的访问体验与极致的 SEO 表现：

- **核心框架**: [Next.js](https://nextjs.org) (React 生态系统)
- **样式处理**: [Tailwind CSS](https://www.tailwindcss.cn/)
- **数据交互**: [Notion API](https://developers.notion.com/)
- **渲染引擎**: React-notion-x
- **图标系统**: Fontawesome 6.4.0 (全球加速版)
- **部署方案**: Vercel 全球边缘网络 (Edge Network)

## 📋 维护与更新逻辑

1. **内容管理**: 所有博文、菜单及配置均在 Notion 数据库中完成，实现“写作即发布”。
2. **自动化构建**: 每当代码提交至 GitHub，Vercel 将自动触发生产环境构建。
3. **性能优化**: 已针对中国大陆访问进行字体镜像加速，并开启了全站图片的 WebP/AVIF 转码。

## ⚙️ 核心配置文件

为了保持代码库的纯净，全站配置已按模块拆分至 `/conf/` 目录：

- `blog.config.js`: 全站总司令部配置
- `ad.config.js`: 广告位零干扰管理
- `analytics.config.js`: SEO 与流量监控
- `font.config.js`: 全球字体加速方案
- `performance.config.js`: 性能与缓存优化

## 📄 开源协议

本项目基于 **MIT License**。你可以自由地 Fork、修改并用于个人用途。

---
**© 2026 penboy451. Built with ❤️ and AI.**
