/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：文章加密校验组件 (Refined Article Lock Component)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 工程化重构：采用 React useState 状态机制管理错误提示，废弃了原版直接修改 DOM 的底层写法。
 * 2. 品牌统合：提交按钮统一切换为科技蓝 (#0070f3)，并增加了深度交互反馈。
 * 3. 视觉引导：优化了输入框的焦点（Focus）状态色，全站视觉体系达成高度一致。
 * -----------------------------------------------------------------------
 */

import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'

// =====================================================================
// 组件主体逻辑 (Optimized Component Logic)
// =====================================================================

/**
 * 加密文章校验组件
 * @param {Function} props.validPassword - 校验回调函数，用于判断密码是否正确
 */
export default function ArticleLock(props) {
  const { validPassword } = props
  const { locale } = useGlobal()
  const passwordInputRef = useRef(null)

  // 状态管理：错误信息显示逻辑
  const [errorTips, setErrorTips] = useState(null)

  /**
   * 提交密码逻辑
   * 逻辑：调用父组件传入的校验函数，若失败则触发本地错误提示状态。
   */
  const submitPassword = () => {
    const passwordValue = passwordInputRef.current?.value
    
    // 校验密码
    const isCorrect = validPassword(passwordValue)
    
    if (!isCorrect) {
      // 若密码错误，更新状态以显示带动画的错误提示
      setErrorTips(
        <div className='text-red-500 font-medium text-sm animate__shakeX animate__animated'>
          <i className="fas fa-exclamation-circle mr-1" />
          {locale.COMMON.PASSWORD_ERROR}
        </div>
      )
      
      // 3秒后自动清除错误提示，恢复界面整洁
      setTimeout(() => setErrorTips(null), 3000)
    }
  }

  /**
   * 初始化：自动聚焦
   * 作用：用户进入加密页后无需手动点击，直接开始打字，极大地提升了 UX（用户体验）。
   */
  useEffect(() => {
    passwordInputRef.current?.focus()
  }, [])

  return (
    /**
     * 容器层：
     * - h-[60vh]: 相比固定的 h-96，使用视口高度确保在不同设备上都能垂直居中。
     */
    <div id='article-lock-container' className='w-full flex justify-center items-center h-[60vh] antialiased'>
        
        <div className='text-center space-y-6 w-full max-w-sm px-6'>
            
            {/* 提示图标与文字 */}
            <div className="space-y-2">
                <i className="fas fa-lock text-gray-300 text-4xl mb-2" />
                <div className='font-bold text-gray-700 dark:text-gray-300'>
                  {locale.COMMON.ARTICLE_LOCK_TIPS}
                </div>
            </div>

            <div className='flex items-stretch shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 focus-within:border-[#0070f3] transition-all duration-300'>
                {/* 
                    密码输入框：
                    - focus:bg-white: 获得焦点时底色亮起，增加操作感。
                */}
                <input 
                    ref={passwordInputRef}
                    id="password" 
                    type='password'
                    placeholder="输入访问密码..."
                    onKeyDown={(e) => e.key === 'Enter' && submitPassword()}
                    className='outline-none w-full text-sm pl-5 h-11 transition-all font-light text-black dark:text-white dark:bg-gray-900 bg-gray-50'
                />

                {/**
                 * 提交按钮：
                 * - bg-[#0070f3]: 品牌蓝背景。
                 * - hover:opacity-90: 悬浮亮度反馈。
                 */}
                <button 
                    onClick={submitPassword} 
                    className="px-6 whitespace-nowrap cursor-pointer flex items-center justify-center bg-[#0070f3] text-white transition-all duration-300 active:scale-95"
                >
                    <i className='fas fa-key mr-2' />
                    <span className="text-xs font-bold tracking-widest">{locale.COMMON.SUBMIT}</span>
                </button>
            </div>

            {/* 错误提示动态显示区域 */}
            <div className='h-6 flex justify-center items-center'>
                {errorTips}
            </div>

        </div>
    </div>
  )
}
