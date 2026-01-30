/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：网站页眉组件 (Refined Site Header)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 动效肃清：移除原版大幅度旋转动效，采用更稳重的 scale 缩放与自研科技蓝交互。
 * 2. 响应式布局：废弃固定 h-80 高度，采用动态 Padding，大幅优化移动端首屏视野。
 * 3. 字体一致性：全站统一采用无衬线体，确保品牌视觉的严谨与现代感。
 * -----------------------------------------------------------------------
 */

import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 网站页眉组件
 * @param {Object} props - 包含 siteInfo（Notion 站点图标等信息）
 */
export default function Header(props) {
  const { siteInfo } = props

  return (
    /**
     * Header 容器：
     * - py-16 md:py-24: 采用动态上下边距替代固定高度，兼顾视觉留白与内容紧凑度。
     * - transition-all: 确保整体视觉切换时的流畅度。
     */
    <header className='text-center w-full px-6 bg-white dark:bg-black relative z-10 py-16 md:py-24 antialiased'>
      
      <div className='max-w-4xl mx-auto'>
        <SmartLink href='/'>
          
          {/* ==================== 品牌标识区 (Logo & Identity) ==================== */}
          <div className='flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-center items-center'>
            
            {/* 
                头像展示区：
                - 优化：取消了 rotate-45 旋转，改为微缩放 hover:scale-105。
                - 边框反馈：悬浮时增加科技蓝 (#0070f3) 环绕影感。
            */}
            <div className='transform transition-all duration-500 cursor-pointer hover:scale-105'>
              <LazyImage
                priority={true}
                src={siteInfo?.icon}
                className='rounded-full shadow-md border-2 border-transparent hover:border-[#0070f3]'
                width={120}
                height={120}
                alt={siteConfig('AUTHOR')}
              />
            </div>

            {/* 
                站长信息区：
                - font-sans: 确保与 blog.config.js 里的现代风格统一。
                - tracking-tighter: 紧凑字间距，提升视觉专业感。
            */}
            <div className='flex flex-col text-center md:text-left justify-center'>
              <h1 className='text-3xl md:text-4xl font-sans font-bold text-black dark:text-white tracking-tighter hover:text-[#0070f3] transition-colors duration-300'>
                {siteConfig('AUTHOR')}
              </h1>
              
              {/**
               * 核心口号区：
               * - dangerouslySetInnerHTML: 渲染来自配置文件的 HTML 描述。
               * - text-gray-500: 采用中性灰色，保持低调而不失质感。
               */}
              <div
                className='mt-2 font-light text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed'
                dangerouslySetInnerHTML={{
                  __html: siteConfig('SIMPLE_LOGO_DESCRIPTION', null, CONFIG)
                }}
              />
            </div>
          </div>
        </SmartLink>

        {/* ==================== 交互矩阵区 (Social & Description) ==================== */}
        
        {/* 社交按钮：已在子组件中完成科技蓝精装修 */}
        <div className='flex justify-center mt-8'>
          <SocialButton />
        </div>

        {/**
         * 站点全局简介 (Secondary Description):
         * - 仅作为辅助信息展示，字号设为最小 (text-xs)，避免喧宾夺主。
         */}
        <div className='text-xs mt-6 text-gray-400 dark:text-gray-500 font-light italic opacity-80'>
          {siteConfig('DESCRIPTION')}
        </div>
      </div>

    </header>
  )
}
