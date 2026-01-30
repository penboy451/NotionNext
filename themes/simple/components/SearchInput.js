/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：搜索输入框组件 (Refined Search Input)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 性能重构：使用 router.push 替代 location.href，实现单页应用 (SPA) 的无刷新跳转。
 * 2. 交互升级：引入科技蓝 (#0070f3) 作为加载与搜索状态的视觉反馈。
 * 3. 逻辑修复：将 IME 输入锁移入组件内部 Ref，确保多实例下的逻辑隔离。
 * -----------------------------------------------------------------------
 */

import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'

/**
 * 搜索输入框组件主体
 * @param {string} keyword - 初始搜索词
 * @param {object} cRef - 转发给父组件的引用，用于控制焦点
 * @param {string} className - 自定义样式类
 */
const SearchInput = ({ keyword, cRef, className }) => {
  const [onLoading, setLoadingState] = useState(false) // 搜索加载状态
  const [showClean, setShowClean] = useState(false)   // “清空”图标显示控制
  const router = useRouter()
  const searchInputRef = useRef()
  
  /**
   * 中文输入法 (IME) 锁定逻辑说明：
   * lock 用于标记当前是否正在进行拼音组合。
   * 在选定汉字前，不执行搜索词更新逻辑，防止界面抖动。
   */
  const lock = useRef(false)

  // =====================================================================
  // 第一部分：内部接口与事件处理 (API & Handlers)
  // =====================================================================

  // 向父组件暴露 focus 接口，提升组件交互的灵活性
  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

  /**
   * 执行搜索逻辑
   * 优化：使用 router.push 保持 SPA 路由上下文，避免白屏加载。
   */
  const handleSearch = () => {
    const key = searchInputRef.current.value

    if (key && key !== '') {
      setLoadingState(true)
      // 使用 Next.js 路由跳转，体验更流畅
      router.push(`/search/${encodeURIComponent(key)}`)
    } else {
      router.push('/')
    }
  }

  // 处理键盘按键 (回车搜索，ESC 清空)
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSearch()
    } else if (e.keyCode === 27) {
      cleanSearch()
    }
  }

  // 清空逻辑：清除输入值并隐藏关闭按钮
  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }

  // 监听输入框变化
  const updateSearchKey = (val) => {
    if (lock.current) return // 如果拼音还没打完，暂时不处理
    
    searchInputRef.current.value = val
    setShowClean(!!val) // 快捷语法：有值则显示，无值则隐藏
  }

  // =====================================================================
  // 第二部分：中文输入优化 (IME Composition)
  // =====================================================================
  const lockSearchInput = () => { lock.current = true }
  const unLockSearchInput = () => { lock.current = false }

  return (
    /**
     * 容器层：
     * - bg-gray-50: 采用极浅灰色，与 Title 组件风格保持一致。
     * - border: 增加细微边框，增加输入框的精致感。
     */
    <div className={`flex w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-sm ${className || ''}`}>
        
        {/* 输入框主体 */}
        <input
            ref={searchInputRef}
            type='text'
            placeholder='输入关键词搜索...'
            className='outline-none w-full text-sm pl-4 transition-all focus:bg-white dark:focus:bg-black font-light leading-10 text-black dark:text-white bg-transparent antialiased'
            onKeyUp={handleKeyUp}
            onCompositionStart={lockSearchInput}
            onCompositionUpdate={lockSearchInput}
            onCompositionEnd={(e) => {
              unLockSearchInput()
              updateSearchKey(e.target.value)
            }}
            onChange={e => updateSearchKey(e.target.value)}
            defaultValue={keyword}
        />

        {/* 搜索/加载按钮 */}
        <div 
          className='px-4 cursor-pointer flex items-center justify-center transition-colors duration-200'
          onClick={handleSearch}
        >
            <i className={`transform duration-300 text-gray-400 hover:text-[#0070f3] fas ${onLoading ? 'fa-spinner animate-spin text-[#0070f3]' : 'fa-search'}`} />
        </div>

        {/* 清空按钮 (按需展示) */}
        {showClean && (
            <div className='-ml-10 pr-10 cursor-pointer flex items-center justify-center'>
                <i 
                  className='fas fa-times text-gray-300 hover:text-red-500 transition-colors duration-200' 
                  onClick={cleanSearch} 
                />
            </div>
        )}
    </div>
  )
}

export default SearchInput
