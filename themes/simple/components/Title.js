/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题专有配置文件 (Theme-Specific configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：专门管理 Simple 主题特有的视觉元素，如 Logo 描述、顶栏文字及功能开关。
 * 2. 优先级：此处定义的硬编码值具有极高优先级，建议保持品牌信息与 blog.config.js 同步。
 * 3. 维护提示：若在 Vercel 环境变量中设置了对应 KEY，则此处配置将被云端值覆盖。
 * -----------------------------------------------------------------------
 */

const CONFIG = {
  // =====================================================================
  // 第一部分：品牌视觉与身份 (Identity & Branding)
  // =====================================================================

  // 网站 Logo 图片路径 (存放于 /public 目录下)
  SIMPLE_LOGO_IMG: '/Logo.webp',

  /**
   * 顶部通知栏内容 (Top Bar Tips)
   * 作用：显示在网站最顶部的滚动提示。
   * 状态：已同步为 penboy451 品牌。
   */
  SIMPLE_TOP_BAR_CONTENT: 
    process.env.NEXT_PUBLIC_THEME_SIMPLE_TOP_TIPS || 
    '欢迎来到 penboy451 的数字花园',

  /**
   * Logo 下方的站长描述 (Logo Description) —— 【重点肃清点】
   * 作用：显示在左侧头像正下方的简介。
   * 格式：支持 HTML 标签，使用 <br/> 可实现手动换行。
   */
  SIMPLE_LOGO_DESCRIPTION: 
    process.env.NEXT_PUBLIC_THEME_SIMPLE_LOGO_DESCRIPTION || 
    '<div>penboy451 的技术笔记<br/>/ AI 探索与项目实践<br/>/ 终身学习者</div>',

  /**
   * 作者链接 (Author Link)
   * 作用：点击头像或作者名后的跳转目标。
   * 建议：设为 '/' 以实现点击回首页。
   */
  SIMPLE_AUTHOR_LINK: process.env.NEXT_PUBLIC_AUTHOR_LINK || '/',

  // =====================================================================
  // 第二部分：文章列表与详情配置 (Post & Article Settings)
  // =====================================================================

  // 文章列表中是否插入广告插槽：当前已执行“去广告化”策略，设为 false
  SIMPLE_POST_AD_ENABLE: process.env.NEXT_PUBLIC_SIMPLE_POST_AD_ENABLE || false,

  // 是否展示文章列表封面：保持 false 可获得更极致的文字极简感
  SIMPLE_POST_COVER_ENABLE: process.env.NEXT_PUBLIC_SIMPLE_POST_COVER_ENABLE || false,

  // 文章详情页底部是否开启“相关文章推荐”功能
  SIMPLE_ARTICLE_RECOMMEND_POSTS: process.env.NEXT_PUBLIC_SIMPLE_ARTICLE_RECOMMEND_POSTS || true,

  // =====================================================================
  // 第三部分：菜单与功能组件开关 (Component Toggles)
  // =====================================================================

  SIMPLE_TOP_BAR: true,      // 开启顶栏
  SIMPLE_MENU_CATEGORY: true, // 开启侧边栏分类索引
  SIMPLE_MENU_TAG: true,      // 开启侧边栏标签索引
  SIMPLE_MENU_ARCHIVE: true,  // 开启侧边栏时间轴归档
  SIMPLE_MENU_SEARCH: true    // 开启侧边栏本地搜索
}

export default CONFIG
