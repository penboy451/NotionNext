/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章列表单项组件 (Refined Blog List Item)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 视觉大一统：彻底移除残留的作者红，全线切换为 penboy451 科技蓝 (#0070f3)。
 * 2. 本地化增强：将阅读更多按钮由英文优化为中文，并匹配全站品牌交互动效。
 * 3. 布局微调：重构了元数据区的间距逻辑，确保在不同屏幕下排版整齐且重点突出。
 * -----------------------------------------------------------------------
 */

import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 文章列表单项
 * @param {Object} post - 文章元数据对象
 */
export const BlogItem = props => {
  const { post } = props
  const { NOTION_CONFIG, locale } = useGlobal()
  
  // 封面图显示逻辑
  const showPageCover = siteConfig('SIMPLE_POST_COVER_ENABLE', false, CONFIG)
  
  // 列表页正文预览显示逻辑
  const showPreview =
    siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post.blockMap

  return (
    <div
      key={post.id}
      className='h-42 my-8 pb-10 border-b border-gray-100 dark:border-gray-900 transition-all duration-300 antialiased'>
      
      {/* ==================== 顶部内容区 (Title & Cover) ==================== */}
      <div className='flex flex-col md:flex-row'>
        
        {/* 封面图片区 */}
        <div className='article-cover'>
          {showPageCover && (
            <div className='overflow-hidden mr-0 md:mr-6 w-full md:w-56 h-48 md:h-full rounded-sm mb-4 md:mb-0'>
              <SmartLink href={post.href} passHref legacyBehavior>
                <LazyImage
                  src={post?.pageCoverThumbnail}
                  className='w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500 cursor-pointer'
                />
              </SmartLink>
            </div>
          )}
        </div>

        <article className='article-info flex-1'>
          {/* 文章标题：集成 Notion 图标并统一悬浮下划线动效 */}
          <h2 className='mb-3'>
            <SmartLink
              href={post.href}
              className='blog-item-title font-bold text-black dark:text-white text-2xl hover:text-[#0070f3] dark:hover:text-blue-400 transition-colors duration-300'>
              {siteConfig('POST_TITLE_ICON') && (
                <span className='mr-2 inline-block'><NotionIcon icon={post.pageIcon} /></span>
              )}
              {post.title}
            </SmartLink>
          </h2>

          {/* ==================== 文章元数据区 (Metadata) ==================== */}
          <header className='mb-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 dark:text-gray-400 leading-none'>
            
            {/* 作者标识 */}
            <div className='flex items-center'>
              <a
                href={siteConfig('SIMPLE_AUTHOR_LINK', null, CONFIG)}
                className='flex items-center hover:text-[#0070f3] transition-colors duration-200'>
                <i className='fa-regular fa-user mr-1.5 opacity-70'></i> 
                {siteConfig('AUTHOR')}
              </a>
            </div>

            {/* 发布时间 */}
            <div className='flex items-center'>
              <SmartLink
                className='flex items-center hover:text-[#0070f3] transition-colors duration-200'
                href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}>
                <i className='fa-regular fa-clock mr-1.5 opacity-70' />
                {post.date?.start_date || post.createdTime}
              </SmartLink>
            </div>

            {/* 评论数统计 */}
            <div className='flex items-center opacity-80'>
              <TwikooCommentCount post={post} />
            </div>

            {/* 分类展示：使用科技蓝高亮 */}
            {post.category && (
              <div className='flex items-center'>
                <SmartLink href={`/category/${post.category}`} className='flex items-center hover:text-[#0070f3]'>
                  <i className='fa-regular fa-folder mr-1.5 opacity-70' />
                  <span className='font-medium text-gray-600 dark:text-gray-300 hover:text-[#0070f3]'>{post.category}</span>
                </SmartLink>
              </div>
            )}

            {/* 标签云：采用斜杠分割风格 */}
            <div className="flex flex-wrap gap-2">
              {post?.tags?.length > 0 && post?.tags.map(t => (
                <SmartLink
                  key={t}
                  href={`/tag/${t}`}
                  className='text-xs text-gray-400 hover:text-[#0070f3] hover:font-bold transition-all'>
                  <span>#{t}</span>
                </SmartLink>
              ))}
            </div>
          </header>

          {/* ==================== 正文预览区 (Summary) ==================== */}
          <main className='text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-light text-base'>
            {!showPreview && (
              <>
                {post.summary}
                {post.summary && <span className="ml-1 opacity-50">...</span>}
              </>
            )}
            {showPreview && post?.blockMap && (
              <div className='overflow-hidden max-h-40 relative'>
                <NotionPage post={post} />
                <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-white dark:from-black to-transparent" />
              </div>
            )}
          </main>
        </article>
      </div>

      {/* ==================== 底部动作区 (Actions) ==================== */}
      <div className='block'>
        <SmartLink
          href={post.href}
          /**
           * 按钮视觉重构：
           * - border-[#0070f3]: 品牌蓝边框反馈。
           * - hover:bg-[#0070f3]: 悬浮即填满品牌色。
           * - 汉化文字：继续阅读。
           */
          className='inline-flex items-center justify-center rounded-sm border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-xs py-2 px-6 transition-all duration-300 hover:bg-[#0070f3] hover:border-[#0070f3] hover:text-white font-medium tracking-widest'>
          继续阅读
          <i className='fa-solid fa-angle-right ml-2 group-hover:translate-x-1 transition-transform'></i>
        </SmartLink>
      </div>
    </div>
  )
}
