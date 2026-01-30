/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：网页页脚组件 (Refined Site Footer)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 视觉肃清：移除了原版刺眼的黄色调 (#fde047)，统一采用高级灰与全站品牌蓝。
 * 2. 布局重构：修复了因删除原作者链接导致的视觉重心偏移，改为更加稳重的对齐逻辑。
 * 3. 极致纯净：删除了所有占位符死代码，全站“去原作者化”工程的收官之作。
 * -----------------------------------------------------------------------
 */

import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 页脚组件主体
 * @param {Object} props - 外部传递的属性对象
 */
export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  
  /**
   * 版权年份逻辑：
   * 动态计算显示区间。若 SINCE 设为 2026 以前，则显示 2018-2026；
   * 否则仅显示当前年份，确保版权声明的严谨性。
   */
  const copyrightDate =
    parseInt(since) < currentYear ? `${since}-${currentYear}` : currentYear

  return (
    /**
     * Footer 容器：
     * - bg-black: 保持经典纯黑底色，作为页面收尾。
     * - border-t: 顶部增加细微深色边框，与正文产生物理隔离。
     */
    <footer className='relative w-full bg-black px-6 border-t border-gray-900 antialiased'>
      
      {/* 深色模式切换按钮：居中展示，提供交互入口 */}
      <DarkModeButton className='text-center pt-8' />

      /**
       * 版权与合规信息区：
       * - text-gray-400: 废弃了原版的黄色，采用更具质感的浅灰色，不干扰正文阅读。
       * - py-10: 增加垂直内边距，提升视觉呼吸感。
       */
      <div className='text-gray-400 container mx-auto max-w-4xl py-10 flex flex-col md:flex-row justify-center items-center text-sm space-y-4 md:space-y-0'>
        
        {/* ==================== 左侧/中心：版权所有声明 ==================== */}
        <div className='text-center md:px-4 tracking-wider'>
          &copy; {copyrightDate} <span className='text-white font-medium'>{siteConfig('AUTHOR')}</span>. All rights reserved.
        </div>

        {/* ==================== 右侧/辅助：备案与安全信息 ==================== */}
        <div className='md:p-0 text-center text-xs flex flex-wrap justify-center items-center'>
          
          {/* 备案信息映射逻辑：仅在配置了备案号时渲染 */}
          {siteConfig('BEI_AN') && (
            <a
              href={siteConfig('BEI_AN_LINK')}
              className='no-underline hover:text-[#0070f3] transition-colors duration-300 mx-2'>
              {siteConfig('BEI_AN')}
            </a>
          )}
          
          {/* 公安备案挂件 */}
          <div className="mx-2">
             <BeiAnGongAn />
          </div>

          {/* 
              [审计说明]：
              1. 已物理删除原有的 "Powered by NotionNext" 链接及相关 DOM。
              2. 已清理原版代码中注释掉的 Privacy Policy 占位符。
          */}
        </div>
      </div>

    </footer>
  )
}
