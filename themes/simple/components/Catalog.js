/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章目录导航组件 (Refined Table of Contents)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 品牌对齐：将全站目录高亮色由作者红改为科技蓝 (#0070f3)，保持全站视觉闭环。
 * 2. 视觉进化：移除了高亮时的下划线，改用左侧品牌轴设计，界面更清爽、更专业。
 * 3. 性能稳定：保留了高效的节流滚动监听算法，确保长文阅读时的导航灵敏度。
 * -----------------------------------------------------------------------
 */

import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState } from 'react'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 目录导航组件主体
 * @param {Object} post - Notion 文章对象，包含 TOC 树状结构数据
 */
const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null) // 目录容器引用
  const [activeSection, setActiveSection] = useState(null) // 当前激活的章节 ID

  /**
   * 滚动监听逻辑 (Scroll Spy):
   * 作用：监听正文滚动，实时计算哪个标题处于屏幕可见区域，并反馈到目录。
   */
  useEffect(() => {
    const throttleMs = 200 // 设置节流频率，平衡性能与响应速度
    
    const actionSectionScrollSpy = throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        
        // 判定逻辑：当标题距离页顶小于偏移量时，视为当前章节
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        break
      }
      
      setActiveSection(currentSectionId)
      
      // 自动同步滚动目录列表，确保高亮项始终在侧边栏可见
      const index = post?.toc?.findIndex(
        obj => uuidToId(obj.id) === currentSectionId
      )
      tRef?.current?.scrollTo({ top: 28 * index, behavior: 'smooth' })
    }, throttleMs)

    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    
    // 清理函数：防止内存泄露
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [post])

  /**
   * 渲染守卫：
   * 若文章内容不足以生成目录（无 H1/H2/H3），则彻底不渲染组件。
   */
  if (!post || !post?.toc || post?.toc?.length < 1) {
    return <></>
  }

  return (
    <div className='px-3 antialiased'>
      {/* 目录模块标题 */}
      <div className='text-gray-500 dark:text-gray-400 mb-3 text-xs font-bold tracking-widest uppercase'>
        <i className='mr-2 fas fa-stream opacity-70' />
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>

      {/* 目录链接区域 */}
      <div
        className='overflow-y-auto overscroll-none max-h-36 lg:max-h-[70vh] scroll-hidden'
        ref={tRef}
      >
        <nav className='h-full border-l border-gray-100 dark:border-gray-800'>
          {post?.toc?.map(tocItem => {
            const id = uuidToId(tocItem.id)
            const isActive = activeSection === id
            
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`
                  block py-1.5 pr-4 border-l-2 transition-all duration-300 transform
                  ${isActive 
                    ? 'border-[#0070f3] text-[#0070f3] font-bold bg-blue-50/50 dark:bg-blue-900/20' 
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0070f3] hover:border-blue-200'}
                  notion-table-of-contents-item-indent-level-${tocItem.indentLevel} 
                  catalog-item
                `}
              >
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 16
                  }}
                  className="text-sm truncate"
                >
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
