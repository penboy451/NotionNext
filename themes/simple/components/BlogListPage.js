/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章列表分页组件 (Refined Blog List Pagination)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 极致纯净：彻底删除了文章列表循环中嵌套的广告位（AdSlot）代码，提升渲染性能。
 * 2. 品牌对齐：分页按钮统一切换为 penboy451 科技蓝 (#0070f3) 与全站色调同步。
 * 3. 本地化：将原版硬编码的英文导航文字（NEWER/OLDER）优化为优雅的中文呈现。
 * -----------------------------------------------------------------------
 */

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import { BlogItem } from './BlogItem'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 博客列表分页组件
 * @param {number} page - 当前页码
 * @param {Array} posts - 当前页待展示的文章数据
 * @param {number} postCount - 全站文章总数
 */
export default function BlogListPage(props) {
  const { page = 1, posts, postCount } = props
  const router = useRouter()
  const { NOTION_CONFIG } = useGlobal()
  
  // ==================== 分页核心计算 ====================
  
  // 每页文章容量：优先从系统配置读取
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  
  // 总页数计算
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  
  // 确保页码类型为数字
  const currentPage = +page

  // 控制分页按钮的可见性
  const showPrev = currentPage > 1
  const showNext = page < totalPage

  /**
   * URL 前缀预处理：
   * 自动剥离当前的页码参数，确保翻页链接生成准确。
   */
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  return (
    <div className='w-full md:pr-8 mb-12 antialiased'>
      
      {/* ==================== 文章流展示区 (Pure Content Feed) ==================== */}
      <div id='posts-wrapper' className="space-y-6">
        {posts?.map((p) => (
          <div key={p.id}>
            {/* 
                [审计说明]：
                已彻底移除原版中嵌套的 AdSlot (广告插槽) 逻辑。
                目前的循环仅执行纯粹的文章条目渲染。
            */}
            <BlogItem post={p} />
          </div>
        ))}
      </div>

      {/* ==================== 分页控制区 (Navigation Controls) ==================== */}
      <div className='flex justify-between items-center mt-12 pt-8 border-t border-gray-50 dark:border-gray-900'>
        
        {/* 上一页 (Newer) */}
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`
            ${showPrev ? 'text-[#0070f3] border-[#0070f3] opacity-100' : 'invisible opacity-0 pointer-events-none'} 
            flex items-center space-x-2 text-xs font-bold border-b-2 pb-1 transition-all duration-300 hover:-translate-x-1
          `}
        >
          <i className='fa-solid fa-arrow-left text-[10px]' />
          <span className='tracking-widest'>上一页</span>
        </SmartLink>

        {/* 下一页 (Older) */}
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`
            ${showNext ? 'text-[#0070f3] border-[#0070f3] opacity-100' : 'invisible opacity-0 pointer-events-none'} 
            flex items-center space-x-2 text-xs font-bold border-b-2 pb-1 transition-all duration-300 hover:translate-x-1
          `}
        >
          <span className='tracking-widest'>下一页</span>
          <i className='fa-solid fa-arrow-right text-[10px]' />
        </SmartLink>

      </div>
    </div>
  )
}
