/**
 * -----------------------------------------------------------------------
 * NotionNext 路由路径与页面组件映射表 (Layout Map Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件定义了不同 URL 路径下应该展示的主题组件。
 * 2. 除非您想深度自定义网站的路由逻辑，否则请保持默认设置。
 * -----------------------------------------------------------------------
 */

module.exports = {
  LAYOUT_MAPPINGS: {
    '-1': 'LayoutBase',                             // 基础布局
    '/': 'LayoutIndex',                             // 首页
    '/archive': 'LayoutArchive',                   // 归档页
    '/page/[page]': 'LayoutPostList',              // 文章列表分页
    '/category/[category]': 'LayoutPostList',      // 分类列表
    '/category/[category]/page/[page]': 'LayoutPostList',
    '/tag/[tag]': 'LayoutPostList',                // 标签列表
    '/tag/[tag]/page/[page]': 'LayoutPostList',
    '/search': 'LayoutSearch',                     // 搜索页
    '/search/[keyword]': 'LayoutSearch',
    '/search/[keyword]/page/[page]': 'LayoutSearch',
    '/404': 'Layout404',                           // 404 错误页
    '/tag': 'LayoutTagIndex',                      // 标签云页
    '/category': 'LayoutCategoryIndex',            // 分类索引页
    '/[prefix]': 'LayoutSlug',                     // 单级路径重定向
    '/[prefix]/[slug]': 'LayoutSlug',               // 标准文章路径
    '/[prefix]/[slug]/[...suffix]': 'LayoutSlug',   // 多级深度路径
    '/auth/result': 'LayoutAuth',                  // 身份验证结果
    '/sign-in/[[...index]]': 'LayoutSignIn',       // 登录页
    '/sign-up/[[...index]]': 'LayoutSignUp',       // 注册页
    '/dashboard/[[...index]]': 'LayoutDashboard'    // 用户仪表盘
  }
}
