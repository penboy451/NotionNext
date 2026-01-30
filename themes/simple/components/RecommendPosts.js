/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：相关文章推荐组件 (Refined Recommend Posts)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 视觉重构：采用左侧科技蓝 (#0070f3) 呼吸边框，提升阅读引导的质感。
 * 2. 交互对齐：悬浮态同步切换为品牌蓝色，增强全站视觉一致性。
 * 3. 排版精修：优化了中文冒号显示与列表行高，使内容展示更符合中文阅读习惯。
 * -----------------------------------------------------------------------
 */

import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 相关文章推荐组件
 * @param {Array} recommendPosts - 包含推荐文章数据的数组
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()

  /**
   * 渲染守卫：
   * 1. 检查配置项 SIMPLE_ARTICLE_RECOMMEND_POSTS 是否开启。
   * 2. 检查是否有有效的推荐数据。
   * 若不满足条件，则组件完全不渲染。
   */
  if (
    !siteConfig('SIMPLE_ARTICLE_RECOMMEND_POSTS', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length < 1
  ) {
    return <></>
  }

  return (
    /**
     * 外层容器：
     * - border-l-4: 采用左侧粗边框设计，增强视觉引导。
     * - border-[#0070f3]: 使用 penboy451 专属品牌色。
     * - bg-gray-50: 浅灰色背景，将推荐区与正文内容有效区分。
     */
    <div className="pl-6 py-4 my-8 bg-gray-50 dark:bg-gray-900 border-l-4 border-[#0070f3] antialiased">
       
        {/* 模块标题：使用本地化语言包，确保多语言兼容性 */}
        <div className="mb-3 font-bold text-lg text-black dark:text-white">
          {locale.COMMON.RELATE_POSTS}
        </div>

        {/* 推荐文章列表 */}
        <ul className="space-y-2">
          {recommendPosts.map(post => (
            <li key={post.id} className="flex items-center">
              {/* 装饰性圆点，增加列表感 */}
              <span className="mr-2 text-[#0070f3] opacity-50">•</span>
              
              <SmartLink 
                href={`/${post.slug}`} 
                className="text-sm font-light text-gray-700 dark:text-gray-300 transition-all duration-300 hover:text-[#0070f3] hover:underline"
              >
                {post.title}
              </SmartLink>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default RecommendPosts
