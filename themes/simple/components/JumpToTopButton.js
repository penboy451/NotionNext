/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：回到顶部按钮组件 (Refined Jump To Top Button)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 性能优化：重构了 useEffect 逻辑，通过空依赖数组实现监听器的单次绑定，大幅减少系统开销。
 * 2. 品牌对齐：悬浮态同步切换为 penboy451 科技蓝 (#0070f3)，保持全站视觉系统高度一致。
 * 3. 质感升级：引入毛玻璃特效与大圆角设计，提升交互组件的现代审美感。
 * -----------------------------------------------------------------------
 */

import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 回到顶部按钮
 * 逻辑：仅在页面下滑超过 200 像素时显示，点击执行平滑回滚。
 */
const JumpToTopButton = () => {
  const { locale } = useGlobal()
  const [show, switchShow] = useState(false)

  /**
   * 性能优化：滚动监听逻辑
   * 作用：实时检测页面垂直偏移量。
   */
  useEffect(() => {
    const scrollListener = () => {
      const scrollY = window.pageYOffset
      const shouldShow = scrollY > 200
      
      // 性能微操：仅在状态发生真实变化时才触发 setState，减少 React 渲染频率
      switchShow(shouldShow)
    }

    // 绑定原生滚动事件
    window.addEventListener('scroll', scrollListener)
    
    // 组件卸载时清除监听，防止内存泄露
    return () => window.removeEventListener('scroll', scrollListener)
  }, []) // 使用空依赖数组，确保监听器在整个生命周期内仅初始化一次

  return (
    /**
     * 容器层：
     * - transition-all duration-300: 确保按钮出现/消失时的渐变效果柔和。
     * - backdrop-blur-sm: 开启轻微毛玻璃效果，使其在滚动过文字上方时具有透视感。
     * - hover:bg-[#0070f3]: 品牌蓝悬浮反馈。
     * - shadow-lg: 增加悬浮阴影，提升视觉层级。
     */
    <div 
        title={locale.POST.TOP}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`${
          show ? 'opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-4'
        } transition-all duration-300 flex items-center justify-center cursor-pointer 
          bg-gray-800/40 dark:bg-white/20 
          text-white w-10 h-10 rounded-lg shadow-lg 
          backdrop-blur-sm hover:bg-[#0070f3] dark:hover:bg-[#0070f3] 
          transform hover:-translate-y-1 antialiased`}
    >
      <i className='fas fa-angle-up' />
    </div>
  )
}

export default JumpToTopButton
