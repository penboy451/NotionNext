/* eslint-disable react/no-unknown-property */
/**
 * -----------------------------------------------------------------------
 * SIMPLE 主题：全站品牌视觉统一配置文件 (Universal Visual Identity)
 * -----------------------------------------------------------------------
 * 所有者: penboy451
 * 站点: www.pengboyu.com
 * 更新日期: 2026-01-30
 * 
 * 优化说明：
 * 1. 色彩大一统：将所有文章标题、交互边框、下划线统一切换为科技蓝 (#0070f3)。
 * 2. 消除视觉断层：统一页眉（Header）与页脚（Footer）的边框色深，消除灰阶差异。
 * 3. 结构化重构：针对 Notion 内容区块与系统框架进行了精细的边距与色值微调。
 * -----------------------------------------------------------------------
 */

const Style = () => {
  return <style jsx global>{`
    
    // ============================================================
    // 第一部分：全站框架统一 (Frame & Border Unification)
    // ============================================================

    /* 
       夜间模式底色同步：
       强制全站背景为纯黑，确保 TopBar、正文和 Footer 在深色模式下无缝融合。
    */
    .dark body {
        background-color: black;
    }

    /* 
       全站边框大一统逻辑：
       统一全站 Header、Nav、Footer 及容器的分割线颜色，解决视觉“断层”感。
       日间模式：使用极淡的灰 (#f3f4f6)
       夜间模式：使用深碳灰 (#1f2937)
    */
    header, nav, footer, #container-wrapper, #right-sidebar {
        border-color: #f3f4f6 !important;
    }

    .dark header, .dark nav, .dark footer, .dark #container-wrapper, .dark #right-sidebar {
        border-color: #1f2937 !important;
    }

    /* 内容保护逻辑：禁止选取文本 */
    .forbid-copy {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    /* Notion 区块边距修正 */
    .notion {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }

    // ============================================================
    // 第二部分：内容品牌化 (Content Branding)
    // ============================================================

    /* 
       文章标题颜色修正：
       - 废弃原版深青色 (#276077)。
       - 采用 penboy451 专属科技蓝 (#0070f3)。
    */
    #theme-simple .blog-item-title {
        color: #0070f3;
        transition: color 0.3s ease;
    }
  
    /* 夜间模式下的标题颜色微调，增加发光感 */
    .dark #theme-simple .blog-item-title {
        color: #3b82f6; 
    }

    // ============================================================
    // 第三部分：交互组件闭环 (Interactive Components)
    // ============================================================

    /* 导航菜单下划线动画效果 */
    #theme-simple .menu-link {
        text-decoration: none;
        background-image: linear-gradient(#0070f3, #0070f3);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 150ms ease-in-out;
    }
   
    /* 鼠标悬浮反馈 */
    #theme-simple .menu-link:hover {
        background-size: 100% 2px;
        color: #0070f3;
        cursor: pointer;
    }

  `}</style>
}

export { Style }
