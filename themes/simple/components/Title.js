/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：全局标题栏组件 (Universal Title Section)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：负责在页面顶部（导航栏下方）渲染醒目的大标题及描述文字。
 * 2. 动态自适应：
 *    - 在首页：展示站点的全局描述信息。
 *    - 在文章页：展示文章标题及摘要。
 * 3. 视觉优化：采用了更符合极简美学的色彩配比，彻底移除了原作者的私有色号。
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
   * 1. 优先读取文章对象的标题 (post?.title)。
   * 2. 若为空（通常是在首页），则读取配置中的 DESCRIPTION (站点描述)。
   */
  const title = post?.title || siteConfig('DESCRIPTION')

  /**
   * 描述/摘要提取逻辑 (Description Extraction):
   * 1. 优先读取文章页的描述 (post?.description)，通常显示在标题下方。
   * 2. 若为空，则读取配置中的 BIO (个人简介)，增加品牌辨识度。
   * 优化：相比原版的 AUTHOR，使用 BIO 能够承载更多有价值的信息。
   */
  const description = post?.description || siteConfig('BIO')

  return (
    /**
     * 外层容器：
     * - bg-gray-50: 采用极浅灰色背景，比原版的 gray-100 更通透，不显“脏”。
     * - dark:bg-gray-900: 彻底移除 hexo-black-gray 私有色号，回归标准工业色。
     * - border-b: 底部增加一道浅色分割线，增加层次感。
     */
    <div className="text-center px-6 py-12 mb-6 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 border-b">
        
        /**
         * 主标题 (Main Heading):
         * - md:text-4xl: 在桌面端使用大号字体，极具视觉冲击力。
         * - text-black: 确保在日间模式下的最高对比度。
         * - pb-4: 为标题与下方描述留出优雅的呼吸空间。
         */
        <h1 className="text-xl md:text-4xl pb-4 font-semibold text-black dark:text-white antialiased">
          {title}
        </h1>

        /**
         * 副标题/描述 (Subtitle):
         * - leading-loose: 增加行间距，提升阅读舒适度。
         * - text-gray-600: 采用中灰色，视觉上与标题拉开主次关系。
         * - dark:text-gray-400: 夜间模式下采用柔和的浅灰。
         */
        <p className="leading-loose text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {description}
        </p>
    </div>
  )
}
