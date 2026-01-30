/**
 * -----------------------------------------------------------------------
 * NotionNext 开发与系统环境配置文件 (Development & System Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件主要管理开发调试、后台 Redis 缓存及系统版本逻辑。
 * 2. 除非有特定开发需求，建议保持默认配置。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // 子目录路径：若部署在子文件夹下则填写，否则保持为空
  SUB_PATH: '',

  // 调试模式：开启后将在控制台输出更多日志，并显示调试按钮
  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false,

  // TailwindCSS 自定义背景颜色 (Hex 格式)
  BACKGROUND_LIGHT: '#eeeeee', // 日间模式背景
  BACKGROUND_DARK: '#000000',  // 夜间模式背景

  // Redis 缓存数据库地址 (用于提升大规模访问下的数据读取速度)
  REDIS_URL: process.env.REDIS_URL || '',

  /**
   * 缓存开启逻辑
   * 作用：在生产环境 (Production) 下默认开启缓存以提升性能。
   */
  ENABLE_CACHE:
    process.env.ENABLE_CACHE ||
    process.env.npm_lifecycle_event === 'build' ||
    process.env.npm_lifecycle_event === 'export' ||
    process.env.VERCEL_ENV === 'production' ||
    process.env.EXPORT,

  // 是否展示编译依赖内容与大小 (用于性能调优)
  BUNDLE_ANALYZER: process.env.ANALYZE === 'true' || false,

  /**
   * 系统版本号读取逻辑
   * 逻辑：优先读取环境变量，其次从 package.json 中获取。
   */
  VERSION: (() => {
    try {
      return (
        process.env.NEXT_PUBLIC_VERSION || require('../package.json').version
      )
    } catch (error) {
      console.warn('Failed to load package.json version:', error)
      return '1.0.0' // 缺省版本号
    }
  })()
}
