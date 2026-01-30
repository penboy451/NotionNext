/**
 * -----------------------------------------------------------------------
 * NotionNext 站点动态特效与视觉美化配置文件 (Visual Effects Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于管理网站的前端动效（如鼠标特效、背景粒子、樱花飘落等）。
 * 2. 动效开启会消耗一定的浏览器性能（尤其是移动端），建议按需开启。
 * 3. 大部分特效仅在 PC 端有较好表现。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：鼠标交互特效 (Mouse Interaction)
  // =====================================================================

  /**
   * 鼠标点击：烟花特效 (Fireworks)
   * 开启后，鼠标点击页面任何位置都会迸发彩色烟花。
   */
  FIREWORKS: process.env.NEXT_PUBLIC_FIREWORKS || false,

  /**
   * 烟花色彩配置 (Fireworks Colors)
   * 格式：RGB 颜色数组
   */
  FIREWORKS_COLOR: [
    '255, 20, 97',
    '24, 255, 146',
    '90, 135, 255',
    '251, 243, 140'
  ],

  /**
   * 鼠标跟随：粒子特效 (Mouse Follower)
   * 开启后，鼠标移动时会有跟随的粒子轨迹。
   */
  MOUSE_FOLLOW: process.env.NEXT_PUBLIC_MOUSE_FOLLOW || false,

  /**
   * 鼠标跟随特效类型 (Effect Type)
   * 可选值 [1-12]:
   * 1:路径散点 2:下降散点 3:上升散点 4:边缘移入 5:跟踪转圈 6:路径线条
   * 7:聚集散点 8:聚集网格 9:移动网格 10:上升粒子 11:随机颜色粒子 12:圆锥放射蓝色粒子
   */
  MOUSE_FOLLOW_EFFECT_TYPE: 11,

  /**
   * 鼠标跟随特效颜色 (Effect Color)
   * 支持 16 进制颜色 (#xxxxxx) 或 rgba 格式。
   */
  MOUSE_FOLLOW_EFFECT_COLOR: '#ef672a',

  // =====================================================================
  // 第二部分：背景氛围特效 (Background Atmosphere)
  // =====================================================================

  /**
   * 樱花飘落特效 (Sakura Falling)
   * 适合春季或清新风格的主题。
   */
  SAKURA: process.env.NEXT_PUBLIC_SAKURA || false,

  /**
   * 漂浮线条网格 (Canvas Nest)
   * 鼠标与背景线段之间会产生引力关联。
   */
  NEST: process.env.NEXT_PUBLIC_NEST || false,

  /**
   * 动态彩带特效 (Fluttering Ribbon)
   * 背景中会有飘动的彩色丝带。
   */
  FLUTTERINGRIBBON: process.env.NEXT_PUBLIC_FLUTTERINGRIBBON || false,

  /**
   * 静态彩带特效 (Static Ribbon)
   * 相对不占 CPU，固定在背景的彩带装饰。
   */
  RIBBON: process.env.NEXT_PUBLIC_RIBBON || false,

  /**
   * 星空雨特效 (Starry Sky)
   * 提示：仅在夜间模式（Dark Mode）开启时生效。
   */
  STARRY_SKY: process.env.NEXT_PUBLIC_STARRY_SKY || false,

  // =====================================================================
  // 第三部分：外部资源库 (External Libraries)
  // =====================================================================

  /**
   * Animate.css 动画库地址
   * 作用：支撑网站内各种元素的滑入、淡出等转场动画。
   * 默认使用 cdnjs 提供的稳定公用链接。
   */
  ANIMATE_CSS_URL:
    process.env.NEXT_PUBLIC_ANIMATE_CSS_URL ||
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
}
