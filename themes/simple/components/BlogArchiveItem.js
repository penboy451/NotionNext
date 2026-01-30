/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章归档单项组件 (Refined Archive Group Item)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 动效肃清：废弃了会导致文字拉伸变形的 scale-x 逻辑，改用平滑的 translate-x 位移。
 * 2. 品牌统合：引入 penboy451 科技蓝 (#0070f3) 作为时间轴高亮色，确保全站一致。
 * 3. 排版精修：优化了列表项的内边距与对比度，提升长列表下的视觉扫描效率。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 归档分组文章条目
 * @param {string} archiveTitle - 归档标题（通常为年份或月份，如 2024-01）
 * @param {Object} archivePosts - 全量归档数据对象
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle} className="antialiased">
      
      {/* 
          归档时间标题区：
          - id: 作为页面内锚点，支持通过 URL 跳转到特定月份。
          - text-3xl: 粗犷的字号形成鲜明的层级感。
      */}
      <div 
        id={archiveTitle} 
        className='pt-16 pb-6 text-3xl font-bold text-black dark:text-gray-200 tracking-tighter'
      >
        {archiveTitle}
      </div>

      <ul className="space-y-1">
        {archivePosts[archiveTitle].map(post => {
          return (
            /**
             * 列表单项容器：
             * - border-l-2: 模拟时间轴的竖线。
             * - hover:translate-x-2: 鼠标悬浮时向右微移，产生灵动的交互感。
             * - hover:border-[#0070f3]: 悬浮时竖线亮起品牌蓝。
             */
            <li
              key={post.id}
              className='border-l-2 border-gray-100 dark:border-gray-800 p-2 text-sm md:text-base flex items-center transition-all duration-300 transform hover:translate-x-2 hover:border-[#0070f3] group'
            >
              <div id={post?.publishDay} className="flex items-center w-full">
                
                {/* 发布日期：保持低调的浅灰色 */}
                <span className='text-gray-400 dark:text-gray-500 font-mono text-xs md:text-sm mr-4 min-w-[85px] md:min-w-[100px]'>
                  {post.date?.start_date}
                </span>

                {/* 
                    文章标题链接：
                    - hover:text-[#0070f3]: 文字悬浮同步变蓝。
                    - transition-colors: 确保变色过程不生硬。
                */}
                <SmartLink
                  href={post?.href}
                  passHref
                  className='flex-1 text-gray-700 dark:text-gray-400 hover:text-[#0070f3] dark:hover:text-blue-300 transition-colors duration-300 cursor-pointer truncate'
                >
                  {post.title}
                </SmartLink>

              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
