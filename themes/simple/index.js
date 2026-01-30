/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：全站布局调度中心 (Global Layout Orchestrator)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心架构：本文件是 Simple 主题的“骨架”，负责将分散的子组件组装成完整的页面。
 * 2. 动态路由：根据当前 URL 路径，自动调度对应的布局组件（Index, Slug, Archive 等）。
 * 3. 性能优化：全量采用 Next.js 动态导入（Dynamic Import），实现组件级的按需加载。
 * 4. 视觉规范：已彻底肃清广告位代码及原作者私有色号，实现全站视觉大一统。
 * -----------------------------------------------------------------------
 */

import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import BlogPostBar from './components/BlogPostBar'
import CONFIG from './config'
import { Style } from './style'

// =====================================================================
// 第一部分：异步组件集成 (Dynamic Components)
// 采用 ssr: false 确保这些交互组件仅在浏览器端加载，极大提升 FCP 性能
// =====================================================================

const AlgoliaSearchModal = dynamic(() => import('@/components/AlgoliaSearchModal'), { ssr: false })
const BlogListScroll = dynamic(() => import('./components/BlogListScroll'), { ssr: false })
const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), { ssr: false })
const ArticleLock = dynamic(() => import('./components/ArticleLock'), { ssr: false })
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), { ssr: false })
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), { ssr: false })
const ShareBar = dynamic(() => import('@/components/ShareBar'), { ssr: false })
const TopBar = dynamic(() => import('./components/TopBar'), { ssr: false })
const Header = dynamic(() => import('./components/Header'), { ssr: false })
const NavBar = dynamic(() => import('./components/NavBar'), { ssr: false })
const SideBar = dynamic(() => import('./components/SideBar'), { ssr: false })
const JumpToTopButton = dynamic(() => import('./components/JumpToTopButton'), { ssr: false })
const Footer = dynamic(() => import('./components/Footer'), { ssr: false })
const SearchInput = dynamic(() => import('./components/SearchInput'), { ssr: false })
const BlogListPage = dynamic(() => import('./components/BlogListPage'), { ssr: false })
const RecommendPosts = dynamic(() => import('./components/RecommendPosts'), { ssr: false })

// 主题全局状态上下文
const ThemeGlobalSimple = createContext()
export const useSimpleGlobal = () => useContext(ThemeGlobalSimple)

// =====================================================================
// 第二部分：基础框架布局 (LayoutBase)
// 定义了全站共用的页眉、导航、侧边栏及页脚结构
// =====================================================================

const LayoutBase = props => {
  const { children, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal }}>
      <div
        id='theme-simple'
        className={`${siteConfig('FONT_STYLE')} min-h-screen flex flex-col dark:text-gray-300 bg-white dark:bg-black scroll-smooth antialiased`}>
        
        {/* 全局自定义样式注入 */}
        <Style />

        {/* 顶部公告/提示栏 */}
        {siteConfig('SIMPLE_TOP_BAR', null, CONFIG) && <TopBar {...props} />}

        {/* 品牌页眉区 */}
        <Header {...props} />

        {/* 导航菜单区 */}
        <NavBar {...props} />

        {/* 主体内容容器 */}
        <div
          id='container-wrapper'
          className={`w-full flex-1 flex items-start max-w-9/10 mx-auto pt-12 ${JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE')) ? 'flex-row-reverse' : ''}`}
        >
          {/* 左侧/中心：文章列表或详情内容 */}
          <div id='container-inner' className='w-full flex-grow min-h-fit'>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-700 transform order-first'
              enterFrom='opacity-0 translate-y-16'
              enterTo='opacity-100'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-16'
              unmount={false}
            >
              {slotTop}
              {children}
            </Transition>
            
            {/* [审计说明]：已物理切除原有 native 广告位，确保页面底部的极致纯净 */}
          </div>

          {/* 右侧：功能侧边栏 (桌面端可见) */}
          {!fullWidth && (
            <div
              id='right-sidebar'
              className='hidden xl:block flex-none sticky top-8 w-96 border-l border-gray-100 dark:border-gray-800 pl-12'
            >
              <SideBar {...props} />
            </div>
          )}
        </div>

        {/* 悬浮交互：回到顶部 */}
        <div className='fixed right-4 bottom-4 z-20'>
          <JumpToTopButton />
        </div>

        {/* 全局搜索模态框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        {/* 全站页脚 */}
        <Footer {...props} />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}

