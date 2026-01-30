/**
 * -----------------------------------------------------------------------
 * NotionNext 图片视觉与加载优化配置文件 (Image Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于管理图片的压缩宽度、缩放画质及懒加载占位图。
 * 2. 合理配置图片宽度可显著提升网页加载速度，减少 Vercel 带宽消耗。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // Notion 域名：一般保持默认，若使用反向代理则在此修改
  NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || 'https://www.notion.so',

  // 图片压缩宽度：默认 1080px。用于博客封面和文章内容，数值越小加载越快
  IMAGE_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_WIDTH || 1080,

  // 图片放大后的画质宽度：默认 1920px。
  IMAGE_ZOOM_IN_WIDTH: process.env.NEXT_PUBLIC_IMAGE_ZOOM_IN_WIDTH || 1920,

  // 图片压缩质量：0-100。数值越高画质越好，但文件体积也会越大
  IMAGE_COMPRESS_QUALITY: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_QUALITY || 80,

  // 随机图片 API：若未配置背景图，可填入 Unsplash 等 API 地址实现随机背景
  RANDOM_IMAGE_URL: process.env.NEXT_PUBLIC_RANDOM_IMAGE_URL || '',

  // 随机图片触发关键字：仅当图片链接包含以下关键字时，才会被随机 API 替换（支持英文逗号分隔）
  RANDOM_IMAGE_REPLACE_TEXT:
    process.env.NEXT_PUBLIC_RANDOM_IMAGE_NOT_REPLACE_TEXT || 'images.unsplash.com',

  /**
   * 懒加载占位图片 (Lazy Load Placeholder)
   * 作用：在正式图片加载完成前显示的半透明模糊图，支持 Base64 或图片链接
   */
  IMG_LAZY_LOAD_PLACEHOLDER:
    process.env.NEXT_PUBLIC_IMG_LAZY_LOAD_PLACEHOLDER ||
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',

  // 图片存储方案：目前仅支持 'Notion' 官方方案，无需修改
  IMG_URL_TYPE: process.env.NEXT_PUBLIC_IMG_TYPE || 'Notion',

  // 图片阴影：是否为文章内的图片自动添加阴影边框
  IMG_SHADOW: process.env.NEXT_PUBLIC_IMG_SHADOW || false,

  // Notion 图片压缩宽度：针对 Notion 内部图片的额外压缩设置
  IMG_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMG_COMPRESS_WIDTH || 800
}
