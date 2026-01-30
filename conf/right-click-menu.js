/**
 * -----------------------------------------------------------------------
 * NotionNext 网页自定义右键菜单配置文件 (Right-Click Context Menu)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本功能允许您使用自定义的菜单界面覆盖浏览器默认的右键菜单。
 * 2. 优点：增加网站的交互趣味性和品牌感，提供快捷功能入口。
 * 3. 缺点：可能会干扰部分习惯使用浏览器原生右键功能（如检查、翻译）的用户。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：全局开关 (Global Toggle)
  // =====================================================================

  /**
   * 自定义右键菜单总开关
   * 设置：true 开启自定义菜单；false 则回归浏览器默认菜单。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU || true,

  // =====================================================================
  // 第二部分：系统与外观功能 (System & Appearance)
  // =====================================================================

  /**
   * 是否显示“主题切换”按钮
   * 作用：允许访客在右键菜单中快速更换网站主题。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU_THEME_SWITCH:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU_THEME_SWITCH || true,

  /**
   * 是否显示“深色模式”切换
   * 作用：方便用户快速在日间/夜间模式之间进行切换。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU_DARK_MODE:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU_DARK_MODE || true,

  // =====================================================================
  // 第三部分：内容与导航功能 (Content & Navigation)
  // =====================================================================

  /**
   * 是否显示“分享链接”
   * 作用：一键复制当前页面的 URL 链接。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU_SHARE_LINK:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU_SHARE_LINK || true,

  /**
   * 是否显示“随机博客”
   * 作用：为用户随机抽取并跳转到一篇站内文章，增加趣味性。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU_RANDOM_POST:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU_RANDOM_POST || true,

  /**
   * 是否显示“全站分类”
   * 作用：右键即可查看网站的所有文章分类索引。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU_CATEGORY:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU_CATEGORY || true,

  /**
   * 是否显示“全站标签”
   * 作用：右键即可查看网站的所有标签云。
   */
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU_TAG:
    process.env.NEXT_PUBLIC_CUSTOM_RIGHT_CLICK_CONTEXT_MENU_THEME_TAG || true
}
