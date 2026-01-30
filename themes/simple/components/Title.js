/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：全局标题栏组件 (Universal Title Section)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 消除断层感：背景色由浅灰改为 bg-white (纯白)，使标题区与正文底色无缝衔接。
 * 2. 品牌化色彩：标题 Class 锁定 blog-item-title，自动继承 style.js 中的科技蓝。
 * 3. 视觉平衡：微调内边距 (py-16)，配合 py-24 的 Header，建立严谨的比例节奏。
 * -----------------------------------------------------------------------
 */

import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * Title 组件
 * @param {Object} props.post - 当前页面的文章对象（首页则为空）
 */
export const Title = (props) => {
  const { post } = props

  /**
   * 标题提取逻辑 (Title Extraction):
   * 优先显示文章标题，首页则显示站点 DESCRIPTION。
   */
  const title = post?.title || siteConfig('DESCRIPTION')

  /**
   * 描述提取逻辑 (Description Extraction):
   * 优先显示文章摘要，首页则显示站点个人简介 (BIO)。
   */
  const description = post?.description || siteConfig('BIO')

  return (
    /**
     * 外层容器：
     * - bg-white: 关键修改！取消灰色背景，彻底消除你圈出的“色块断层”。
     * - dark:bg-black: 夜间模式同步切换为纯黑，实现全屏沉浸感。
     * - border-b: 仅保留一道极浅的分割线，由 style.js 统一控制灰度。
     */
    <div className="text-center px-6 py-16 mb-8 bg-white dark:bg-black border-b antialiased">
        
        {/* 
            主标题 (Main Heading):
            - blog-item-title: 关键类名，它将触发我们在 style.js 中定义的 #0070f3 (科技蓝)。
            - text-3xl md:text-5xl: 略微调大字号，使其在大留白背景下更具张力。
        */}
        <h1 className="blog-item-title text-3xl md:text-5xl pb-6 font-bold tracking-tighter transition-all duration-500">
          {title}
        </h1>

        {/* 
            副标题/描述 (Subtitle):
            - text-gray-500: 使用中性灰，确保标题的绝对视觉权重。
            - max-w-3xl: 限制文本宽度，防止长简介在宽屏下横向拉伸影响美感。
        */}
        <p className="leading-relaxed text-gray-500 dark:text-gray-400 max-w-3xl mx-auto text-sm md:text-base font-light">
            {description}
        </p>
        
    </div>
  )
}
