import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { generateRoute } from "./generate-route";

const title = "升职加薪";
const titleTemplate = "王中阳的升职加薪之旅, 包括学习路线、知识体系";
const description = "基于 VitePress 构建的个人博客网站";
// https://vitepress.dev/reference/site-config
export default withPwa(
    defineConfig({
        lastUpdated: true,
        base: "/",
        title,
        titleTemplate,
        description,
        cleanUrls: true,
        head: [
            ["link", { rel: "icon", href: "/favicon.ico" }],
            // 引入 fancybox js 和 css 文件（图片放大预览功能）
            [
                "link",
                {
                    rel: "stylesheet",
                    href: "/css/fancybox.css",
                },
            ],
            [
                "script",
                {
                    src: "/js/fancybox.umd.js",
                },
            ],
        ],
        themeConfig: {
            siteTitle: "升职加薪之旅",
            logo: "/seal.png",
            search: {
                provider: "local",
                options: {
                    locales: {
                        zh: {
                            translations: {
                                button: {
                                    buttonText: "搜索文档",
                                    buttonAriaLabel: "搜索文档",
                                },
                                modal: {
                                    noResultsText: "无法找到相关结果",
                                    resetButtonTitle: "清除查询条件",
                                    footer: {
                                        selectText: "选择",
                                        navigateText: "切换",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            outline: "deep",
            outlineTitle: "当前页导航",
            docFooter: {
                prev: "上一篇",
                next: "下一篇",
            },
            // https://vitepress.dev/reference/default-theme-config
            nav: [
                { text: "Go语言基础篇", link: "/basic/" },
                { text: "Go语言进阶篇", link: "/advanced/" },
                { text: "高频篇", link: "/high-frequency/" },
                // { text: "精选篇", link: "/featured/" },
                // { text: "手写篇", link: "/handwritten/" },
                // { text: "原理篇", link: "/principle/" },
                { text: "面经篇", link: "/interview-experience/" },
                { text: "项目篇", link: "/project/" },
                { text: "每日一题", link: "/daily-question/" },
                // { text: "更多", link: "/more/" },
                // { text: "文档", link: "/document/" },
                { text: "工具", link: "/tool/" },
                // { text: "在线刷题", link: "/online-practice/" },
                // { text: "文章动态", link: "/article-updates/" },
            ],
            sidebar: {
                "/basic/": generateRoute("basic"),
                "/advanced/": generateRoute("advanced"),
                "/high-frequency/": generateRoute("high-frequency"),
                // "/featured/": generateRoute("featured"),
                // "/handwritten/": generateRoute("handwritten"),
                // "/principle/": generateRoute("principle"),
                "/interview-experience/": generateRoute("interview-experience"),
                "/project/": generateRoute("project"),
                "/daily-question/": generateRoute("daily-question"),
                // "/more/": generateRoute("more"),
                // "/document/": generateRoute("document"),
                "/tool/": generateRoute("tool"),
                // "/online-practice/": generateRoute("online-practice"),
                // "/article-updates/": generateRoute("article-updates"),
                "/login/": [],
            },

            socialLinks: [
                { icon: "github", link: "https://github.com/vuejs/vitepress" },
            ],
            // 页脚配置
            footer: {
                message:
                    '用心去做高质量的专业内容网站',
                copyright:
                    "© 2024 王中阳Go | wangzhongyang.com 备案号 :  京ICP备18040650号-3",
            },
            // github 编辑链接
            // editLink: {
            //     pattern:
            //         "https://github.com/clin211/clin-notes/blob/main/src/.vitepress/config.mts",
            //     text: "在 GitHub 上编辑此页",
            // },
            // 最后更新时间的显示文本
            lastUpdatedText: "最后一次更新于",
        },
        pwa: {
            outDir: ".vitepress/dist", // 输出目录
            registerType: "autoUpdate", // 注册类型为自动更新
            includeManifestIcons: false, // 不包含清单图标
            manifest: {
                id: "/", // 清单 ID
                name: title, // 应用名称
                short_name: title, // 应用的短名称
                description: description, // 应用的描述
                theme_color: "#ffffff", // 主题颜色
                icons: [
                    {
                        src: "/images/pwa-120x120.png", // 图标路径
                        sizes: "120x120", // 图标尺寸
                        type: "image/png", // 图标类型
                    },
                    {
                        src: "/images/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/images/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
                        handler: "CacheFirst", // 缓存优先策略
                        options: {
                            cacheName: "google-fonts-cache", // 缓存名称
                            expiration: {
                                maxEntries: 10, // 最大缓存条目数
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
                            },
                            cacheableResponse: {
                                statuses: [0, 200], // 缓存的响应状态码
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
                        handler: "CacheFirst", // 缓存优先策略
                        options: {
                            cacheName: "gstatic-fonts-cache", // 缓存名称
                            expiration: {
                                maxEntries: 10, // 最大缓存条目数
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
                            },
                            cacheableResponse: {
                                statuses: [0, 200], // 缓存的响应状态码
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
                        handler: "NetworkFirst", // 网络优先策略
                        options: {
                            cacheName: "jsdelivr-images-cache", // 缓存名称
                            expiration: {
                                maxEntries: 10, // 最大缓存条目数
                                maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
                            },
                            cacheableResponse: {
                                statuses: [0, 200], // 缓存的响应状态码
                            },
                        },
                    },
                ],
            },
        },
    })
);
