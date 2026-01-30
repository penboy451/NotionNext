/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：社交联系方式按钮组组件 (Refined Social Buttons)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 交互升级：引入全站统一的科技蓝 (#0070f3) 作为鼠标悬浮反馈色。
 * 2. 布局优化：废弃了原版固定的 w-52 宽度，采用 flex-auto 居中布局，适配多种链接组合。
 * 3. 规范化：修正了按钮提示文字 (Title) 的大小写规范，更符合专业博主调性。
 * -----------------------------------------------------------------------
 */

import { siteConfig } from '@/lib/config'
import { useRef } from 'react'
import { handleEmailClick } from '@/lib/plugins/mailEncrypt'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 社交联系方式按钮组
 * @returns {JSX.Element}
 */
const SocialButton = () => {
  const CONTACT_EMAIL = siteConfig('CONTACT_EMAIL')
  const emailIcon = useRef(null)

  return (
    /**
     * 外部容器：
     * - justify-center: 确保所有图标在侧边栏或页脚水平居中。
     * - flex-wrap: 当图标过多时，自动换行而不溢出容器。
     * - my-4: 增加上下间距，避免与名字和简介过于拥挤。
     */
    <div className='w-full flex justify-center flex-wrap my-4 antialiased'>
      
      {/* 
          内部图标组：
          - text-gray-600: 初始状态采用稳重的中灰色。
          - dark:text-gray-400: 夜间模式下采用浅灰色，确保对比度。
          - space-x-6: 增加图标间的水平间距，提升移动端点按准确率。
      */}
      <div className='flex items-center space-x-6 text-2xl md:text-xl text-gray-600 dark:text-gray-400'>

        {/* ==================== GitHub 链接 ==================== */}
        {siteConfig('CONTACT_GITHUB') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Github'}
            href={siteConfig('CONTACT_GITHUB')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-github' />
          </a>
        )}

        {/* ==================== X (Twitter) 链接 ==================== */}
        {siteConfig('CONTACT_TWITTER') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Twitter'}
            href={siteConfig('CONTACT_TWITTER')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-twitter' />
          </a>
        )}

        {/* ==================== Telegram 链接 ==================== */}
        {siteConfig('CONTACT_TELEGRAM') && (
          <a
            target='_blank'
            rel='noreferrer'
            href={siteConfig('CONTACT_TELEGRAM')}
            title={'Telegram'}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-telegram' />
          </a>
        )}

        {/* ==================== LinkedIn 链接 ==================== */}
        {siteConfig('CONTACT_LINKEDIN') && (
          <a
            target='_blank'
            rel='noreferrer'
            href={siteConfig('CONTACT_LINKEDIN')}
            title={'LinkedIn'}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-linkedin' />
          </a>
        )}

        {/* ==================== 微博链接 ==================== */}
        {siteConfig('CONTACT_WEIBO') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Weibo'}
            href={siteConfig('CONTACT_WEIBO')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-weibo' />
          </a>
        )}

        {/* ==================== Instagram 链接 ==================== */}
        {siteConfig('CONTACT_INSTAGRAM') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Instagram'}
            href={siteConfig('CONTACT_INSTAGRAM')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-instagram' />
          </a>
        )}

        {/* ==================== 电子邮件 (带加密点击保护) ==================== */}
        {CONTACT_EMAIL && (
          <a
            onClick={e => handleEmailClick(e, emailIcon, CONTACT_EMAIL)}
            target='_blank'
            rel='noreferrer'
            className='cursor-pointer transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
            title={'Email'}
            ref={emailIcon}
          >
            <i className='fas fa-envelope' />
          </a>
        )}

        {/* ==================== RSS 订阅源 ==================== */}
        {JSON.parse(siteConfig('ENABLE_RSS')) && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'RSS'}
            href={'/rss/feed.xml'}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fas fa-rss' />
          </a>
        )}

        {/* ==================== 哔哩哔哩链接 ==================== */}
        {siteConfig('CONTACT_BILIBILI') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Bilibili'}
            href={siteConfig('CONTACT_BILIBILI')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-bilibili' />
          </a>
        )}

        {/* ==================== YouTube 链接 ==================== */}
        {siteConfig('CONTACT_YOUTUBE') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Youtube'}
            href={siteConfig('CONTACT_YOUTUBE')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-youtube' />
          </a>
        )}

        {/* ==================== Threads 链接 ==================== */}
        {siteConfig('CONTACT_THREADS') && (
          <a
            target='_blank'
            rel='noreferrer'
            title={'Threads'}
            href={siteConfig('CONTACT_THREADS')}
            className='transform transition-all duration-300 hover:scale-125 hover:text-[#0070f3]'
          >
            <i className='fab fa-threads' />
          </a>
        )}
      </div>
    </div>
  )
}

export default SocialButton
