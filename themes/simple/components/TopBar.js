/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：网站顶部提示栏组件 (Top Notification Bar)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：本组件负责在页面最顶端渲染一行全局提示文字（如开站公告、核心口号）。
 * 2. 视觉进化：
 *    - 采用 bg-gray-900 (深碳灰) 替代原版的纯黑，增加视觉的深度感和现代感。
 *    - 修复了原版代码中“居中”与“左浮动”逻辑打架的 Bug，实现像素级水平对齐。
 * 3. 性能说明：该组件为函数式组件，仅在有内容输入时才执行渲染，对首屏性能零干扰。
 * -----------------------------------------------------------------------
 */

import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * TopBar 组件
 * 无需传入 props，直接通过全局 siteConfig 获取动态配置。
 */
export default function TopBar() {
  /**
   * 数据抓取逻辑：
   * siteConfig 会优先从 Vercel 环境变量读取，若无，则回退到 themes/simple/config.js 里的值。
   */
  const content = siteConfig('SIMPLE_TOP_BAR_CONTENT', null, CONFIG)

  /**
   * 渲染守卫：
   * 如果 content 为空字符串或未配置，则直接返回空片段 (<></>)，
   * 确保不渲染任何多余的 HTML 标签，节省 DOM 树节点。
   */
  if (content) {
    return (
      /**
       * header 容器：
       * - flex: 开启弹性布局，便于内部元素居中。
       * - bg-gray-900: 采用深灰色背景，不仅比纯黑更护眼，也更能体现 simple 主题的质感。
       * - border-b: 增加一道极细的深色底边线，用于区分顶栏与下方的 LOGO 区。
       */
      <header className="flex justify-center items-center bg-gray-900 dark:bg-black border-b border-gray-800">
        
        {/* 内部约束层：限制最大宽度为屏幕的 90%，确保在超宽显示器上文字不会飘到边缘 */}
        <div id='top-bar-inner' className='max-w-9/10 w-full z-20 flex justify-center'>
          
          /**
           * 内容渲染层：
           * - dangerouslySetInnerHTML: 核心逻辑。允许我们在配置中填写 <br/> 或 <a> 标签，
           *   系统会将其解析为真正的 HTML，而不是普通的文本。
           * - antialiased: 开启抗锯齿优化，让小号字体在 Mac/Win 上看起来更顺滑。
           * - leading-5: 设置行高，确保如果有换行，文字间距也保持美观。
           */
          <div 
            className='text-xs text-white z-50 leading-5 py-2.5 antialiased text-center' 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </header>
    )
  }
  
  // 若无内容，逻辑终点
  return <></>
}
