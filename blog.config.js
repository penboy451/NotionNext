/**
 * -----------------------------------------------------------------------
 * NotionNext 核心调度配置文件 (Global Strategy Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件是全站的“大脑”，负责集成 /conf/ 目录下的所有子功能模块。
 * 2. 优先级说明：Vercel Dashboard 环境变量 > 本地代码文件配置。
 * 3. 安全准则：对于高敏感 ID（如 NOTION_PAGE_ID），代码内保持留空，
 *    通过 Vercel 后台进行加密存储，确保即便 GitHub 仓库公开，数据依然安全。
 * -----------------------------------------------------------------------
 */

const BLOG = {
  // =====================================================================
  // 第一部分：数据源与主题核心 (Core Connection)
  // =====================================================================

  /**
   * Notion API 基础接口
   * 作用：程序与 Notion 官方服务器通讯的网关，建议保持默认。
   */
  API_BASE_URL: process.env.API_BASE_URL || 'https://www.notion.so/api/v3',

  /**
   * Notion 数据库页面 ID (The One ID)
   * 提示：由于您已在 Vercel 后台配置了环境变量，此处保持为空。
   * 逻辑：系统会优先从云端读取您的 ID，这样可以防止您的数据库结构被他人窥探。
   */
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '',

  /**
   * 网站皮肤/主题 (Theme)
   * 设置：当前已为您配置为 'simple' 极简主题。
   * 可选：'heo' (精美)、'hexo' (标准)、'medium' (文字优先) 等。
   */
  THEME: process.env.NEXT_PUBLIC_THEME || 'simple',

  // 网站全局语言环境：'zh-CN' 代表简体中文
  LANG: process.env.NEXT_PUBLIC_LANG || 'zh-CN',

  // 网站起源年份：影响页脚版权声明的显示（如 © 2018 - 2026）
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2018,

  // =====================================================================
  // 第二部分：性能、缓存与访问控制 (Performance & Access)
  // =====================================================================

  /**
   * 伪静态路径开关 (Pseudo Static)
   * 开启后 URL 以 .html 结尾。对于静态托管站，false 通常更符合现代 URL 审美。
   */
  PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || false,

  /**
   * 缓存刷新间隔 (Incremental Static Regeneration)
   * 作用：每隔 60 秒，Vercel 会检查一次 Notion 是否有更新。
   * 优势：这保证了网站既有静态站的极速，又能动态同步您的笔记内容。
   */
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 60,

  /**
   * 全站外观模式 (Appearance)
   * ['light' (日间), 'dark' (夜间), 'auto' (随系统/时间自动切换)]
   */
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'light',

  // 自动切换黑夜模式的时间阈值 (24小时制)
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6],

  // =====================================================================
  // 第三部分：站长品牌与 SEO 资产 (Branding & Identity)
  // =====================================================================

  // 站长署名：显示在页脚版权、作者名片和搜索引擎结果中
  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'penboy451',

  // 个人简介：用于首页侧边栏及社交分享时的描述文字
  BIO: process.env.NEXT_PUBLIC_BIO || 'penboy451 的技术与 AI 探索笔记',

  /**
   * 网站权威链接 (Canonical Link) —— SEO 最核心配置
   * 作用：告诉 Google 这是您的正版地址，防止 Sitemap 链接错误。
   */
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://www.pengboyu.com',

  // 全站搜索关键词：用英文逗号隔开，帮助搜索引擎建立标签索引
  KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || 'penboy451, Blog, pengboyu.com, NotionNext',

  // 浏览器标签页图标路径
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || '/favicon.ico',

  // 备案信息管理（海外部署通常留空）
  BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '',
  BEI_AN_LINK: process.env.NEXT_PUBLIC_BEI_AN_LINK || 'https://beian.miit.gov.cn/',
  BEI_AN_GONGAN: process.env.NEXT_PUBLIC_BEI_AN_GONGAN || '',

  // =====================================================================
  // 第四部分：功能模块化载入 (Functional Modules)
  // 提示：以下每一行都对应了您下午“精装修”过的 /conf/ 配置文件。
  // =====================================================================

  ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS || true, // 开启订阅源

  ...require('./conf/comment.config'),       // 载入：评论交互系统
  ...require('./conf/contact.config'),       // 载入：社交联系方式
  ...require('./conf/post.config'),          // 载入：文章功能管理
  ...require('./conf/analytics.config'),     // 载入：流量统计与验证
  ...require('./conf/image.config'),         // 载入：图片优化逻辑
  ...require('./conf/font.config'),          // 载入：全球字体排版
  ...require('./conf/right-click-menu'),     // 载入：自定义右键菜单
  ...require('./conf/code.config'),          // 载入：代码高亮展示
  ...require('./conf/animation.config'),     // 载入：动态交互特效
  ...require('./conf/widget.config'),        // 载入：挂件与机器人
  ...require('./conf/ad.config'),            // 载入：广告位配置
  ...require('./conf/plugin.config'),        // 载入：高级插件增强
  ...require('./conf/performance.config'),   // 载入：性能调优方案

  // 底层系统逻辑 (维持默认)
  ...require('./conf/layout-map.config'),    // 路径组件映射
  ...require('./conf/notion.config'),        // 数据库字段对接
  ...require('./conf/dev.config'),           // 开发环境定义

  // =====================================================================
  // 第五部分：高级自定义与交互 (Advanced Customization)
  // =====================================================================

  // 允许注入外部自定义脚本/样式（如特殊的 CSS 装饰）
  CUSTOM_EXTERNAL_JS: [''],
  CUSTOM_EXTERNAL_CSS: [''],

  // 菜单系统逻辑：设置为 true 代表优先读取 Notion 中的 'Menu' 类型数据
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true,

  // 内容保护：是否允许访客复制您的文章内容
  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY || true,

  // 侧边栏布局反转：部分主题可将侧边栏由右侧移至左侧
  LAYOUT_SIDEBAR_REVERSE: process.env.NEXT_PUBLIC_LAYOUT_SIDEBAR_REVERSE || false,

  /**
   * 首页欢迎语 (Greeting Words)
   * 作用：在首页顶部以打字机特效展示的个性化文字。
   */
  GREETING_WORDS: process.env.NEXT_PUBLIC_GREETING_WORDS || 'Hi，我是 penboy451，欢迎来到我的数字领地。',

  /**
   * 自动重定向 UUID (SEO 关键)
   * 作用：将 Notion 生成的乱码 URL 自动映射为您设置的语义化 Slug。
   * 推荐：必须开启 (true)，否则文章 URL 会包含极长的乱码，不利于传播和搜索。
   */
  UUID_REDIRECT: process.env.UUID_REDIRECT || true
}

module.exports = BLOG
