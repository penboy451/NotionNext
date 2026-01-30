/**
 * -----------------------------------------------------------------------
 * NotionNext 站点统计与 SEO 验证配置文件 (Analytics & SEO Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件管理网站的访客统计（如 Google Analytics）和搜索引擎验证（如 Google Search Console）。
 * 2. 只有当您在对应平台申请了 ID 并填入后，统计功能才会激活。
 * 3. 建议优先配置 Google Analytics 和 Google Site Verification，以优化搜索排名。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：基础统计工具
  // =====================================================================

  /**
   * Vercel 自带统计 (Vercel Analytics)
   * 作用：在 Vercel 控制台的 Analytics 选项卡中查看访问数据。
   * 设置：需在 Vercel 项目后台手动开启。
   */
  ANALYTICS_VERCEL: process.env.NEXT_PUBLIC_ANALYTICS_VERCEL || false,

  /**
   * 不蒜子访问量统计 (Busuanzi)
   * 作用：显示“本站总访问量”、“本站访客数”等数字。
   * 设置：true 为开启，会在页面底部显示统计数字。
   */
  ANALYTICS_BUSUANZI_ENABLE: process.env.NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE || true,

  /**
   * 谷歌统计 (Google Analytics)
   * 获取：访问 https://analytics.google.com/
   * 格式：填入以 'G-' 开头的衡量 ID。
   */
  ANALYTICS_GOOGLE_ID: process.env.NEXT_PUBLIC_ANALYTICS_GOOGLE_ID || '',

  /**
   * 百度统计 (Baidu Analytics)
   * 获取：访问 https://hm.baidu.com/
   * 格式：填入百度统计脚本中 'hm.js?' 后面那一串 32 位的随机 ID。
   */
  ANALYTICS_BAIDU_ID: process.env.NEXT_PUBLIC_ANALYTICS_BAIDU_ID || '',

  /**
   * 站长统计 (CNZZ/友盟)
   * 格式：填入站长统计分配的 ID。
   */
  ANALYTICS_CNZZ_ID: process.env.NEXT_PUBLIC_ANALYTICS_CNZZ_ID || '',

  // =====================================================================
  // 第二部分：SEO 搜索引擎所有权验证
  // =====================================================================

  /**
   * 谷歌搜索控制台验证 (Google Site Verification)
   * 来源：Google Search Console -> 设置 -> 所有权验证 -> HTML 标记
   * 作用：让 Google 爬虫更频繁地访问您的站点。
   * 提示：如果您已经通过 DNS 验证成功，这里可以保持为空。
   */
  SEO_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION || '',

  /**
   * 百度搜索资源平台验证 (Baidu Site Verification)
   * 来源：百度搜索资源平台 -> 站点管理 -> 验证网站
   */
  SEO_BAIDU_SITE_VERIFICATION: process.env.NEXT_PUBLIC_SEO_BAIDU_SITE_VERIFICATION || '',

  // =====================================================================
  // 第三部分：进阶分析工具 (按需配置)
  // =====================================================================

  /**
   * 微软 Clarity 行为分析
   * 作用：可以录制用户在网页上的操作热力图和录屏。
   * 获取：https://clarity.microsoft.com/
   */
  CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || null,

  /**
   * Umami 隐私友好型统计
   * 设置：如果您有自建或使用 Umami Cloud 服务，请在此配置。
   */
  UMAMI_HOST: process.env.NEXT_PUBLIC_UMAMI_HOST || 'https://cloud.umami.is/script.js',
  UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID || '',

  /**
   * 51LA 统计 (国内常用的老牌统计工具)
   */
  ANALYTICS_51LA_ID: process.env.NEXT_PUBLIC_ANALYTICS_51LA_ID || '',
  ANALYTICS_51LA_CK: process.env.NEXT_PUBLIC_ANALYTICS_51LA_CK || '',

  /**
   * Matomo 统计 (自建私有化统计的首选)
   */
  MATOMO_HOST_URL: process.env.NEXT_PUBLIC_MATOMO_HOST_URL || '',
  MATOMO_SITE_ID: process.env.NEXT_PUBLIC_MATOMO_SITE_ID || '',

  /**
   * Ackee 统计 (轻量级开源访客统计)
   * 注意：默认示例已清空，避免指向他人服务器。
   */
  ANALYTICS_ACKEE_TRACKER: process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_TRACKER || '',
  ANALYTICS_ACKEE_DATA_SERVER: process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_DATA_SERVER || '',
  ANALYTICS_ACKEE_DOMAIN_ID: process.env.NEXT_PUBLIC_ANALYTICS_ACKEE_DOMAIN_ID || ''

  // <---- 站点统计配置结束
}
