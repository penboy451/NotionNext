/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：顶部导航栏组件 (Refined Navigation Bar)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 品牌对齐：统一全站搜索图标为科技蓝 (#0070f3)，增强品牌识别度。
 * 2. 视觉纯净：移除了原版代码中残留的 hexo 私有色号命名。
 * 3. 体验优化：将搜索框占位符本地化为中文，并修复了布局逻辑冲突。
 * -----------------------------------------------------------------------
 */

import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSimpleGlobal } from '..'
import { MenuList } from './MenuList'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 导航栏组件
 * @param {Object} props - 包含菜单配置等元数据
 */
export default function NavBar(props) {
  const [showSearchInput, changeShowSearchInput] = useState(false)
  const router = useRouter()
  const { searchModal } = useSimpleGlobal()

  /**
   * 搜索切换逻辑
   * 优先检查是否开启了 Algolia 全文搜索，若是则调用模态框，否则切换行内输入框。
   */
  const toggleShowSearchInput = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      changeShowSearchInput(!showSearchInput)
    }
  }

  /**
   * 搜索提交监听
   * 监听回车键，执行 SPA 无刷新搜索跳转。
   */
  const onKeyUp = e => {
    if (e.keyCode === 13) {
      const search = document.getElementById('simple-search').value
      if (search) {
        // 使用 router.push 保持单页应用极致体验
        router.push({ pathname: '/search/' + encodeURIComponent(search) })
      }
    }
  }

  return (
    /**
     * 导航容器：
     * - shadow: 增加底部阴影，使导航栏与正文产生层次感。
     * - dark:border-gray-800: 替代原有的 hexo 私有色号。
     */
    <nav className='w-full bg-white dark:bg-black relative z-20 shadow border-t border-gray-100 dark:border-gray-800 antialiased'>
      
      <div id='nav-bar-inner' className='h-12 mx-auto max-w-9/10 flex justify-between items-center text-sm md:text-md'>
        
        {/* ==================== 左侧：菜单列表 / 搜索输入 ==================== */}
        <div className='h-full flex-1 flex items-center overflow-hidden'>
          {showSearchInput ? (
            <input
              autoFocus
              id='simple-search'
              onKeyUp={onKeyUp}
              className='w-full outline-none h-full px-4 bg-transparent text-black dark:text-white font-light'
              aria-label='Search'
              type='search'
              name='s'
              autoComplete='off'
              placeholder='输入关键词并回车搜索...'
            />
          ) : (
            <div className="flex items-center h-full">
               <MenuList {...props} />
            </div>
          )}
        </div>

        {/* ==================== 右侧：交互图标 ==================== */}
        <div className='flex items-center pl-4'>
          {/* 
              搜索开关图标：
              - text-[#0070f3]: 采用 penboy451 专属品牌蓝。
              - transition: 增加平滑的交互反馈。
          */}
          <div 
            className='h-full px-2 flex items-center text-[#0070f3] cursor-pointer transition-transform duration-200 hover:scale-110'
            onClick={toggleShowSearchInput}
          >
            <i
              className={
                showSearchInput
                  ? 'fa-regular fa-circle-xmark text-xl'
                  : 'fa-solid fa-magnifying-glass'
              }
            />
          </div>
        </div>

      </div>
    </nav>
  )
}
