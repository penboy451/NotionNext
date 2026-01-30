/**
 * -----------------------------------------------------------------------
 * NotionNext 评论系统与交互挂件配置文件 (Comments & Widgets Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于集成第三方评论系统（如 Giscus, Waline, Twikoo 等）。
 * 2. 只有当您在对应平台完成配置并填入 ID 后，评论功能才会生效。
 * 3. 建议：对于 GitHub 深度用户，首选 Giscus；追求极致体验建议选 Waline 或 Twikoo。
 * 4. 保持所有 ID 为空 ('')，即代表全局关闭评论功能，保持页面纯净。
 * -----------------------------------------------------------------------
 */

module.exports = {
  /**
   * 评论组件标签页切换
   * 作用：当您开启了多个评论插件时，是否在只有一个插件有效时隐藏切换标签。
   */
  COMMENT_HIDE_SINGLE_TAB: process.env.NEXT_PUBLIC_COMMENT_HIDE_SINGLE_TAB || false,

  // =====================================================================
  // 1. Giscus (基于 GitHub Discussions，推荐)
  // 配置地址: https://giscus.app/zh-CN
  // =====================================================================
  COMMENT_GISCUS_REPO: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO || '', // 您的仓库名 e.g. 'penboy451/NotionNext'
  COMMENT_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID || '', // 仓库 ID (在 giscus 官网配置后生成)
  COMMENT_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID || '', // 讨论分类 ID
  COMMENT_GISCUS_MAPPING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_MAPPING || 'pathname', // 文章匹配方式
  COMMENT_GISCUS_REACTIONS_ENABLED: process.env.NEXT_PUBLIC_COMMENT_GISCUS_REACTIONS_ENABLED || '1', // 开启表情回应
  COMMENT_GISCUS_EMIT_METADATA: process.env.NEXT_PUBLIC_COMMENT_GISCUS_EMIT_METADATA || '0', // 提取元数据
  COMMENT_GISCUS_INPUT_POSITION: process.env.NEXT_PUBLIC_COMMENT_GISCUS_INPUT_POSITION || 'bottom', // 输入框位置
  COMMENT_GISCUS_LANG: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LANG || 'zh-CN', // 语言
  COMMENT_GISCUS_LOADING: process.env.NEXT_PUBLIC_COMMENT_GISCUS_LOADING || 'lazy', // 延迟加载
  COMMENT_GISCUS_CROSSORIGIN: process.env.NEXT_PUBLIC_COMMENT_GISCUS_CROSSORIGIN || 'anonymous',

  // =====================================================================
  // 2. Waline (功能最强大的评论系统，支持点赞、表情、通知)
  // 官网: https://waline.js.org/
  // =====================================================================
  COMMENT_WALINE_SERVER_URL: process.env.NEXT_PUBLIC_WALINE_SERVER_URL || '', // 您的 Waline 服务端地址
  COMMENT_WALINE_RECENT: process.env.NEXT_PUBLIC_WALINE_RECENT || false, // 是否显示最近评论

  // =====================================================================
  // 3. Twikoo (部署简单，支持隐私保护)
  // 官网: https://twikoo.js.org/
  // =====================================================================
  COMMENT_TWIKOO_ENV_ID: process.env.NEXT_PUBLIC_COMMENT_ENV_ID || '', // 环境 ID 或 Vercel 托管域名
  COMMENT_TWIKOO_COUNT_ENABLE: process.env.NEXT_PUBLIC_COMMENT_TWIKOO_COUNT_ENABLE || false, // 列表页显示评论数
  COMMENT_TWIKOO_CDN_URL: process.env.NEXT_PUBLIC_COMMENT_TWIKOO_CDN_URL || 'https://s4.zstatic.net/npm/twikoo@1.6.44/dist/twikoo.min.js',

  // =====================================================================
  // 4. Utterances (轻量级 GitHub Issues 评论)
  // =====================================================================
  COMMENT_UTTERRANCES_REPO: process.env.NEXT_PUBLIC_COMMENT_UTTERRANCES_REPO || '', // 您的仓库名 e.g. 'penboy451/NotionNext'

  // =====================================================================
  // 5. Gitalk (经典的 GitHub 评论，需要创建 GitHub OAuth App)
  // =====================================================================
  COMMENT_GITALK_REPO: process.env.NEXT_PUBLIC_COMMENT_GITALK_REPO || '', // 仓库名
  COMMENT_GITALK_OWNER: process.env.NEXT_PUBLIC_COMMENT_GITALK_OWNER || '', // GitHub 用户名
  COMMENT_GITALK_ADMIN: process.env.NEXT_PUBLIC_COMMENT_GITALK_ADMIN || '', // 管理员用户名
  COMMENT_GITALK_CLIENT_ID: process.env.NEXT_PUBLIC_COMMENT_GITALK_CLIENT_ID || '', // OAuth App Client ID
  COMMENT_GITALK_CLIENT_SECRET: process.env.NEXT_PUBLIC_COMMENT_GITALK_CLIENT_SECRET || '', // OAuth App Secret
  COMMENT_GITALK_DISTRACTION_FREE_MODE: false,
  COMMENT_GITALK_JS_CDN_URL: 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js',
  COMMENT_GITALK_CSS_CDN_URL: 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css',

  // =====================================================================
  // 6. 其他第三方挂件与即时通讯
  // =====================================================================
  COMMENT_CUSDIS_APP_ID: process.env.NEXT_PUBLIC_COMMENT_CUSDIS_APP_ID || '', // Cusdis ID
  COMMENT_CUSDIS_HOST: process.env.NEXT_PUBLIC_COMMENT_CUSDIS_HOST || 'https://cusdis.com',
  COMMENT_CUSDIS_SCRIPT_SRC: process.env.NEXT_PUBLIC_COMMENT_CUSDIS_SCRIPT_SRC || '/js/cusdis.es.js',

  COMMENT_GITTER_ROOM: process.env.NEXT_PUBLIC_COMMENT_GITTER_ROOM || '', // Gitter 聊天室
  COMMENT_DAO_VOICE_ID: process.env.NEXT_PUBLIC_COMMENT_DAO_VOICE_ID || '', // DaoVoice 客服 ID
  COMMENT_TIDIO_ID: process.env.NEXT_PUBLIC_COMMENT_TIDIO_ID || '', // Tidio 聊天 ID

  // Valine 配置
  COMMENT_VALINE_CDN: 'https://unpkg.com/valine@1.5.1/dist/Valine.min.js',
  COMMENT_VALINE_APP_ID: process.env.NEXT_PUBLIC_VALINE_ID || '',
  COMMENT_VALINE_APP_KEY: process.env.NEXT_PUBLIC_VALINE_KEY || '',
  COMMENT_VALINE_SERVER_URLS: process.env.NEXT_PUBLIC_VALINE_SERVER_URLS || '',
  COMMENT_VALINE_PLACEHOLDER: process.env.NEXT_PUBLIC_VALINE_PLACEHOLDER || '快来留言吧~',

  // Artalk 配置
  COMMENT_ARTALK_SERVER: process.env.NEXT_PUBLIC_COMMENT_ARTALK_SERVER || '',
  COMMENT_ARTALK_JS: 'https://cdnjs.cloudflare.com/ajax/libs/artalk/2.5.5/Artalk.js',
  COMMENT_ARTALK_CSS: 'https://cdnjs.cloudflare.com/ajax/libs/artalk/2.5.5/Artalk.css',

  // WebMention (基于 IndieWeb 理念的评论系统)
  COMMENT_WEBMENTION_ENABLE: process.env.NEXT_PUBLIC_WEBMENTION_ENABLE || false,
  COMMENT_WEBMENTION_AUTH: process.env.NEXT_PUBLIC_WEBMENTION_AUTH || '',
  COMMENT_WEBMENTION_HOSTNAME: process.env.NEXT_PUBLIC_WEBMENTION_HOSTNAME || '',
  COMMENT_WEBMENTION_TWITTER_USERNAME: process.env.NEXT_PUBLIC_TWITTER_USERNAME || '',
  COMMENT_WEBMENTION_TOKEN: process.env.NEXT_PUBLIC_WEBMENTION_TOKEN || ''
}
