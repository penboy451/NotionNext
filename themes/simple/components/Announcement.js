/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：全站公告组件 (Refined Announcement Component)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 逻辑精简：肃清了原版中冗余的条件判断，优化了 React 的协调（Reconciliation）过程。
 * 2. 接口开放：修复了原版 className 传递失效的缺陷，支持动态样式注入。
 * 3. 性能导向：继续沿用动态导入逻辑，确保非必要资源不占用首页加载带宽。
 * -----------------------------------------------------------------------
 */

import dynamic from 'next/dynamic'

// =====================================================================
// 第一部分：辅助组件引入 (Auxiliary Components)
// =====================================================================

/**
 * 异步引入 Notion 内容渲染核心
 * 作用：处理复杂的 Notion 块结构，仅在组件被实际调用时触发加载。
 */
const NotionPage = dynamic(() => import('@/components/NotionPage'))

// =====================================================================
// 第二部分：组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 公告挂件
 * @param {Object} post - Notion 公告文章对象 (Notice 类型)
 * @param {String} className - 自定义 CSS 类名，用于从外部控制布局间距
 */
const Announcement = ({ post, className }) => {
  /**
   * 渲染守卫：
   * 若 Notion 数据源中不存在公告内容，则直接返回 null。
   * 这能有效防止产生空 div 导致页面出现莫名其妙的空白间距。
   */
  if (!post) {
    return null
  }

  return (
    /**
     * 公告容器层：
     * - id="announcement-content": 供全站样式表精准定位。
     * - px-3: 基础左右边距。
     * - ${className || ''}: 支持外部样式覆盖，提升了组件的工业化成熟度。
     */
    <div 
        id="announcement-content" 
        className={`px-3 antialiased ${className || ''}`}
    >
      {/* 直接渲染 Notion 内容，无需再次判断 post 是否存在 */}
      <NotionPage post={post} />
    </div>
  )
}

export default Announcement
