/**
 * -----------------------------------------------------------------------
 * NotionNext 广告联盟集成配置文件 (Advertising System Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于管理网站的广告展示逻辑，目前支持 Google AdSense 和 WWAds 两大平台。
 * 2. 只有当您拥有自己的广告账号并填入对应的 ID 时，广告才会生效。
 * 3. 保持所有 ID 为空 ('') 或 null，即代表全局彻底关闭广告功能，确保站点纯净无干扰。
 * 4. 修改后请在 GitHub 提交，Vercel 会自动重新构建生效。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：谷歌广告 (Google AdSense)
  // 全球最大的广告联盟，适合长期运营的博客。
  // =====================================================================

  /**
   * 谷歌广告发行商 ID (Publisher ID)
   * 来源：登录 Google AdSense 后台 -> 账号 -> 账号信息 -> 发行商 ID
   * 格式：必须以 'ca-pub-' 开头，后接 16 位数字
   * 作用：这是您的身份唯一标识，填错则无法获得收益。
   */
  ADSENSE_GOOGLE_ID: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_ID || '',

  /**
   * 广告测试模式 (Test Mode)
   * 作用：开启后，Google 会展示“占位测试广告”而非真实广告。
   * 建议：在本地开发或尚未通过 Google 审核前设为 true；正式上线运营建议设为 false。
   */
  ADSENSE_GOOGLE_TEST: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_TEST || false,

  /**
   * 文章内嵌广告单元 ID (In-Article Ad Slot)
   * 获取：AdSense -> 广告 -> 按单元广告 -> 新建“文章内嵌广告”
   * 作用：这类广告会自动插入在您的博客文章段落之间，视觉冲击力强，点击率高。
   */
  ADSENSE_GOOGLE_SLOT_IN_ARTICLE: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_IN_ARTICLE || '',

  /**
   * 信息流广告单元 ID (In-Feed Ad Slot)
   * 获取：AdSense -> 广告 -> 按单元广告 -> 新建“信息流广告”
   * 作用：通常显示在首页的文章列表之间，模拟文章卡片的样式，不破坏整体美感。
   */
  ADSENSE_GOOGLE_SLOT_FLOW: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_FLOW || '',

  /**
   * 原生内容广告单元 ID (Multiplex Ad Slot)
   * 获取：AdSense -> 广告 -> 按单元广告 -> 新建“Multiplex 广告”
   * 作用：展示一组类似推荐文章的广告网格，通常放在文章末尾，转化率极佳。
   */
  ADSENSE_GOOGLE_SLOT_NATIVE: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_NATIVE || '',

  /**
   * 自动广告/展示广告 ID (Display Ad Slot)
   * 获取：AdSense -> 广告 -> 按单元广告 -> 新建“展示广告”
   * 作用：这是最通用的广告单元，可以放在侧边栏、页头或页脚等任何位置。
   */
  ADSENSE_GOOGLE_SLOT_AUTO: process.env.NEXT_PUBLIC_ADSENSE_GOOGLE_SLOT_AUTO || '',

  // =====================================================================
  // 第二部分：万维广告 (WWAds)
  // 专门为开发者和极客设计的广告平台，对阅读体验更友好。
  // =====================================================================

  /**
   * 万维广告单元 ID (Unit ID)
   * 来源：访问 https://wwads.cn/ 申请通过后，在后台创建广告位获取。
   * 作用：适合中文技术博客，展示内容通常为云服务、开发者工具等。
   */
  AD_WWADS_ID: process.env.NEXT_PUBLIC_WWAD_ID || null,

  /**
   * 广告屏蔽检测 (AdBlock Detection)
   * 作用：当访问者浏览器开启了屏蔽广告的插件（如 AdBlock）时，系统会在广告位显示文字提醒。
   * 设置：true 为开启检测，false 为静默关闭（即使被屏蔽也不提示）。
   */
  AD_WWADS_BLOCK_DETECT: process.env.NEXT_PUBLIC_WWADS_AD_BLOCK_DETECT || false
}
