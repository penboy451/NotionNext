/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章翻页导航组件 (Refined Article Pagination)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 逻辑修复：修正了原版中“非全即无”的显示 Bug，支持单向导航展示。
 * 2. 品牌对齐：悬浮态同步切换为科技蓝 (#0070f3)，并增加平滑位移动画。
 * 3. 布局稳健：引入标题截断逻辑与弹性布局，确保长标题在移动端不冲突、不溢出。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 文章翻页导航组件
 * @param {Object} prev - 上一篇文章的元数据对象 (包含 title, slug)
 * @param {Object} next - 下一篇文章的元数据对象 (包含 title, slug)
 */
export default function ArticleAround({ prev, next }) {
  
  /**
   * 逻辑修复说明：
   * 原版逻辑为 if (!prev || !next)，这会导致首篇或末篇文章无法显示导航。
   * 优化后：仅当两端数据均不存在时（如单页模式）才彻底隐藏。
   */
  if (!prev && !next) {
    return <></>
  }

  return (
    /**
     * 容器层：
     * - border-t: 增加顶部细微分割线，将正文与导航区物理隔离。
     * - space-x-6: 为左右两侧链接留出充足的横向呼吸感。
     */
    <section className='mt-12 pt-8 mb-4 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-y-0 antialiased'>
        
        {/* ==================== 左侧：上一篇文章 (Previous) ==================== */}
        <div className="w-full md:w-1/2 flex justify-start">
          {prev && (
            <SmartLink
                href={`/${prev.slug}`}
                passHref
                className='group flex items-center space-x-2 text-gray-500 hover:text-[#0070f3] dark:text-gray-400 dark:hover:text-blue-300 transition-all duration-300 transform hover:-translate-x-1 overflow-hidden'
            >
                <i className='fas fa-angle-double-left text-xs opacity-50 group-hover:opacity-100' />
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 mb-0.5">PREV</span>
                  <span className='text-sm font-medium truncate max-w-[240px] md:max-w-[320px]'>
                    {prev.title}
                  </span>
                </div>
            </SmartLink>
          )}
        </div>

        {/* ==================== 右侧：下一篇文章 (Next) ==================== */}
        <div className="w-full md:w-1/2 flex justify-end">
          {next && (
            <SmartLink
                href={`/${next.slug}`}
                passHref
                className='group flex items-center space-x-2 text-gray-500 hover:text-[#0070f3] dark:text-gray-400 dark:hover:text-blue-300 transition-all duration-300 transform hover:translate-x-1 overflow-hidden'
            >
                <div className="flex flex-col items-end overflow-hidden">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 mb-0.5">NEXT</span>
                  <span className='text-sm font-medium truncate max-w-[240px] md:max-w-[320px] text-right'>
                    {next.title}
                  </span>
                </div>
                <i className='fas fa-angle-double-right text-xs opacity-50 group-hover:opacity-100' />
            </SmartLink>
          )}
        </div>

    </section>
  )
}
