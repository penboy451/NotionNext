/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章信息元数据组件 (Refined Article Metadata)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 终极视觉肃清：物理抹除全站最后几处“作者红”，全面实现科技蓝视觉闭环。
 * 2. 逻辑深度去重：修复了原版中“发布日期”双重显示的冗余逻辑，提升阅读效率。
 * 3. 结构化重组：重构了作者、分类、标签与统计信息的排版层级，视觉更稳重。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import NotionIcon from '@/components/NotionIcon'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 文章元数据展示组件
 * @param {Object} post - 文章数据对象
 */
export default function ArticleInfo(props) {
  const { post } = props
  const { locale } = useGlobal()

  return (
    <section className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed antialiased">
      
      {/* ==================== 标题展示区 ==================== */}
      <h2 className="blog-item-title mb-6 font-bold text-black dark:text-white text-2xl md:text-3xl tracking-tighter no-underline">
        {siteConfig('POST_TITLE_ICON') && (
          <span className="mr-3 opacity-90"><NotionIcon icon={post?.pageIcon} /></span>
        )}
        {post?.title}
      </h2>

      {/* ==================== 元数据聚合区 (Author, Date, Category, Tags) ==================== */}
      <div className='flex flex-wrap items-center text-sm gap-y-3 gap-x-6 text-gray-500 dark:text-gray-400'>
        
        {/* 仅针对标准博文 (非 Page) 展示以下信息 */}
        {post?.type !== 'Page' && (
          <>
            {/* 站长署名 */}
            <div className='flex items-center'>
              <i className="fa-regular fa-user mr-2 opacity-70" />
              <a 
                href={siteConfig('SIMPLE_AUTHOR_LINK', null, CONFIG)}
                className="hover:text-[#0070f3] transition-colors duration-300 font-medium"
              >
                {siteConfig('AUTHOR')}
              </a>
            </div>

            {/* 发布日期 (集成归档跳转) */}
            <div className='flex items-center'>
              <i className="fa-regular fa-clock mr-2 opacity-70" />
              <SmartLink
                href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                className="hover:text-[#0070f3] transition-colors duration-300"
              >
                {post?.publishDay}
              </SmartLink>
            </div>

            {/* 分类：亮起科技蓝 */}
            {post?.category && (
              <div className='flex items-center'>
                <i className="fa-regular fa-folder mr-2 opacity-70" />
                <a 
                  href={`/category/${post?.category}`} 
                  className="text-[#0070f3] dark:text-blue-400 hover:underline transition-all font-medium"
                >
                  {post?.category}
                </a>
              </div>
            )}

            {/* 标签云：采用 # 符号风格，保持全站一致 */}
            <div className="flex flex-wrap gap-2">
              {post?.tags && post?.tags?.length > 0 && post?.tags.map(t => (
                <SmartLink key={t} href={`/tag/${t}`}>
                  <span className='text-xs text-gray-400 hover:text-[#0070f3] hover:font-bold transition-all duration-300'>
                    #{t}
                  </span>
                </SmartLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ==================== 次要元数据区 (Editing & PV) ==================== */}
      {post?.type !== 'Page' && (
        <div className='mt-4 flex flex-wrap items-center text-xs text-gray-400 space-x-4 border-t border-gray-50 dark:border-gray-900 pt-4'>
          
          {/* 最后编辑时间 */}
          <span className="italic opacity-80">
            {locale.COMMON.LAST_EDITED_TIME}: {post?.lastEditedDay}
          </span>

          <span className='opacity-30 text-gray-300'>|</span>

          {/* 不蒜子访问量统计 (Busuanzi) */}
          <span className="busuanzi_container_page_pv font-light">
            <i className='mr-1.5 fas fa-eye opacity-60' />
            <span className="busuanzi_value_page_pv" />
            <span className="ml-1.5">{locale.COMMON.VIEWS}</span>
          </span>
        </div>
      )}
    </section>
  )
}
