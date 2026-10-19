# WEI OS · 个人作品集

tfiyw-wei 的浅色个人工作台，围绕 **AI 产品探索与交互原型** 展示作品、探索方法、文章与联系方式。沿用原有 `#eff3f7` 浅色背景，用侧栏导航和单个内容窗口组织页面。

**在线访问：[tfiyw-wei.github.io/personal-website](https://tfiyw-wei.github.io/personal-website/)**

## 页面与交互

- 关于（`#about`）：个人介绍、从想法到作品的创作图，以及两个作品的预览入口。
- 作品（`#projects`）：两个真实作品，支持分类筛选、在线体验和源码入口。
- 探索方法（`#process`）：从观察场景到体验迭代的四步路径。
- 记录与分享（`#notes`）：三篇已发表公众号文章，链接与 GitHub 个人主页保持一致。
- 联系（`#contact`）：小红书、GitHub、邮件入口与复制邮箱。
- 支持 hash 深链接、浏览器前进/后退、键盘导航和减少动画偏好。
- `⌘/Ctrl + K` 打开快速导航，`Esc` 关闭；顶栏显示浏览者设备的本地时间。
- 移除专注视图切换和终端底栏，让个人介绍与作品展示拥有更多空间。

## 文章

- [搜网页也要单独付钱了：DeepSeek 开放 Search & Fetch，转型 AI PM 先看懂「三本账」](https://mp.weixin.qq.com/s/1QPp3ev-FH5JiAMjxhJjRA)
- [上下文工程：AI 每一步应该看到什么？](https://mp.weixin.qq.com/s/94f1V3ZTtwMpS9fwgXqq4A)
- [一篇文章搞懂 RSI：AI 如何改进自己的改进能力](https://mp.weixin.qq.com/s/5o0eMq0vjONWuV_TmAa5gQ)

## 本地运行

纯 HTML、CSS、JavaScript，无构建步骤和第三方运行时依赖。

```sh
python3 -m http.server 8877
```

访问 `http://localhost:8877/`。

```text
index.html              新个人站入口
assets/style.css        浅色工作台视觉与响应式布局
assets/app.js           路由、筛选、快捷导航、邮箱复制、本地时钟
assets/avatar.png       tfiyw-wei 的公开 GitHub 头像
assets/eleme-cover.jpg   已有品牌概念作品的封面
assets/favicon.svg      WEI OS 图标
个人介绍.html             保留的可编辑个人介绍页模板
licenses/vcard-MIT.txt   原模板的 MIT 许可全文
```

## 原个人介绍页

[可编辑模板](https://tfiyw-wei.github.io/personal-website/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D.html) 保留原有的资料编辑、浏览器本地保存和 HTML 导出功能。模板中的占位内容供使用者填写，不作为站主履历。

## 来源与致谢

改造基础：[codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)，参考版本 `927f09a6ef894a24cc8aef7a2e51f8e93ac306f7`。保留并改造其 `data-page` / `data-nav-link` 分页及 `data-filter-item` 分类筛选模式，移除未使用的评价、客户、简历与表单模块。原作者为 codewithsadee，Copyright (c) 2022；[MIT 许可全文](./licenses/vcard-MIT.txt) 随代码保留。

参考用户提供的个人工作台截图重构内容布局：侧栏、单个内容窗口、个人介绍、创作图和作品预览。背景保持原有浅色，内容使用 tfiyw-wei 自己的作品、文章与联系方式。

封面来自自己的 [eleme-motion-landing-page](https://github.com/tfiyw-wei/eleme-motion-landing-page) 项目。该作品是非官方品牌概念，点餐原型使用本地菜单与规则，未接入真实 AI 模型或交易系统。

## 发布

GitHub Pages 使用 `main` 分支根目录，无需构建；`.nojekyll` 禁用 Jekyll 处理。所有站内资源使用相对地址，兼容 `/personal-website/` 项目路径。
