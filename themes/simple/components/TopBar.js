/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：网站顶部提示栏组件 (Refined Top Notification Bar)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 视觉大一统：背景色调整为 bg-black (纯黑)，实现与页脚 (Footer) 的色彩完美同步。
 * 2. 消除断层感：移除硬编码的边框色，配合 style.js 实现全站框架线条的灰度对齐。
 * 3. 布局精修：维持 Flexbox 居中逻辑，确保提示文字在视觉中轴线上精准呈现。
 * -----------------------------------------------------------------------
 */

import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * TopBar 组件
 * 作用：在页面最顶端展示全局提示语，支持 HTML 渲染。
 */
export default function TopBar() {
  // 数据抓取：优先读取 Vercel 环境变量，次选本地 config.js 配置
  const content = siteConfig('SIMPLE_TOP_BAR_CONTENT', null, CONFIG)

  // 渲染守卫：仅当 content 存在有效字符串时才执行渲染逻辑
  if (content) {
    return (
      /**
       * header 容器：
       * - bg-black: 关键修改。改为纯黑色，与页脚呼应，消除你指出的色调断层。
       * - border-b: 增加底边线，由 style.js 全局 CSS 控制颜色对齐。
       */
      <header className="flex justify-center items-center bg-black dark:bg-black border-b">
        
        {/* 内部容器：限制最大宽度为 90%，确保在宽屏显示器上的阅读感 */}
        <div id='top-bar-inner' className='max-w-9/10 w-full z-20 flex justify-center'>
          
          {/* 
              内容渲染层：
              - py-2.5: 维持与原版一致的纵向呼吸感。
              - text-center: 配合 Flex 布局实现文字的绝对居中。
              - dangerouslySetInnerHTML: 解析配置中可能存在的 HTML 标签（如链接、换行）。
          */}
          <div 
            className='text-xs text-white z-50 leading-5 py-2.5 antialiased text-center' 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </header>
    )
  }
  
  // 逻辑终点：无内容则不渲染任何 DOM 节点
  return <></>
}
