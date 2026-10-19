# tfiyw-wei · 个人作品集

[打开网站](https://tfiyw-wei.github.io/personal-website/) · [GitHub](https://github.com/tfiyw-wei) · [小红书](https://www.xiaohongshu.com/user/profile/5b55ea34f7e8b907ecbd300a) · [邮箱](mailto:179369971@qq.com)

展示 AI 产品探索、交互原型与网页作品，包含「关于我」「我的作品」「保持联系」三个页面。

## 使用的开源模板

直接采用 [Ryan Balieiro / React Portfolio](https://github.com/ryanbalieiro/react-portfolio-template) 的完整 React 组件、侧栏、内容面板、作品卡片和移动端导航。

- 上游版本：`81f0278a2fe9d7387c49b9fc22d1e293be9f7213`（v2.0.3）。
- [MIT LICENSE](./LICENSE)，Copyright (c) 2025 RYAN BALIEIRO。
- 个性化修改：中文资料、实际作品、灰蓝浅色主题、系统字体、联系入口与键盘操作支持。
- 移除了示例履历、推荐语、联系表单服务及访问统计上报；没有提交邮件的后端。
- 页面中的模板来源链接及源文件原作者注释保留。

## 本地运行与构建

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite 的站点路径为 `/personal-website/`。生产文件生成到 `docs/`，GitHub Pages 从 `main` 分支的 `/docs` 发布。修改内容后运行 `npm run build`，将源码与 `docs/` 一并提交。

## 内容维护

- `public/data/profile.json`：头像、称呼和关注方向。
- `public/data/sections/cover.json`：介绍与探索方向。
- `public/data/sections/portfolio.json`：作品、在线体验与源码入口。
- `public/data/sections/contact.json`：邮箱、小红书和 GitHub。
- `public/data/settings.json`：默认浅色主题与中文设置。
- `src/styles/themes/_variables-theme-light.scss`：浅色主题配色。

## 作品说明

[饿了么概念交互作品](https://github.com/tfiyw-wei/eleme-motion-landing-page) 是非官方概念原型。点餐助手使用本地示例菜单与规则筛选，未接入真实 AI 模型、交易或配送服务。

[原个人介绍模板](https://tfiyw-wei.github.io/personal-website/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D.html) 源文件保存在 `public/个人介绍.html`，原有编辑、本地保存与导出功能保持可用。模板中的占位资料供使用者填写。