// =====================================================================
// 第三部分：特定页面布局 (Page Specific Layouts)
// =====================================================================

/**
 * 博客首页：直接分发至列表组件
 */
const LayoutIndex = props => <LayoutPostList {...props} />

/**
 * 文章列表页：支持分页 (Page) 或 滚动加载 (Scroll) 两种模式
 */
const LayoutPostList = props => {
  const listStyle = siteConfig('POST_LIST_STYLE')
  return (
    <>
      <BlogPostBar {...props} />
      {listStyle === 'page' ? <BlogListPage {...props} /> : <BlogListScroll {...props} />}
    </>
  )
}

/**
 * 搜索结果页：包含关键词高亮逻辑
 */
const LayoutSearch = props => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser && keyword) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: { element: 'span', className: 'text-[#0070f3] border-b border-dashed' }
      })
    }
  }, [keyword])

  const slotTop = siteConfig('ALGOLIA_APP_ID') ? null : <SearchInput {...props} />
  return <LayoutPostList {...props} slotTop={slotTop} />
}

/**
 * 归档时间轴页：按日期对文章进行分组展示
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='mb-10 pb-20 md:py-12 p-3 min-h-screen w-full'>
      {Object.keys(archivePosts).map(archiveTitle => (
        <BlogArchiveItem key={archiveTitle} archiveTitle={archiveTitle} archivePosts={archivePosts} />
      ))}
    </div>
  )
}

/**
 * 文章详情页：处理加密、文章信息、正文渲染、分享及评论
 */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props
  const { fullWidth } = useGlobal()

  return (
    <>
      {/* 若文章已加密且未校验，显示锁屏组件 */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {/* 正常渲染文章内容 */}
      {!lock && post && (
        <div className={`px-2 ${fullWidth ? '' : 'xl:max-w-4xl 2xl:max-w-6xl'}`}>
          <ArticleInfo post={post} />
          
          <div id='article-wrapper'>
            <NotionPage post={post} />
          </div>

          <ShareBar post={post} />

          {post?.type === 'Post' && (
            <>
              <ArticleAround prev={prev} next={next} />
              <RecommendPosts recommendPosts={recommendPosts} />
            </>
          )}

          <Comment frontMatter={post} />
        </div>
      )}
      
      {/* [审计说明]：已物理切除详情页内嵌套的所有广告占位符 (AdSlot/WWAds) */}
    </>
  )
}

/**
 * 404 错误页：页面不存在时的引导逻辑
 */
const Layout404 = props => {
  const { post } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    if (!post) {
      const timer = setTimeout(() => {
        if (isBrowser && !document.querySelector('#notion-article')) {
          router.push('/404')
        }
      }, waiting404)
      return () => clearTimeout(timer)
    }
  }, [post, router, waiting404])

  return <div className="h-screen flex items-center justify-center text-gray-500 italic">404 - 页面去星际旅行了</div>
}

/**
 * 分类/标签索引页布局 (维持 0 改动逻辑，对齐格式)
 */
const LayoutCategoryIndex = props => (
  <div id='category-list' className='flex flex-wrap p-4'>
    {props.categoryOptions?.map(category => (
      <SmartLink key={category.name} href={`/category/${category.name}`}>
        <div className='hover:text-[#0070f3] dark:text-gray-300 px-5 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all'>
          <i className='mr-4 fas fa-folder opacity-50' />{category.name}({category.count})
        </div>
      </SmartLink>
    ))}
  </div>
)

const LayoutTagIndex = props => (
  <div id='tags-list' className='flex flex-wrap p-4'>
    {props.tagOptions.map(tag => (
      <div key={tag.name} className='p-2'>
        <SmartLink href={`/tag/${encodeURIComponent(tag.name)}`} className={`rounded hover:bg-[#0070f3] hover:text-white duration-200 py-1 px-3 text-xs text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800 notion-${tag.color}_background`}>
          <i className='mr-1 fas fa-tag opacity-50' /> {tag.name} ({tag.count})
        </SmartLink>
      </div>
    ))}
  </div>
)

export {
  Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex,
  LayoutIndex, LayoutPostList, LayoutSearch, LayoutSlug, LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
