/**
 * -----------------------------------------------------------------------
 * NotionNext 网页互动挂件与第三方组件配置文件 (Widgets Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于管理侧边栏、浮窗以及页面底部的交互组件（机器人、宠物、音乐等）。
 * 2. 警告：开启过多的挂件（尤其是 3D 宠物和音乐播放器）会显著增加网页首屏加载时间。
 * 3. 建议：根据您的个人品牌需求，仅开启 1-2 个核心交互组件。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：系统基础功能 (System Features)
  // =====================================================================

  // 是否在页面上显示“日间/夜间”模式切换按钮
  THEME_SWITCH: process.env.NEXT_PUBLIC_THEME_SWITCH || false,

  // =====================================================================
  // 第二部分：AI 聊天机器人集成 (AI Chatbots)
  // =====================================================================

  /**
   * Chatbase 机器人
   * 获取：https://www.chatbase.co/
   */
  CHATBASE_ID: process.env.NEXT_PUBLIC_CHATBASE_ID || null,

  /**
   * Webwhiz AI 机器人 (支持自建)
   * 官网: https://www.webwhiz.ai/
   */
  WEB_WHIZ_ENABLED: process.env.NEXT_PUBLIC_WEB_WHIZ_ENABLED || false,
  WEB_WHIZ_BASE_URL: process.env.NEXT_PUBLIC_WEB_WHIZ_BASE_URL || 'https://api.webwhiz.ai',
  WEB_WHIZ_CHAT_BOT_ID: process.env.NEXT_PUBLIC_WEB_WHIZ_CHAT_BOT_ID || null,

  /**
   * Dify 聊天机器人 (目前最流行的开源 AI 工作流平台)
   * 官网: https://dify.ai/
   */
  DIFY_CHATBOT_ENABLED: process.env.NEXT_PUBLIC_DIFY_CHATBOT_ENABLED || false,
  DIFY_CHATBOT_BASE_URL: process.env.NEXT_PUBLIC_DIFY_CHATBOT_BASE_URL || '',
  DIFY_CHATBOT_TOKEN: process.env.NEXT_PUBLIC_DIFY_CHATBOT_TOKEN || '',

  // =====================================================================
  // 第三部分：趣味性互动挂件 (Interactive Widgets)
  // =====================================================================

  /**
   * 桌面宠物挂件 (Live2D Pet)
   * 作用：在网页右下角显示一个可互动的 2D 动漫形象。
   * 模型地址：默认使用 wanko (小狗) 模型，您可以更换为其他 JSON 模型链接。
   */
  WIDGET_PET: process.env.NEXT_PUBLIC_WIDGET_PET || false,
  WIDGET_PET_LINK:
    process.env.NEXT_PUBLIC_WIDGET_PET_LINK ||
    'https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json',
  WIDGET_PET_SWITCH_THEME: process.env.NEXT_PUBLIC_WIDGET_PET_SWITCH_THEME || false, // 点击宠物切换主题

  /**
   * 内容剧透/隐藏标签 (Spoiler Tag)
   * 作用：在 Notion 中使用特定的符号包裹文字，实现点击后才显示的“防剧透”效果。
   * 示例：若填入 [sp]，则 Notion 中 [sp]隐藏文字[sp] 将被模糊处理。
   */
  SPOILER_TEXT_TAG: process.env.NEXT_PUBLIC_SPOILER_TEXT_TAG || '',

  // =====================================================================
  // 第四部分：音乐播放插件 (Music Player)
  // 采用 APlayer 核心引擎
  // =====================================================================

  MUSIC_PLAYER: process.env.NEXT_PUBLIC_MUSIC_PLAYER || false, // 总开关
  MUSIC_PLAYER_VISIBLE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_VISIBLE || true, // 播放器面板是否可见
  MUSIC_PLAYER_AUTO_PLAY: process.env.NEXT_PUBLIC_MUSIC_PLAYER_AUTO_PLAY || false, // 是否自动播放（大部分浏览器会拦截此行为）
  MUSIC_PLAYER_LRC_TYPE: process.env.NEXT_PUBLIC_MUSIC_PLAYER_LRC_TYPE || '0', // 歌词类型 (0:禁用, 1:字符串, 3:LRC文件)
  MUSIC_PLAYER_CDN_URL: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.js',
  MUSIC_PLAYER_ORDER: process.env.NEXT_PUBLIC_MUSIC_PLAYER_ORDER || 'list', // 播放顺序: list(列表), random(随机)

  /**
   * 自定义本地音乐列表 (Custom Audio List)
   * 提示：此处已清空原作者歌单。请按照以下格式填入您喜欢的音乐。
   */
  MUSIC_PLAYER_AUDIO_LIST: [
    {
      name: '示例曲目',
      artist: '艺术家',
      url: '', // 音乐文件链接 (mp3)
      cover: '' // 封面图链接
    }
  ],

  /**
   * MetingJS 歌单集成 (推荐)
   * 作用：直接调用网易云、腾讯音乐等平台的歌单。
   */
  MUSIC_PLAYER_METING: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING || false,
  MUSIC_PLAYER_METING_SERVER: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_SERVER || 'netease', // 平台: netease, tencent, kugou
  MUSIC_PLAYER_METING_ID: process.env.NEXT_PUBLIC_MUSIC_PLAYER_METING_ID || '60198', // 歌单 ID

  // =====================================================================
  // 第五部分：社交平台挂件 (Social Widgets)
  // =====================================================================

  /**
   * Facebook 粉丝专页挂件
   * 提示：已移除原作者的专页链接。
   */
  FACEBOOK_PAGE_TITLE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_TITLE || null,
  FACEBOOK_PAGE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || null,
  FACEBOOK_PAGE_ID: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '',
  FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''
}
