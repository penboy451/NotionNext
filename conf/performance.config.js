/**
 * -----------------------------------------------------------------------
 * NotionNext 站点性能与加载优化配置文件 (Performance Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于管理网站的加载性能、缓存策略、图片/字体优化以及资源预取。
 * 2. 默认配置已针对 Vercel 托管环境进行了深度优化，可确保极速的访问体验。
 * 3. 性能监控部分符合 Google Search Console 的核心网页指标 (Core Web Vitals) 标准。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：资源加载策略 (Loading Strategy)
  // =====================================================================

  /**
   * 预加载关键资源
   * 作用：在页面解析时优先下载关键 JS 和 CSS，减少首屏渲染等待时间。
   */
  PRELOAD_CRITICAL_RESOURCES: process.env.NEXT_PUBLIC_PRELOAD_CRITICAL_RESOURCES || true,

  /**
   * 图片懒加载 (Lazy Loading)
   * 作用：仅当用户滚动到图片位置时才开始加载，极大节省流量。
   * THRESHOLD: 预判距离，提前 200px 开始加载，让用户无感。
   */
  LAZY_LOAD_IMAGES: process.env.NEXT_PUBLIC_LAZY_LOAD_IMAGES || true,
  LAZY_LOAD_THRESHOLD: process.env.NEXT_PUBLIC_LAZY_LOAD_THRESHOLD || '200px',

  /**
   * 代码分割与分包 (Code Splitting)
   * 作用：将巨大的 JS 文件拆分成小包，按需加载，防止首页文件过大。
   * CHUNK_SIZE_LIMIT: 建议保持在 244KB 左右，这是平衡请求数与体积的最佳点。
   */
  ENABLE_CODE_SPLITTING: process.env.NEXT_PUBLIC_ENABLE_CODE_SPLITTING || true,
  CHUNK_SIZE_LIMIT: process.env.NEXT_PUBLIC_CHUNK_SIZE_LIMIT || 244000,

  // =====================================================================
  // 第二部分：缓存与压缩 (Caching & Compression)
  // =====================================================================

  /**
   * 缓存过期时间 (TTL)
   * BROWSER_CACHE: 浏览器本地缓存（24小时）。
   * CDN_CACHE: Vercel 边缘节点缓存（7天），确保全球访问速度一致。
   */
  BROWSER_CACHE_TTL: process.env.NEXT_PUBLIC_BROWSER_CACHE_TTL || 86400,
  CDN_CACHE_TTL: process.env.NEXT_PUBLIC_CDN_CACHE_TTL || 604800,

  /**
   * 内容压缩 (Content Compression)
   * 开启后，服务器会将网页打包压缩后再发送给浏览器，带宽占用可降低 70%。
   */
  ENABLE_GZIP: process.env.NEXT_PUBLIC_ENABLE_GZIP || true,
  ENABLE_BROTLI: process.env.NEXT_PUBLIC_ENABLE_BROTLI || true, // 比 Gzip 更先进的压缩算法

  // =====================================================================
  // 第三部分：资源资产优化 (Assets Optimization)
  // =====================================================================

  /**
   * 字体优化
   * FONT_DISPLAY: 'swap' 确保在字体下载完之前先用系统字体展示内容，防止白屏。
   */
  FONT_DISPLAY: process.env.NEXT_PUBLIC_FONT_DISPLAY || 'swap',
  PRELOAD_FONTS: process.env.NEXT_PUBLIC_PRELOAD_FONTS || true,

  /**
   * 第三方脚本优化
   * 开启后，非核心脚本（如统计、挂件）将延迟到主程序运行完后再加载。
   */
  DEFER_THIRD_PARTY_SCRIPTS: process.env.NEXT_PUBLIC_DEFER_THIRD_PARTY_SCRIPTS || true,

  /**
   * 现代图片格式支持
   * 作用：如果浏览器支持，优先发送 WebP 或更先进的 AVIF 格式，画质更高、体积更小。
   */
  WEBP_SUPPORT: process.env.NEXT_PUBLIC_WEBP_SUPPORT || true,
  AVIF_SUPPORT: process.env.NEXT_PUBLIC_AVIF_SUPPORT || true,

  /**
   * 链接与图片预取 (Prefetch)
   * 当用户鼠标悬停在链接上时，提前在后台加载下一页内容。
   */
  PREFETCH_LINKS: process.env.NEXT_PUBLIC_PREFETCH_LINKS || true,
  PREFETCH_IMAGES: process.env.NEXT_PUBLIC_PREFETCH_IMAGES || false, // 默认不预取图片，防止流量突增

  // =====================================================================
  // 第四部分：站点性能监控 (Performance Monitoring)
  // 符合 Google 核心网页指标建议标准
  // =====================================================================
  ENABLE_WEB_VITALS: process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS || true,
  PERFORMANCE_BUDGET: {
    FCP: 1800, // 首次内容绘制时间 (应少于 1.8 秒)
    LCP: 2500, // 最大内容绘制时间 (应少于 2.5 秒)
    FID: 100,  // 首次输入延迟 (应少于 100 毫秒)
    CLS: 0.1   // 累积布局偏移 (应低于 0.1)
  }
}
