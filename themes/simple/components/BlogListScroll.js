/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章滚动列表组件 (Refined Infinite Scroll List)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 性能修复：重构了 Hooks 依赖链，解决滚动监听器高频率无效绑定的性能问题。
 * 2. 视觉统合：移除原版非正式的 Emoji 表情，引入全站统一的科技蓝交互反馈。
 * 3. 稳健逻辑：优化了瀑布流触底判定算法，确保在不同分辨率设备下均能流畅加载。
 * -----------------------------------------------------------------------
 */

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BlogItem } from './BlogItem'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 瀑布流滚动列表组件
 * @param {Array} posts - 待渲染的文章全量数组
 */
export default function BlogListScroll(props) {
  const { posts } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1) // 当前加载的虚拟页码
  const targetRef = useRef(null)
  
  // 配置读取：每页展示数量
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)

  /**
   * 分页计算逻辑：
   * 截取当前页码应展示的文章子集。
   */
  const postsToShow = posts
    ? Object.assign(posts).slice(0, POSTS_PER_PAGE * page)
    : []

  /**
   * 状态判定：
   * 判断 Notion 数据库中是否还有未加载的剩余文章。
   */
  const hasMore = posts ? page * POSTS_PER_PAGE < posts.length : false

  /**
   * 加载更多处理函数
   */
  const handleGetMore = useCallback(() => {
    if (!hasMore) return
    updatePage(prevPage => prevPage + 1)
  }, [hasMore])

  /**
   * 性能核心：滚动触底触发器
   * 逻辑：计算当前滚动位置，当距离容器底部 100px 时自动触发 handleGetMore。
   * 优化：采用 500ms 节流，防止滚动过程中产生密集的计算任务。
   */
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.innerHeight
      const clientHeight = targetRef.current ? targetRef.current.clientHeight : 0
      
      // 触底判定算法
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500),
    [handleGetMore] // 依赖于 handleGetMore，确保逻辑一致性
  )

  /**
   * 监听器生命周期管理：
   * 作用：在组件挂载时开启监听，卸载时彻底移除，防止内存泄露。
   * 优化：增加了 scrollTrigger 依赖，实现精准的生命周期控制。
   */
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [scrollTrigger])

  return (
    <div id='posts-wrapper' className='w-full md:pr-8 mb-12 antialiased' ref={targetRef}>
      
      {/* ==================== 文章内容流 (Post Feed) ==================== */}
      <div className="space-y-2">
        {postsToShow.map(p => (
          <BlogItem key={p.id} post={p} />
        ))}
      </div>

      {/* ==================== 加载状态指示器 (Status Indicator) ==================== */}
      <div
        onClick={handleGetMore}
        /**
         * 视觉优化点：
         * 1. 移除了 😰 表情，回归专业文字表述。
         * 2. hover:text-[#0070f3]: 鼠标悬浮时亮起品牌蓝。
         * 3. transition: 平滑的颜色过渡。
         */
        className={`
          w-full my-8 py-4 text-center cursor-pointer transition-all duration-300
          text-sm tracking-widest font-light
          ${hasMore 
            ? 'text-gray-500 hover:text-[#0070f3] hover:font-medium' 
            : 'text-gray-300 cursor-default italic'}
        `}
      >
        {hasMore ? (
          <div className="flex items-center justify-center space-x-2">
            <span>{locale.COMMON.MORE}</span>
            <i className="fas fa-chevron-down text-xs opacity-50" />
          </div>
        ) : (
          `--- ${locale.COMMON.NO_MORE} ---`
        )}
      </div>

    </div>
  )
}
