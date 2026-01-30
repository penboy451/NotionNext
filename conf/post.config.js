/**
 * -----------------------------------------------------------------------
 * NotionNext 文章功能与阅读体验配置文件 (Post & Reading Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于配置文章的 URL 结构、自动发布逻辑、社交分享条以及列表展示样式。
 * 2. 核心建议：合理的 URL 前缀（如 /article）有利于搜索引擎建立清晰的站点结构。
 * 3. 分享功能：建议根据您的受众群体选择性开启（国内侧重微信/微博，国际侧重 X/Telegram）。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：URL 结构与发布逻辑 (Permalink & Scheduling)
  // =====================================================================

  /**
   * 文章 URL 路径前缀
   * 默认：'article'。例如：www.pengboyu.com/article/hello-world
   * 提示：若填为空字符串 ''，则路径变为 www.pengboyu.com/hello-world
   * 高级：支持占位符，如 'article/%year%/%month%/%day%' 可实现按日期生成的动态路径。
   */
  POST_URL_PREFIX: process.env.NEXT_PUBLIC_POST_URL_PREFIX ?? 'article',

  /**
   * 定时发布控制 (Schedule Publish)
   * 作用：系统会根据 Notion 数据库中的 'date' 字段自动判断。
   * 效果：若日期设为未来时间，文章将暂时处于“隐藏”状态，直到时间到达后自动上线。
   */
  POST_SCHEDULE_PUBLISH: process.env.NEXT_PUBLIC_NOTION_SCHEDULE_PUBLISH || true,

  // =====================================================================
  // 第二部分：社交分享功能 (Social Sharing)
  // =====================================================================

  // 文章底部分享条总开关
  POST_SHARE_BAR_ENABLE: process.env.NEXT_PUBLIC_POST_SHARE_BAR || 'true',

  /**
   * 分享服务列表 (Sharing Services)
   * 排序说明：按填写的先后顺序在网页上展示。
   * 支持列表：link(复制链接), wechat(微信), qq, weibo(微博), email(邮件), 
   *          twitter, telegram, facebook, messenger, line, reddit, whatsapp, linkedin等。
   */
  POSTS_SHARE_SERVICES:
    process.env.NEXT_PUBLIC_POST_SHARE_SERVICES ||
    'link,wechat,weibo,email,twitter,telegram,facebook,linkedin,reddit,whatsapp',

  // =====================================================================
  // 第三部分：文章列表展示样式 (List View & Display)
  // =====================================================================

  // 文章标题左侧是否显示 Notion 中设置的图标 (Icon)
  POST_TITLE_ICON: process.env.NEXT_PUBLIC_POST_TITLE_ICON || true,

  // 画册视图禁用点击 (仅用于特殊页面调试，默认 false)
  POST_DISABLE_GALLERY_CLICK: process.env.NEXT_PUBLIC_POST_DISABLE_GALLERY_CLICK || false,

  /**
   * 文章列表加载样式 (Pagination Style)
   * 'page': 传统的页码分页模式（有利于 SEO 和定位）
   * 'scroll': 瀑布流/滚动自动加载模式（适合移动端社交体验）
   */
  POST_LIST_STYLE: process.env.NEXT_PUBLIC_POST_LIST_STYLE || 'page',

  // 是否在列表页显示文章的正文预览 (注意：开启后会略微减慢首页加载速度)
  POST_LIST_PREVIEW: process.env.NEXT_PUBLIC_POST_PREVIEW || 'false',

  // 预览文字的截取行数
  POST_PREVIEW_LINES: process.env.NEXT_PUBLIC_POST_POST_PREVIEW_LINES || 12,

  // =====================================================================
  // 第四部分：内容逻辑与排序 (Content Logic)
  // =====================================================================

  // 每篇文章底部的“推荐阅读”数量
  POST_RECOMMEND_COUNT: process.env.NEXT_PUBLIC_POST_RECOMMEND_COUNT || 6,

  // 每页显示的文章数量
  POSTS_PER_PAGE: process.env.NEXT_PUBLIC_POST_PER_PAGE || 12,

  /**
   * 文章排序规则
   * 'notion': 完全遵照您在 Notion 视图中手动拖动的顺序（推荐，最灵活）
   * 'date': 严格按照发布日期从新到旧排序
   */
  POSTS_SORT_BY: process.env.NEXT_PUBLIC_POST_SORT_BY || 'notion',

  // 文章加载超时时间（秒）：超过此时间无法读取 Notion 数据则跳转 404
  POST_WAITING_TIME_FOR_404: process.env.NEXT_PUBLIC_POST_WAITING_TIME_FOR_404 || '8',

  // =====================================================================
  // 第五部分：文章生命周期管理 (Content Lifecycle)
  // =====================================================================

  /**
   * 过期提醒 (Content Expiration Warning)
   * 作用：当文章发布时间很久时，在页顶提示读者内容可能已过时。
   * 提示：目前主要支持 Heo 等特定主题。
   */
  ARTICLE_EXPIRATION_ENABLED: process.env.NEXT_PUBLIC_ARTICLE_EXPIRATION_ENABLED || 'false',
  ARTICLE_EXPIRATION_DAYS: process.env.NEXT_PUBLIC_ARTICLE_EXPIRATION_DAYS || 90, // 超过 90 天触发
  ARTICLE_EXPIRATION_MESSAGE:
    process.env.NEXT_PUBLIC_ARTICLE_EXPIRATION_MESSAGE ||
    '这篇文章发布于 %%DAYS%% 天前，内容可能已过时，请谨慎参考。',

  // =====================================================================
  // 第六部分：标签与元数据 (Tags & Metadata)
  // =====================================================================

  // 标签是否按文章数量倒序排列（热门标签在前）
  TAG_SORT_BY_COUNT: true,

  // 是否让同名标签保持相同的颜色标识
  IS_TAG_COLOR_DISTINGUISHED:
    process.env.NEXT_PUBLIC_IS_TAG_COLOR_DISTINGUISHED === 'true' || true
}
