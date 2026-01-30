/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：菜单列表逻辑组件 (Refined Menu List)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 品牌交互色：将移动端按钮的悬浮色由作者红改为 penboy451 科技蓝 (#0070f3)。
 * 2. 性能稳健：修复了 useEffect 监听器的依赖逻辑，确保路由跳转后能精准关闭菜单。
 * 3. 视觉纯净：移除了 dark 模式下残留的 hexo 私有色号命名，统一站内色彩规范。
 * -----------------------------------------------------------------------
 */

import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 菜单导航列表组件
 * @param {Array} customNav - 外部传入的自定义导航数据
 * @param {Array} customMenu - 来自 Notion 的自定义菜单数据
 */
export const MenuList = ({ customNav, customMenu }) => {
  const { locale } = useGlobal()
  const [isOpen, changeIsOpen] = useState(false)
  const router = useRouter()
  const collapseRef = useRef(null)

  // 切换移动端菜单展开/收起状态
  const toggleIsOpen = () => {
    changeIsOpen(!isOpen)
  }

  // 关闭移动端菜单逻辑
  const closeMenu = () => {
    changeIsOpen(false)
  }

  /**
   * 性能修复：监听路由变化
   * 作用：当用户在移动端点击菜单跳转后，必须自动收起菜单面板。
   * 优化：增加了依赖数组 [router.events]，确保事件仅绑定一次，防止内存泄露。
   */
  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
    return () => {
      router.events.off('routeChangeStart', closeMenu)
    }
  }, [router.events])

  // =====================================================================
  // 菜单数据源构建 (Data Source)
  // =====================================================================

  // 默认的基础导航项
  let links = [
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('SIMPLE_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('SIMPLE_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('SIMPLE_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('SIMPLE_MENU_TAG', null, CONFIG)
    }
  ]

  // 合并逻辑：合并本地配置与自定义配置
  if (customNav) {
    links = links.concat(customNav)
  }

  // 优先级逻辑：如果开启了 CUSTOM_MENU，则全权由 Notion 接管
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  // 安全检查：无链接数据时直接不渲染
  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      {/* ==================== 桌面端菜单 (PC View) ==================== */}
      <div id='nav-menu-pc' className='hidden md:flex my-auto'>
        {links?.map((link, index) => (
          <MenuItemDrop key={index} link={link} />
        ))}
      </div>

      {/* ==================== 移动端菜单 (Mobile View) ==================== */}
      <div
        id='nav-menu-mobile'
        className='flex md:hidden my-auto justify-start antialiased'>
        
        {/* 
            移动端触发器：
            - hover:text-[#0070f3]: 品牌蓝交互反馈。
            - transition-all: 保证文字变色与图标旋转动画同步。
        */}
        <div
          onClick={toggleIsOpen}
          className='cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#0070f3] transition-all duration-300 flex items-center font-medium'>
          <i
            className={`${isOpen && 'rotate-90 text-[#0070f3]'} transition-all duration-300 fa fa-bars mr-3`}
          />
          <span className='text-xs tracking-widest'>
            {!isOpen ? 'MENU' : 'CLOSE'}
          </span>
        </div>

        {/* 
            移动端折叠面板逻辑：
            - dark:border-gray-800: 彻底肃清 hexo 私有色号，回归标准深色边框。
        */}
        <Collapse
          collapseRef={collapseRef}
          className='absolute w-full top-12 left-0'
          isOpen={isOpen}>
          <div
            id='menu-wrap'
            className='bg-white dark:bg-black dark:border-gray-800 border shadow-xl'>
            {links?.map((link, index) => (
              <MenuItemCollapse
                key={index}
                link={link}
                onHeightChange={param =>
                  collapseRef.current?.updateCollapseHeight(param)
                }
              />
            ))}
          </div>
        </Collapse>
      </div>
    </>
  )
}
