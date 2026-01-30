/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章列表状态提示栏 (Refined List Status Bar)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 视觉聚焦：引入 penboy451 科技蓝 (#0070f3) 高亮核心关键词，强化筛选反馈。
 * 2. 结构增强：增加精致的底边线与内边距，使提示栏更具“组件感”，不再单薄。
 * 3. 交互细节：全线开启抗锯齿优化 (antialiased)，提升大号文字的视觉质感。
 * -----------------------------------------------------------------------
 */

import { useGlobal } from '@/lib/global'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 文章列表上方状态条
 * @param {string} tag - 当前激活的标签名
 * @param {string} category - 当前激活的分类名
 */
export default function BlogPostBar(props) {
  const { tag, category } = props
  const { locale } = useGlobal()

  // 渲染逻辑 A：若存在标签过滤
  if (tag) {
    return (
      /**
       * 容器层：
       * - border-b: 增加细微的灰白色底线，起到视觉锚定作用。
       * - text-gray-500: 辅助文字采用中性灰色。
       */
      <div className='flex items-center text-xl md:text-2xl py-4 mb-6 border-b border-gray-100 dark:border-gray-800 antialiased'>
        <i className='mr-3 fas fa-tag text-gray-400 opacity-60' />
        <span className="text-gray-500 dark:text-gray-400 font-light">
          {locale.COMMON.TAGS}:
        </span>
        {/* 核心关键词：亮起品牌科技蓝 */}
        <span className="ml-2 font-bold text-[#0070f3] dark:text-blue-400">
          {tag}
        </span>
      </div>
    )
  } 
  
  // 渲染逻辑 B：若存在分类过滤
  else if (category) {
    return (
      <div className='flex items-center text-xl md:text-2xl py-4 mb-6 border-b border-gray-100 dark:border-gray-800 antialiased'>
        <i className='mr-3 fas fa-th text-gray-400 opacity-60' />
        <span className="text-gray-500 dark:text-gray-400 font-light">
          {locale.COMMON.CATEGORY}:
        </span>
        {/* 核心关键词：亮起品牌科技蓝 */}
        <span className="ml-2 font-bold text-[#0070f3] dark:text-blue-400">
          {category}
        </span>
      </div>
    )
  } 
  
  // 逻辑终点：无过滤状态下不返回任何 HTML 结构
  else {
    return <></>
  }
}
