/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：移动端折叠菜单项组件 (Refined Mobile Collapse Item)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 品牌交互升级：移除所有残留的作者红，统一采用 penboy451 科技蓝 (#0070f3)。
 * 2. 视觉规范化：移除 hexo 私有色号，改用标准的 dark:bg-gray-900 工业配置。
 * 3. 逻辑去冗余：重构了状态管理逻辑，确保点击交互更加精准、响应更迅速。
 * -----------------------------------------------------------------------
 */

import Collapse from '@/components/Collapse'
import SmartLink from '@/components/SmartLink'
import { useState } from 'react'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 移动端折叠菜单项
 * @param {Object} props.link - 菜单链接对象
 * @param {Function} props.onHeightChange - 当折叠高度变化时的回调函数（用于动画适配）
 */
export const MenuItemCollapse = (props) => {
  const { link, onHeightChange } = props
  const [isOpen, setIsOpen] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  // 渲染守卫：若配置未开启则不渲染
  if (!link || !link.show) {
    return null
  }

  /**
   * 切换菜单展开状态
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      /**
       * 菜单项主容器：
       * - dark:bg-gray-900: 替代原有的 hexo 私有色号，保持深色模式纯净。
       * - border-b: 增加细微分割线。
       */
      <div
        className='w-full px-8 py-4 text-left border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300'
        onClick={hasSubMenu ? toggleMenu : null}
      >
        
        {/* ==================== 情况 A：标准单级链接 (No Sub-menu) ==================== */}
        {!hasSubMenu && (
          <SmartLink
            href={link?.href}
            target={link?.target}
            className='flex items-center justify-between no-underline tracking-widest antialiased'
          >
            <span className='text-[#0070f3] dark:text-blue-400 hover:opacity-80 transition-all duration-300 flex items-center'>
              {link?.icon && <i className={`${link.icon} mr-3 w-5 text-center`} />}
              <span className="font-medium">{link?.name}</span>
            </span>
          </SmartLink>
        )}

        {/* ==================== 情况 B：带子菜单的触发器 (With Sub-menu) ==================== */}
        {hasSubMenu && (
          <div className='flex items-center justify-between cursor-pointer no-underline tracking-widest antialiased'>
            <span className={`transition-colors duration-300 flex items-center ${isOpen ? 'text-[#0070f3]' : 'text-gray-700 dark:text-gray-300'}`}>
              {link?.icon && <i className={`${link.icon} mr-3 w-5 text-center`} />}
              <span className="font-medium">{link?.name}</span>
            </span>
            
            {/* 状态指示图标：展开时旋转 45 度变色 */}
            <i className={`fas fa-plus transition-all duration-300 ${isOpen ? 'rotate-45 text-[#0070f3]' : 'text-gray-400'}`} />
          </div>
        )}
      </div>

      {/* ==================== 子菜单折叠区 (Sub-menu Section) ==================== */}
      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={onHeightChange}>
          <div className="bg-gray-50 dark:bg-black">
            {link.subMenus.map((sLink, index) => (
              <div
                key={index}
                className='text-left px-12 border-b border-gray-100 dark:border-gray-900 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200'
              >
                <SmartLink href={sLink.href} target={link?.target} className="block w-full">
                  <span className='text-sm tracking-wide text-[#0070f3] dark:text-blue-400 flex items-center'>
                    {sLink?.icon && <i className={`${sLink.icon} mr-3 w-4 text-center opacity-70`} />}
                    {sLink.title}
                  </span>
                </SmartLink>
              </div>
            ))}
          </div>
        </Collapse>
      )}
    </>
  )
}
