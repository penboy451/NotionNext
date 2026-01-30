/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题专有配置文件 (Theme-Specific Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件专门管理 Simple 主题特有的视觉元素（如 Logo 描述、顶栏文字）。
 * 2. 这里的配置优先级非常高，若此处有硬编码的值，可能会覆盖全局设置。
 * -----------------------------------------------------------------------
 */

const CONFIG = {
  // 网站 Logo 图片路径
  SIMPLE_LOGO_IMG: '/Logo.webp',

  // 是否显示顶部通知栏 (Top Bar)
  SIMPLE_TOP_BAR: true,

  /**
   * 顶部通知栏内容 (Top Bar Tips)
   * 作用：显示在网站最顶部的滚动提示或口号。
   */
  SIMPLE_TOP_BAR_CONTENT: process.env.NEXT_PUBLIC_THEME_SIMPLE_TOP_TIPS || '欢迎来到PB的数字花园',

  /**
   * Logo 下方的站长描述 (Logo Description) —— 【私货清理点】
   * 作用：显示在左侧头像下方的个人简介。
   * 支持 HTML 标签，如使用 <br/> 进行换行。
   */
  SIMPLE_LOGO_DESCRIPTION: 
    process.env.NEXT_PUBLIC_THEME_SIMPLE_LOGO_DESCRIPTION || 
    '<div>PB的技术笔记<br/>/ AI 探索与项目实践<br/>/ 终身学习者</div>',

  /**
   * 作者链接 (Author Link)
   * 作用：点击头像或作者名后跳转的地址，建议设为首页或个人介绍页。
   */
  SIMPLE_AUTHOR_LINK: process.env.NEXT_PUBLIC_AUTHOR_LINK || '/',

  // 文章列表是否插入广告：默认关闭
  SIMPLE_POST_AD_ENABLE: process.env.NEXT_PUBLIC_SIMPLE_POST_AD_ENABLE || false,

  // 是否在文章列表展示封面图：simple 主题建议保持 false 以维持极简感
  SIMPLE_POST_COVER_ENABLE: process.env.NEXT_PUBLIC_SIMPLE_POST_COVER_ENABLE || false,

  // 文章详情底部是否显示相关文章推荐
  SIMPLE_ARTICLE_RECOMMEND_POSTS: process.env.NEXT_PUBLIC_SIMPLE_ARTICLE_RECOMMEND_POSTS || true,

  // =====================================================================
  // 菜单功能配置 (Menu Toggles)
  // =====================================================================
  SIMPLE_MENU_CATEGORY: true, // 开启侧边栏分类
  SIMPLE_MENU_TAG: true,      // 开启侧边栏标签
  SIMPLE_MENU_ARCHIVE: true,  // 开启侧边栏归档
  SIMPLE_MENU_SEARCH: true    // 开启侧边栏搜索
}

export default CONFIG
