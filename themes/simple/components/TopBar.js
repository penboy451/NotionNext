/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：网站顶部提示栏组件 (Top Notification Bar)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：负责在页面最顶端渲染一行全局提示文字。
 * 2. 视觉进化：采用 bg-gray-900 (深碳灰) 替代原版纯黑，增加深度感。
 * 3. 性能说明：该组件为函数式组件，仅在有内容输入时渲染，对性能无干扰。
 * -----------------------------------------------------------------------
 */

import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

export default function TopBar() {
  const content = siteConfig('SIMPLE_TOP_BAR_CONTENT', null, CONFIG)

  if (content) {
    return (
      <header className="flex justify-center items-center bg-gray-900 dark:bg-black border-b border-gray-800">
        <div id='top-bar-inner' className='max-w-9/10 w-full z-20 flex justify-center'>
          {/* 
              内容渲染层：
              - dangerouslySetInnerHTML: 核心逻辑。允许我们在配置中填写 HTML 标签（如换行或链接）。
              - antialiased: 开启抗锯齿优化，让小号字体在高清屏上更顺滑。
              - leading-5: 设置行高，确保美观。
          */}
          <div 
            className='text-xs text-white z-50 leading-5 py-2.5 antialiased text-center' 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </header>
    )
  }
  
  return <></>
}
