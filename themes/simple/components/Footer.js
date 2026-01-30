/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：网页页脚组件 (Refined Site Footer)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：负责展示全站版权信息（Copyright）、备案号以及深色模式切换入口。
 * 2. 纯净声明：已彻底移除原作者的强制外链及推广信息。
 * -----------------------------------------------------------------------
 */

import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  
  const copyrightDate =
    parseInt(since) < currentYear ? `${since}-${currentYear}` : currentYear

  return (
    <footer className='relative w-full bg-black px-6 border-t border-gray-900 antialiased'>
      {/* 
          Footer 容器说明：
          - bg-black: 保持经典纯黑底色，作为页面收尾。
          - border-t: 顶部增加细微深色边框。
      */}
      
      <DarkModeButton className='text-center pt-8' />

      {/* 
          版权与合规信息区：
          - py-10: 增加垂直内边距，提升视觉呼吸感。
      */}
      <div className='text-gray-400 container mx-auto max-w-4xl py-10 flex flex-col md:flex-row justify-center items-center text-sm space-y-4 md:space-y-0'>
        
        {/* ==================== 左侧/中心：版权所有声明 ==================== */}
        <div className='text-center md:px-4 tracking-wider'>
          &copy; {copyrightDate} <span className='text-white font-medium'>{siteConfig('AUTHOR')}</span>. All rights reserved.
        </div>

        {/* ==================== 右侧/辅助：备案与安全信息 ==================== */}
        <div className='md:p-0 text-center text-xs flex flex-wrap justify-center items-center'>
          
          {/* 备案信息 */}
          {siteConfig('BEI_AN') && (
            <a
              href={siteConfig('BEI_AN_LINK')}
              className='no-underline hover:text-[#0070f3] transition-colors duration-300 mx-2'>
              {siteConfig('BEI_AN')}
            </a>
          )}
          
          {/* 公安备案 */}
          <div className="mx-2">
             <BeiAnGongAn />
          </div>

          {/* 
              [审计说明]：
              1. 已彻底移除原有的 "Powered by NotionNext" 推广链接。
              2. 已清理原版代码中的占位符。
          */}
        </div>
      </div>
    </footer>
  )
}
