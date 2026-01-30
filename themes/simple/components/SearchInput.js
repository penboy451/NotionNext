/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：搜索输入框组件 (Refined Search Input)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 彻底修复：将 JSX 内部注释正确包裹在 {/* */} 中，杜绝注释泄露到页面。
 * 2. 消除透射：将输入框背景设为实色（bg-white），防止底层 Bio 文字穿透显示。
 * 3. 视觉增强：优化了日夜模式下的边框对比度，确保搜索框轮廓清晰。
 * -----------------------------------------------------------------------
 */

import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'

const SearchInput = ({ keyword, cRef, className }) => {
  const [onLoading, setLoadingState] = useState(false)
  const [showClean, setShowClean] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const lock = useRef(false)

  // 暴露焦点接口
  useImperativeHandle(cRef, () => ({
    focus: () => {
      searchInputRef?.current?.focus()
    }
  }))

  // 搜索执行逻辑 (SPA 模式)
  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push(`/search/${encodeURIComponent(key)}`)
    } else {
      router.push('/')
    }
  }

  // 键盘事件处理
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) handleSearch()
    else if (e.keyCode === 27) cleanSearch()
  }

  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }

  const updateSearchKey = (val) => {
    if (lock.current) return
    searchInputRef.current.value = val
    setShowClean(!!val)
  }

  const lockSearchInput = () => { lock.current = true }
  const unLockSearchInput = () => { lock.current = false }

  return (
    <div className={`flex w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-sm overflow-hidden ${className || ''}`}>
        {/* 
            输入框主体：
            - bg-white: 设为实色，防止背景文字透视。
            - h-10: 规范化高度，确保点击区域足够大。
        */}
        <input
            ref={searchInputRef}
            type='text'
            placeholder='输入关键词搜索...'
            className='outline-none w-full text-sm pl-4 h-10 transition-all font-light text-black dark:text-white bg-white dark:bg-gray-900 antialiased'
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

        {/* 搜索/加载按钮：增加品牌蓝反馈 */}
        <div 
          className='px-4 cursor-pointer flex items-center justify-center bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-colors'
          onClick={handleSearch}
        >
            <i className={`fas ${onLoading ? 'fa-spinner animate-spin text-[#0070f3]' : 'fa-search text-gray-500 hover:text-[#0070f3]'}`} />
        </div>

        {/* 清空按钮 */}
        {showClean && (
            <div className='absolute right-12 top-0 h-10 flex items-center justify-center'>
                <i 
                  className='fas fa-times text-gray-300 hover:text-red-500 cursor-pointer p-2' 
                  onClick={cleanSearch} 
                />
            </div>
        )}
    </div>
  )
}

export default SearchInput
