/**
 * -----------------------------------------------------------------------
 * NotionNext 网站字体与排版配置文件 (Global Optimized Fonts)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 采用全球镜像：将 Google Fonts 切换为 Loli 镜像，确保国内不翻墙也能秒开。
 * 2. 系统字体优先：采用 GitHub/Medium 同款系统字体栈，无网络请求时也能呈现顶级排版。
 * 3. 性能平衡：开启 font-display: swap，确保文字在字体加载完成前先行显示，避免白屏。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // 网站基础字体样式：'font-sans' (无衬线，现代感强) 或 'font-serif' (有衬线，书卷气浓)
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans font-light',

  /**
   * 全球加速字体库 (Global Font Mirror)
   * 逻辑：使用 fonts.loli.net 替代 fonts.googleapis.com。
   * 优势：该镜像在全球均有 CDN 节点，且在国内访问极速，彻底解决国内用户“转圈”问题。
   */
  FONT_URL: [
    'https://fonts.loli.net/css?family=Bitter:300,400,700&display=swap',
    'https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap',
    'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@300;400;500;700&display=swap'
  ],

  // 字体优化高级配置
  FONT_DISPLAY: process.env.NEXT_PUBLIC_FONT_DISPLAY || 'swap', // 字体加载时先显示系统字体，加载完再替换
  FONT_PRELOAD: process.env.NEXT_PUBLIC_FONT_PRELOAD || true,   // 预加载字体，提升响应速度
  FONT_SUBSET: process.env.NEXT_PUBLIC_FONT_SUBSET || 'chinese-simplified', // 针对中文简体进行子集优化

  /**
   * 全球无衬线字体栈 (Universal Sans-serif Stack)
   * 逻辑：优先尝试加载 Inter 和系统自带的高质量字体，无需网络下载，瞬间呈现。
   */
  FONT_SANS: [
    'Inter',             // 全球设计师最爱的现代字体
    'system-ui',         // 调用操作系统最原生、最快的字体
    '-apple-system',     // iOS/macOS 专属优化
    'BlinkMacSystemFont',// Chrome 渲染优化
    '"PingFang SC"',     // 苹果中文标准字体
    '"Hiragino Sans GB"',// 旧版 macOS 中文
    '"Microsoft YaHei"', // Windows 标准中文（微软雅黑）
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Segoe UI"',
    '"Noto Sans SC"',    // 备选网络字体
    'HarmonyOS_Regular', // 华为鸿蒙字体
    '"Helvetica Neue"',
    'Helvetica',
    'Arial',
    'sans-serif',        // 最后的保底
    '"Apple Color Emoji"'
  ],

  /**
   * 全球有衬线字体栈 (Universal Serif Stack)
   * 逻辑：适合长文阅读，提供优雅的印刷感。
   */
  FONT_SERIF: [
    'Bitter',
    '"Noto Serif SC"',
    'SimSun',            // Windows 中文保底（中易宋体）
    '"Times New Roman"', // Windows 英文保底
    'Times',
    'serif',
    '"Apple Color Emoji"'
  ],

  /**
   * FontAwesome 图标库加速
   * 逻辑：采用 cdnjs 全球加速节点，国内和海外访问均非常稳定。
   */
  FONT_AWESOME:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
}
