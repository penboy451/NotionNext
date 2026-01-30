/**
 * -----------------------------------------------------------------------
 * NotionNext 核心主题调度中心 (Locked Theme Orchestrator)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明（旗舰锁死版）：
 * 1. 主权锁定：彻底移除了 URL 参数 (?theme=) 动态切换主题的功能，防止外部干扰。
 * 2. 架构脱水：删除了多主题预览的相关异步逻辑，降低系统复杂度，提升加载可靠性。
 * 3. 品牌保护：网站界面将完全听命于 blog.config.js，确保 penboy451 品牌视觉的严肃性。
 * -----------------------------------------------------------------------
 */

import BLOG, { LAYOUT_MAPPINGS } from '@/blog.config'
import * as ThemeComponents from '@theme-components'
import getConfig from 'next/config'
import { getQueryVariable, isBrowser } from '../lib/utils'

// 从运行配置中获取可用主题清单
export const { THEMES = [] } = getConfig()?.publicRuntimeConfig || {}

// =====================================================================
// 第一部分：主题配置抓取 (Theme Config Retrieval)
// =====================================================================

/**
 * 获取主题配置
 * 优化逻辑：废弃了 themeQuery 判定。无论外部传入什么参数，
 * 均强制返回当前部署的默认主题配置，确保品牌视觉不被篡改。
 */
export const getThemeConfig = async (themeQuery) => {
  // [旗舰锁死逻辑]：忽略所有 URL 主题参数，直接回归默认组件配置
  return ThemeComponents?.THEME_CONFIG
}

// =====================================================================
// 第二部分：布局路由调度 (Layout Dispatcher)
// =====================================================================

/**
 * 加载全局基础布局
 * 优化逻辑：锁定为当前主题的 LayoutBase，移除任何形式的动态主题导入。
 */
export const getBaseLayoutByTheme = (theme) => {
  // [旗舰锁死逻辑]：不再根据 theme 参数执行 import()，直接引用当前预加载组件
  return ThemeComponents['LayoutBase']
}

/**
 * 动态组件挂载点
 */
export const DynamicLayout = (props) => {
  const { theme, layoutName } = props
  const SelectedLayout = useLayoutByTheme({ layoutName, theme })
  return <SelectedLayout {...props} />
}

/**
 * 获取具体路径对应的布局组件
 * 优化逻辑：移除 URL 参数监听，实现 100% 的静态配置驱动。
 */
export const useLayoutByTheme = ({ layoutName, theme }) => {
  // 核心逻辑：根据路径映射表获取对应组件，若无匹配则回退至标准文章页 (LayoutSlug)
  const LayoutComponents =
    ThemeComponents[layoutName] || ThemeComponents.LayoutSlug

  // 这里的 fixThemeDOM 仅作为 DOM 树的稳定性检查，不再承担切换主题后的清理工作
  setTimeout(fixThemeDOM, 100)
  
  return LayoutComponents
}

/**
 * 根据 URL 路径匹配对应的布局名称
 */
const getLayoutNameByPath = (path) => {
  return LAYOUT_MAPPINGS[path] || 'LayoutSlug'
}

// =====================================================================
// 第三部分：环境兼容与深色模式 (Environment & DarkMode)
// =====================================================================

/**
 * DOM 环境治理
 * 作用：确保页面 ID 的唯一性，防止由于 React 渲染导致的冗余 ID 残留。
 */
const fixThemeDOM = () => {
  if (isBrowser) {
    const elements = document.querySelectorAll('[id^="theme-"]')
    if (elements?.length > 1) {
      for (let i = 0; i < elements.length - 1; i++) {
        if (
          elements[i] &&
          elements[i].parentNode &&
          elements[i].parentNode.contains(elements[i])
        ) {
          elements[i].parentNode.removeChild(elements[i])
        }
      }
      elements[0]?.scrollIntoView()
    }
  }
}

/**
 * 初始化深色模式
 * 优先级逻辑：URL 模式强制参数 > 本地偏好缓存 > 系统硬件设置 > 站点默认配置
 */
export const initDarkMode = (updateDarkMode, defaultDarkMode) => {
  // 1. 获取系统偏好
  let newDarkMode = isPreferDark()

  // 2. 获取用户手动选择的历史记录
  const userDarkMode = loadDarkModeFromLocalStorage()
  if (userDarkMode) {
    newDarkMode = userDarkMode === 'dark' || userDarkMode === 'true'
    saveDarkModeToLocalStorage(newDarkMode) 
  }

  // 3. 检查站点是否有强制默认色调设置
  if (defaultDarkMode === 'true') {
    newDarkMode = true
  }

  // 4. 处理 URL 临时预览模式 (e.g. ?mode=dark)
  const queryMode = getQueryVariable('mode')
  if (queryMode) {
    newDarkMode = queryMode === 'dark'
  }

  // 执行 React 状态更新并操作 HTML 根节点类名
  updateDarkMode(newDarkMode)
  document
    .getElementsByTagName('html')[0]
    .setAttribute('class', newDarkMode ? 'dark' : 'light')
}

/**
 * 智能判定深色模式开启条件
 */
export function isPreferDark() {
  // 若配置强行开启深色
  if (BLOG.APPEARANCE === 'dark') {
    return true
  }
  
  // 若配置为自动，则根据系统偏好及时间段进行双重判定
  if (BLOG.APPEARANCE === 'auto') {
    const date = new Date()
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
          date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
    )
  }
  return false
}

// 数据持久化方法
export const loadDarkModeFromLocalStorage = () => localStorage.getItem('darkMode')
export const saveDarkModeToLocalStorage = (newTheme) => localStorage.setItem('darkMode', newTheme)
