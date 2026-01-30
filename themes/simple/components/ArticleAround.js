/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章翻页导航组件 (Refined Article Pagination)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 逻辑除错：修正了“单篇文章”状态下，上一篇与下一篇指向同一网址的逻辑冗余。
 * 2. 视觉一致性：悬浮态统一切换为 penboy451 科技蓝 (#0070f3)。
 * 3. 布局加固：引入 truncate 截断逻辑，防止长标题在小屏设备下发生堆叠。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 文章翻页导航组件
 * @param {Object} prev - 上一篇文章元数据
 * @param {Object} next - 下一篇文章元数据
 */
export default function ArticleAround({ prev, next }) {
  
  /**
   * 关键逻辑校验：
   * 1. 若两端数据均为空，彻底隐藏。
   * 2. 增加 isSame 判定，防止在文章极少时出现“左边和右边是同一篇”的尴尬情况。
   */
  const isSame = prev?.id === next?.id
  
  if (!prev && !next) {
    return <></>
  }

  return (
    <section className='mt-12 pt-8 mb-4 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-y-0 antialiased'>
        
        {/* ------------------ 左侧：上一篇 (PREV) ------------------ */}
        <div className="w-full md:w-1/2 flex justify-start">
          {prev && !isSame && (
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

        {/* ------------------ 右侧：下一篇 (NEXT) ------------------ */}
        <div className="w-full md:w-1/2 flex justify-end">
          {next && !isSame && (
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
