/**
 * -----------------------------------------------------------------------
 * NotionNext 社交媒体与联系方式配置文件 (Social & Contact Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件管理网站中显示的社交图标链接（如 GitHub, 微博, 邮件等）。
 * 2. 如果某个联系方式不需要显示，请保持其值为 '' (空字符串)。
 * 3. 建议：优先配置 Email 和 GitHub，这是技术博客的标配。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：核心联系方式
  // =====================================================================

  /**
   * 电子邮箱地址 (Email Address)
   * 逻辑说明：代码中包含了一段 Base64 编码逻辑，目的是为了防止机器人爬虫直接抓取
   * 您的明文邮箱从而发送垃圾邮件。
   * 示例填法：'yourname@pengboyu.com'
   */
  CONTACT_EMAIL:
    (process.env.NEXT_PUBLIC_CONTACT_EMAIL &&
      btoa(
        unescape(encodeURIComponent(process.env.NEXT_PUBLIC_CONTACT_EMAIL))
      )) ||
    '',

  /**
   * GitHub 个人主页
   * 建议：作为开发者，这是您最重要的技术名片。
   * 示例填法：'https://github.com/penboy451'
   */
  CONTACT_GITHUB: process.env.NEXT_PUBLIC_CONTACT_GITHUB || '',

  /**
   * Telegram 联系地址
   * 示例填法：'https://t.me/your_username'
   */
  CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || '',

  // =====================================================================
  // 第二部分：主流社交平台 (国际 & 通用)
  // =====================================================================

  // Twitter (X) 个人主页
  CONTACT_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '',

  // LinkedIn 领英职业档案 (适合求职或商务交流)
  CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || '',

  // Instagram 个人主页 (侧重生活/摄影展示)
  CONTACT_INSTAGRAM: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || '',

  // YouTube 频道主页
  CONTACT_YOUTUBE: process.env.NEXT_PUBLIC_CONTACT_YOUTUBE || '',

  // =====================================================================
  // 第三部分：中文社交与垂直领域平台
  // =====================================================================

  // 微博 (Weibo) 个人主页
  CONTACT_WEIBO: process.env.NEXT_PUBLIC_CONTACT_WEIBO || '',

  // 哔哩哔哩 (Bilibili) 空间主页
  CONTACT_BILIBILI: process.env.NEXT_PUBLIC_CONTACT_BILIBILI || '',

  // 小红书 (Xiaohongshu) 个人页链接
  CONTACT_XIAOHONGSHU: process.env.NEXT_PUBLIC_CONTACT_XIAOHONGSHU || '',

  // 知识星球 (适合运营付费社群)
  CONTACT_ZHISHIXINGQIU: process.env.NEXT_PUBLIC_CONTACT_ZHISHIXINGQIU || '',

  /**
   * 微信公众号 (WeChat Public Account)
   * 填法：请填写公众号的关注页面链接。
   * 获取：在公众号后台查看“公众号设置”中的二维码/介绍页链接。
   */
  CONTACT_WEHCHAT_PUBLIC: process.env.NEXT_PUBLIC_CONTACT_WEHCHAT_PUBLIC || ''
}
