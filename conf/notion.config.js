/**
 * -----------------------------------------------------------------------
 * NotionNext 数据库字段映射与读取配置文件 (Notion Data Mapping Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：本文件将您 Notion 数据库中的【列名】映射到代码逻辑中。
 * 2. 同步要求：如果您在 Notion 表格中修改了标题（例如把 'status' 改为 '发布状态'），
 *    则必须在此文件中同步修改对应的配置项。
 * 3. 优先级：环境变量 (Vercel) > 本地代码配置。
 * -----------------------------------------------------------------------
 */

module.exports = {
  /**
   * Notion 视图索引 (Notion View Index)
   * 作用：决定程序读取数据库中的哪一个“视图”。
   * 默认：0 (代表读取表格左上角第一个视图)。
   * 提示：计算机计数从 0 开始，若想读取第二个视图请填 1。
   */
  NOTION_INDEX: process.env.NEXT_PUBLIC_NOTION_INDEX || 0,

  // =====================================================================
  // 自定义 Notion 数据库字段名映射 (Property Mapping)
  // =====================================================================
  NOTION_PROPERTY_NAME: {
    // 文章密码：对应 Notion 中的 'password' 列，用于保护私密文章
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || 'password',

    /**
     * 文章类型 (Type)：决定这一行是一个【博客文章】、一个【独立页面】还是一个【菜单项】
     * 对应 Notion 中的 'type' 列
     */
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type',
    
    // --- 类型常量定义 (只有 Notion 中 'type' 列的值等于以下字符串时才会生效) ---
    type_post: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || 'Post',           // 博客文章
    type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || 'Page',           // 独立页面（如：关于、友链）
    type_notice: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || 'Notice',     // 网站公告
    type_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_MENU || 'Menu',           // 顶部导航菜单
    type_sub_menu: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_SUB_MENU || 'SubMenu', // 下拉子菜单

    // 文章标题：对应 Notion 中的 'title' 列（必须是 Title 类型）
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title',

    /**
     * 发布状态 (Status)：决定文章是否对公众可见
     * 对应 Notion 中的 'status' 列
     */
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status',
    
    // --- 状态常量定义 ---
    status_publish: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Published', // 已发布（全网可见）
    status_invisible: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || 'Invisible', // 隐藏（仅自己可见）

    // 文章摘要：对应 Notion 中的 'summary' 列，显示在首页列表的预览文字
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary',

    // 自定义路径 (Slug)：对应 Notion 中的 'slug' 列，决定文章的网址后缀
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug',

    // 分类：对应 Notion 中的 'category' 列（通常设为 Select 类型）
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category',

    // 发布日期：对应 Notion 中的 'date' 列（必须是 Date 类型）
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date',

    // 标签：对应 Notion 中的 'tags' 列（通常设为 Multi-select 类型）
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags',

    // 页面图标：对应 Notion 中的 'icon' 列
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || 'icon',

    // 扩展字段：用于存储一些复杂的 JSON 格式数据，通常保持默认
    ext: process.env.NEXT_PUBLIC_NOTION_PROPERTY_EXT || 'ext'
  },

  // =====================================================================
  // 高级安全配置 (Security & Auth)
  // =====================================================================

  /**
   * 指定激活用户：
   * 仅当您的 Notion 工作区有多个成员，且只想读取特定成员的数据时才需要配置。
   */
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || '',

  /**
   * Notion Token (V2)：
   * 作用：如果您不想将 Notion 数据库设为 Public (公开)，则必须填写此 Token。
   * 安全警告：
   * 1. 这是一个极其敏感的身份凭证，泄露后他人可读取您的所有私有数据。
   * 2. 强烈建议：【不要】写在这里！请在 Vercel 环境变量中添加 NOTION_TOKEN_V2。
   */
  NOTION_TOKEN_V2: process.env.NOTION_TOKEN_V2 || ''
}
