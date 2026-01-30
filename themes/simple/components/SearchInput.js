/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：搜索输入框组件 (Refined Search Input Component)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 核心逻辑：负责全站关键词搜索。采用 Next.js 原生路由实现无刷新的单页跳转。
 * 2. 视觉修复：已将背景由透明改为实色（bg-white），彻底杜绝底层文字透射干扰。
 * 3. 交互增强：引入 penboy451 科技蓝 (#0070f3) 加载动画，并优化了输入框边缘对比度。
 * 4. 兼容性：针对中文输入法（IME）进行了锁定逻辑优化，防止拼音输入过程中误触发。
 * -----------------------------------------------------------------------
 */

import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'

// =====================================================================
// 组件主体逻辑 (Main Component Logic)
// =====================================================================

/**
 * SearchInput 组件
 * @param keyword - 外部传入的初始搜索关键词
 * @param cRef - 组件引用转发，允许父组件远程触发 focus 动作
 * @param className - 外部自定义样式类
 */
const SearchInput = ({ keyword, cRef, className }) => {
  // 状态管理：控制搜索过程中的 Loading 旋转动画
  const [onLoading, setLoadingState] = useState(false)
  // 状态管理：控制“清空内容”图标的显示与隐藏
  const [showClean, setShowClean] = useState(false)
  
  const router = useRouter()
  const searchInputRef = useRef()
  
  // 内部逻辑锁：用于处理中文输入法合成过程，防止拼音阶段触发逻辑
  const lock = useRef(false)

  // -------------------------------------------------------------------
  // 接口暴露 (API Exposure)
  // -------------------------------------------------------------------
  useImperativeHandle(cRef, () => ({
    // 允许父组件通过 ref.current.focus() 直接让搜索框获得焦点
    focus: () => {
      searchInputRef?.current?.focus()
    }
  }))

  // -------------------------------------------------------------------
  // 事件处理 (Event Handlers)
  // -------------------------------------------------------------------

  // 执行搜索跳转逻辑
  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      // 使用单页路由跳转，URL 编码确保特殊字符安全
      router.push(`/search/${encodeURIComponent(key)}`)
    } else {
      // 若输入为空，则退回首页
      router.push('/')
    }
  }

  // 键盘监听：支持回车搜索 (Enter) 与 取消键清空 (ESC)
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSearch()
    } else if (e.keyCode === 27) {
      cleanSearch()
    }
  }

  // 执行清空动作
  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }

  // 监听输入变化：实时判断是否需要显示“清空”按钮
  const updateSearchKey = (val) => {
    if (lock.current) return // 若拼音输入未结束，不执行更新
    searchInputRef.current.value = val
    setShowClean(!!val)
  }

  // 中文输入法生命周期控制
  const lockSearchInput = () => { lock.current = true }
  const unLockSearchInput = () => { lock.current = false }

  return (
    /**
     * 容器层：
     * - bg-white: 必须使用实色背景，防止头像区的文字透视。
     * - border-gray-300: 提升边缘对比度，确保在浅色模式下轮廓清晰。
     * - overflow-hidden: 确保内部元素（如按钮背景）不会超出圆角边框。
     */
    <div className={`flex w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-sm overflow-hidden shadow-sm transition-all duration-300 ${className || ''}`}>
        
        {/* 输入框主体 */}
        <input
            ref={searchInputRef}
            type='text'
            placeholder='输入关键词并回车...'
            className='outline-none w-full text-sm pl-4 h-10 text-black dark:text-white bg-white dark:bg-gray-900 font-light antialiased'
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

        {/**
         * 搜索按钮区：
         * - bg-gray-50: 微色差区分，增强点击引导感。
         * - hover:text-[#0070f3]: 悬浮时亮起 penboy451 专属品牌蓝。
         */}
        <div 
          className='px-4 cursor-pointer flex items-center justify-center bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-colors' 
          onClick={handleSearch}
        >
            <i className={`fas transition-colors duration-300 ${onLoading ? 'fa-spinner animate-spin text-[#0070f3]' : 'fa-search text-gray-400 hover:text-[#0070f3]'}`} />
        </div>

        {/* 动态显示的清空按钮 */}
        {showClean && (
            <div className='absolute right-12 top-0 h-10 flex items-center justify-center'>
                <i 
                  className='fas fa-times text-gray-300 hover:text-red-500 cursor-pointer p-2 transition-colors' 
                  onClick={cleanSearch} 
                />
            </div>
        )}
    </div>
  )
}

export default SearchInput
