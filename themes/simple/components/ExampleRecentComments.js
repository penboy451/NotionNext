/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：最近评论组件 (Refined Recent Comments Section)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 品牌交互升级：彻底移除残留的作者红，将悬浮态统一切换为科技蓝 (#0070f3)。
 * 2. 本地化体验：将原版硬编码的英文提示词（Loading/No Comments）翻译并美化为中文。
 * 3. 视觉一致性：同步优化了加载动画的颜色，确保组件在各状态下均符合全站视觉规范。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'
import { RecentComments } from '@waline/client'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 最近评论展示组件
 * 作用：从 Waline 评论系统实时抓取全站最新的交互数据。
 */
const ExampleRecentComments = (props) => {
  const [comments, updateComments] = useState([])
  const [onLoading, changeLoading] = useState(true)

  /**
   * 数据抓取逻辑：
   * 在组件挂载时，通过 Waline 客户端 API 获取最近的 5 条真实评论。
   */
  useEffect(() => {
    RecentComments({
      serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
      count: 5
    }).then(({ comments }) => {
      changeLoading(false)
      updateComments(comments)
    }).catch(err => {
      console.error('Waline 数据抓取失败:', err)
      changeLoading(false)
    })
  }, [])

  return (
    <div className="recent-comments-wrapper antialiased">
        
        {/* ==================== 状态 A：数据加载中 (Loading) ==================== */}
        {onLoading && (
          <div className="text-gray-400 text-sm flex items-center py-4">
            <i className='mr-3 fas fa-spinner animate-spin text-[#0070f3]' />
            正在同步评论...
          </div>
        )}
        
        {/* ==================== 状态 B：无数据展示 (Empty) ==================== */}
        {!onLoading && comments && comments.length === 0 && (
          <div className="text-gray-400 text-sm italic py-4">
            暂无最新动态
          </div>
        )}
        
        {/* ==================== 状态 C：评论列表渲染 (Content) ==================== */}
        {!onLoading && comments && comments.length > 0 && comments.map((comment) => (
          <div key={comment.objectId} className='group border-b border-gray-50 dark:border-gray-900 last:border-0 pb-3 mb-3'>
            
            {/* 评论内容预览区 */}
            <div 
              className='dark:text-gray-300 text-gray-600 text-xs leading-relaxed waline-recent-content wl-content' 
              dangerouslySetInnerHTML={{ __html: comment.comment }} 
            />
            
            {/* 评论者身份与跳转区 */}
            <div className='mt-2 text-right'>
              <SmartLink 
                href={{ pathname: comment.url, hash: comment.objectId, query: { target: 'comment' } }}
                className='text-xs text-gray-400 hover:text-[#0070f3] hover:underline transition-all duration-300'
              >
                <span className="opacity-50">#</span> {comment.nick}
              </SmartLink>
            </div>

          </div>
        ))}
    </div>
  )
}

export default ExampleRecentComments
