/**
 * -----------------------------------------------------------------------
 * NotionNext 第三方高级插件配置文件 (Extended Plugins Configuration)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于集成搜索增强 (Algolia)、AI 内容摘要以及邮件订阅服务。
 * 2. 安全警告：所有涉及 "KEY" 或 "SECRET" 的内容，强烈建议填入 Vercel 环境变量，
 *    不要直接写在代码中，以防您的 API 额度被他人盗用。
 * -----------------------------------------------------------------------
 */

module.exports = {
  // =====================================================================
  // 第一部分：Algolia 全文搜索 (高性能搜索增强)
  // 官网: https://www.algolia.com/
  // =====================================================================
  
  // Algolia 应用 ID
  ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || null,

  /**
   * Algolia 管理权限 Key (Admin API Key)
   * 危险：此 Key 拥有写入权限。绝对不要直接写在这里！请务必填入 Vercel 环境变量。
   */
  ALGOLIA_ADMIN_APP_KEY: process.env.ALGOLIA_ADMIN_APP_KEY || null,

  // Algolia 仅搜索权限 Key (Search-only API Key)
  ALGOLIA_SEARCH_ONLY_APP_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_APP_KEY || null,

  // Algolia 索引名称 (Index Name)：对应您在 Algolia 后台创建的数据库名
  ALGOLIA_INDEX: process.env.NEXT_PUBLIC_ALGOLIA_INDEX || null,

  // =====================================================================
  // 第二部分：AI 文章摘要生成 (通用接口)
  // 用于通过 API 自动生成文章的简短摘要
  // =====================================================================

  // AI 摘要服务 API 地址 (支持 OpenAI 格式或转发地址)
  AI_SUMMARY_API: process.env.AI_SUMMARY_API || '',

  // AI 服务密钥 (API Key)
  AI_SUMMARY_KEY: process.env.AI_SUMMARY_KEY || '',

  // AI 摘要缓存时间 (单位：秒)：默认 1800 秒，减少重复请求消耗额度
  AI_SUMMARY_CACHE_TIME: process.env.AI_SUMMARY_CACHE_TIME || 1800,

  // AI 处理的单篇文章字数上限：超过此长度的部分将被截断以节省 Token
  AI_SUMMARY_WORD_LIMIT: process.env.AI_SUMMARY_WORD_LIMIT || 1000,

  // =====================================================================
  // 第三部分：TianliGPT 文章摘要挂件 (特定 AI 组件)
  // 这是一个开箱即用的 AI 摘要视觉组件
  // =====================================================================

  /**
   * TianliGPT 样式文件 (CSS)
   * 采用标准 CDN 链接，支撑 AI 摘要栏的视觉呈现。
   */
  TianliGPT_CSS:
    process.env.NEXT_PUBLIC_TIANLI_GPT_CSS ||
    'https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.css',

  /**
   * TianliGPT 逻辑脚本 (JS)
   */
  TianliGPT_JS:
    process.env.NEXT_PUBLIC_TIANLI_GPT_JS ||
    'https://cdn1.tianli0.top/gh/zhheo/Post-Abstract-AI@0.15.2/tianli_gpt.js',

  /**
   * TianliGPT 服务密钥
   * 获取：需在 Tianli 平台申请对应的站点 Key 才能激活摘要功能。
   */
  TianliGPT_KEY: process.env.NEXT_PUBLIC_TIANLI_GPT_KEY || '',

  // =====================================================================
  // 第四部分：邮件订阅服务 (Mailchimp)
  // 用于收集读者邮箱并批量发送订阅通知
  // =====================================================================

  // Mailchimp 客户列表 ID (Audience ID)
  MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID || null,

  // Mailchimp API 密钥
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY || null
}
