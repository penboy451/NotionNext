/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：顶部导航栏组件 (Locked Navigation Bar Component)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：负责页面顶部的导航菜单展示，并支持行内搜索框的动态切换。
 * 2. 视觉修复：已将搜索框设为不透明背景，防止底层个人简介文字发生透射干扰。
 * 3. 性能优化：采用单页路由跳转逻辑，确保搜索切换时无白屏感。
 * 4. 品牌一致性：交互图标颜色已统一切换为 penboy451 品牌科技蓝。
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
 * 导航栏组件主体
 */
export default function NavBar(props) {
  // 状态管理：控制搜索框的显示 (true) 与 隐藏 (false)
  const [showSearchInput, changeShowSearchInput] = useState(false)
  const router = useRouter()
  
  // 从主题全局上下文中获取搜索模态框的引用
  const { searchModal } = useSimpleGlobal()

  /**
   * 搜索切换触发器：
   * 1. 优先逻辑：若配置了 Algolia 全文搜索，则点击时直接弹出全局搜索浮窗。
   * 2. 回退逻辑：若未配置，则切换显示本组件内的行内搜索输入框。
   */
  const toggleShowSearchInput = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      changeShowSearchInput(!showSearchInput)
    }
  }

  /**
   * 搜索提交处理器：
   * 监听回车键事件，将用户输入的关键词通过路由器推送至搜索结果页。
   */
  const onKeyUp = e => {
    if (e.keyCode === 13) {
      const search = document.getElementById('simple-search').value
      if (search) {
        // 使用 encodeURIComponent 确保特殊字符在 URL 中合法传输
        router.push({ pathname: '/search/' + encodeURIComponent(search) })
      }
    }
  }

  return (
    /**
     * 导航主容器：
     * - bg-white: 日间模式采用纯白背景。
     * - dark:bg-black: 夜间模式采用纯黑背景。
     * - shadow: 增加底部阴影，使导航栏与内容区产生视觉隔离。
     * - border-t: 增加顶部细边线，用于承接上方的 LOGO 区。
     */
    <nav className='w-full bg-white dark:bg-black relative z-20 shadow border-t border-gray-100 dark:border-gray-800 antialiased'>
      
      <div id='nav-bar-inner' className='h-12 mx-auto max-w-9/10 flex justify-between items-center text-sm md:text-md'>
        
        {/* ==================== 左侧内容分发区 (Left Slot) ==================== */}
        <div className='h-full flex-1 flex items-center overflow-hidden'>
          
          {showSearchInput ? (
            /* 
               行内搜索输入框 (Search Mode)：
               - bg-white / dark:bg-black: 必须设为实色。
               - 作用：彻底遮盖底层的个人简介文字，解决之前发现的透视（Bleed-through）问题。
               - border-x: 左右增加竖向边界线。
            */
            <input
              autoFocus
              id='simple-search'
              onKeyUp={onKeyUp}
              className='w-full outline-none h-full px-4 bg-white dark:bg-black text-black dark:text-white border-x border-gray-100 dark:border-gray-800 font-light placeholder-gray-400'
              aria-label='Search'
              type='search'
              name='s'
              autoComplete='off'
              placeholder='输入内容并回车...'
            />
          ) : (
            /* 标准菜单模式 (Menu Mode)：展示由 Notion 驱动的菜单列表 */
            <div className="flex items-center h-full">
               <MenuList {...props} />
            </div>
          )}
        </div>

        {/* ==================== 右侧交互图标区 (Right Slot) ==================== */}
        <div className='flex items-center pl-4'>
          {/* 
              搜索开关图标：
              - text-[#0070f3]: 采用 penboy451 专属科技蓝，彰显专业品牌基因。
              - transition: 为图标切换提供丝滑的动效。
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
