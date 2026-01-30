/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：下拉菜单项逻辑组件 (Refined Dropdown Menu)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 品牌色彩一致性：子菜单文字颜色统一切换为 penboy451 科技蓝 (#0070f3)。
 * 2. 渲染逻辑修正：修复了原版中不标准的 border 过滤语法，确保列表边框显示准确。
 * 3. 交互动效增强：引入 GPU 加速的位移变换 (translate-y)，提升菜单弹出的丝滑感。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 导航菜单项（支持单级与多级下拉）
 * @param {Object} link - 菜单配置对象
 */
export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  // 渲染守卫：若配置中未开启显示，则直接忽略
  if (!link || !link.show) {
    return null
  }

  return (
    <div
      className="relative" // 确保子菜单相对于此容器定位
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>

      {/* ==================== 情况 A：标准单级菜单 (No Sub-menu) ==================== */}
      {!hasSubMenu && (
        <SmartLink
          href={link?.href}
          target={link?.target}
          className='menu-link pl-2 pr-4 text-gray-700 dark:text-gray-200 no-underline tracking-widest pb-1 antialiased transition-all duration-300 hover:text-[#0070f3]'>
          {link?.icon && (
            <span className='mr-2'>
              <i className={link.icon} />
            </span>
          )}
          {link?.name}
        </SmartLink>
      )}

      {/* ==================== 情况 B：多级下拉触发器 (With Sub-menu) ==================== */}
      {hasSubMenu && (
        <div className='cursor-pointer menu-link pl-2 pr-4 text-gray-700 dark:text-gray-200 no-underline tracking-widest pb-1 antialiased transition-all duration-300 hover:text-[#0070f3]'>
          {link?.icon && (
            <span className='mr-2'>
              <i className={link.icon} />
            </span>
          )}
          {link?.name}
          {/* 旋转箭头图标 */}
          <i className={`px-2 fas fa-chevron-down transition-transform duration-300 ${show ? 'rotate-180 text-[#0070f3]' : ''}`} />
        </div>
      )}

      {/* ==================== 子菜单列表渲染 (Dropdown List) ==================== */}
      {hasSubMenu && (
        <ul
          className={`${
            show ? 'visible opacity-100 translate-y-2' : 'invisible opacity-0 translate-y-0'
          } border border-gray-100 bg-white dark:bg-black dark:border-gray-800 transition-all duration-300 z-30 absolute block drop-shadow-2xl left-0 min-w-max`}>
          
          {link.subMenus.map((sLink, index) => {
            return (
              <li
                key={index}
                /**
                 * 逻辑优化：
                 * - last:border-b-0: 确保最后一项不显示底边线。
                 * - text-[#0070f3]: 品牌色贯穿。
                 */
                className='border-b last:border-b-0 text-[#0070f3] dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200 dark:border-gray-800 py-3 pr-8 pl-4'>
                <SmartLink href={sLink.href} target={link?.target}>
                  <span className='text-sm whitespace-nowrap flex items-center'>
                    {sLink?.icon && <i className={`${sLink?.icon} mr-3 opacity-80`} />}
                    {sLink.title}
                  </span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
