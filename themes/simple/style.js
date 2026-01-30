/* eslint-disable react/no-unknown-property */
/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题专用样式配置文件 (Theme-Specific Custom Styles)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 更新日期: 2026-01-30
 * 
 * 配置文件说明：
 * 1. 本文件用于定义 Simple 主题特有的 CSS 样式，覆盖默认的组件外观。
 * 2. 采用了“科技深蓝”主题色，取代了原版的红色。
 * 3. 注意：本文件采用 CSS-in-JS (Styled JSX) 语法，不支持 Tailwind 的 @apply 指令。
 * -----------------------------------------------------------------------
 */

const Style = () => {
  return <style jsx global>{`
    
    // ============================================================
    // 第一部分：全局基础样式 (Global Base Styles)
    // ============================================================

    /* 夜间模式下的正文底色 */
    .dark body {
        background-color: black;
    }

    /* 内容保护逻辑：开启后文本将无法被鼠标选中 */
    .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    /* Notion 内容区块边距微调，确保排版紧凑 */
    .notion {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }

    // ============================================================
    // 第二部分：文章列表样式 (Blog List Styles)
    // ============================================================

    /* 首页文章列表标题颜色 - 保持原有的稳重深青色 */
    #theme-simple .blog-item-title {
        color: #276077;
    }
  
    /* 夜间模式下的标题颜色 - 切换为柔和的浅灰色 */
    .dark #theme-simple .blog-item-title {
        color: #d1d5db;
    }

    // ============================================================
    // 第三部分：交互特效配置 (Interactive Effects)
    // 已将原本的红色 (#dd3333) 统一更换为科技蓝 (#0070f3)
    // ============================================================

    /* 顶部菜单下划线动画效果 */
    #theme-simple .menu-link {
        text-decoration: none;
        /* 下划线颜色：采用 penboy451 专属科技蓝 */
        background-image: linear-gradient(#0070f3, #0070f3);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        /* 过渡动画：100ms 线性滑入滑出 */
        transition: background-size 100ms ease-in-out;
    }
   
    /* 鼠标悬浮时的激活状态 */
    #theme-simple .menu-link:hover {
        background-size: 100% 2px; /* 下划线完全展开 */
        color: #0070f3;           /* 文字同步变蓝 */
        cursor: pointer;
    }

  `}</style>
}

export { Style }
