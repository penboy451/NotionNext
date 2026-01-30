/**
 * -----------------------------------------------------------------------
 * NotionNext 代码块显示与高亮配置文件 (Code Block Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于管理博客中代码块的外观、高亮主题以及交互功能。
 * 2. 核心引擎采用 Prism.js，支持数百种编程语言的语法高亮。
 * 3. 所有的 CDN 资源均采用全球领先的公共节点，确保极速加载。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：PrismJS 核心组件 (PrismJS Core)
  // =====================================================================

  /**
   * PrismJS 语言组件库路径
   * 作用：当您在文章中写下不同语言的代码时，系统会从这里自动拉取对应的语法规则。
   */
  PRISM_JS_PATH: 'https://npm.elemecdn.com/prismjs@1.29.0/components/',

  /**
   * PrismJS 自动加载插件
   * 作用：智能识别代码语言，无需手动在后台配置每种语言的加载。
   */
  PRISM_JS_AUTO_LOADER:
    'https://npm.elemecdn.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js',

  // =====================================================================
  // 第二部分：代码配色主题 (Code Themes)
  // =====================================================================

  /**
   * 代码块默认主题 (Default Theme)
   * 建议：默认为 'prism-okaidia.css'，这是一种经典的深色背景配色，非常护眼。
   */
  PRISM_THEME_PREFIX_PATH:
    process.env.NEXT_PUBLIC_PRISM_THEME_PREFIX_PATH ||
    'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.css',

  /**
   * 自动切换主题开关 (Theme Switch)
   * 设置：true 开启，系统会根据网站的“日间/夜间”模式自动切换代码块底色。
   */
  PRISM_THEME_SWITCH: process.env.NEXT_PUBLIC_PRISM_THEME_SWITCH || true,

  /**
   * 浅色模式代码主题 (Light Mode Theme)
   * 推荐：'prism-solarizedlight.css'，柔和的浅黄底色，适合白天阅读。
   */
  PRISM_THEME_LIGHT_PATH:
    process.env.NEXT_PUBLIC_PRISM_THEME_LIGHT_PATH ||
    'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.css',

  /**
   * 深色模式代码主题 (Dark Mode Theme)
   * 推荐：'prism-okaidia.min.css'，极客感十足的黑底彩色文字。
   */
  PRISM_THEME_DARK_PATH:
    process.env.NEXT_PUBLIC_PRISM_THEME_DARK_PATH ||
    'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css',

  // =====================================================================
  // 第三部分：交互与视觉功能 (Visual Features)
  // =====================================================================

  /**
   * Mac 风格装饰条 (Code Mac Bar)
   * 作用：在代码框左上角显示红、黄、绿三色小圆点（Mac 窗口风格），提升质感。
   */
  CODE_MAC_BAR: process.env.NEXT_PUBLIC_CODE_MAC_BAR || true,

  /**
   * 显示行号 (Line Numbers)
   * 作用：是否在代码块左侧显示 `1, 2, 3...` 序列。
   */
  CODE_LINE_NUMBERS: process.env.NEXT_PUBLIC_CODE_LINE_NUMBERS || false,

  /**
   * 开启代码折叠 (Code Collapse)
   * 作用：当代码太长时，用户可以点击折叠按钮将其收起，保持页面整洁。
   */
  CODE_COLLAPSE: process.env.NEXT_PUBLIC_CODE_COLLAPSE || true,

  /**
   * 代码折叠默认状态 (Collapse Expand Default)
   * 设置：true 代表默认展开所有代码；false 代表默认收起所有代码。
   */
  CODE_COLLAPSE_EXPAND_DEFAULT:
    process.env.NEXT_PUBLIC_CODE_COLLAPSE_EXPAND_DEFAULT || true,

  // =====================================================================
  // 第四部分：绘图引擎 (Diagrams)
  // =====================================================================

  /**
   * Mermaid 流程图引擎 (Mermaid CDN)
   * 作用：支持在文章中直接用文本绘制流程图、甘特图等，无需插入图片。
   */
  MERMAID_CDN:
    process.env.NEXT_PUBLIC_MERMAID_CDN ||
    'https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.min.js'
}
