# WEI OS · 个人作品集

tfiyw-wei 的浅色桌面风格个人网站，围绕 **AI 产品探索与交互原型** 展示作品、探索方法与联系方式。

**在线访问：[tfiyw-wei.github.io/personal-website](https://tfiyw-wei.github.io/personal-website/)**

## 页面与交互

- 关于：个人介绍与从场景到原型的探索流程。
- 作品：两个真实作品，支持分类筛选、在线体验和源码入口。
- 探索方法：从观察场景到体验迭代的四步路径。
- 联系：小红书、GitHub、邮件入口与复制邮箱。
- 支持 hash 深链接、浏览器前进/后退、键盘导航、减少动画偏好。
- `⌘/Ctrl + K` 打开快速导航；窗口右上角可切换专注视图，`Esc` 退出。

## 本地运行

纯 HTML、CSS、JavaScript，无构建步骤和第三方运行时依赖。

```sh
python3 -m http.server 8877
```

访问 `http://localhost:8877/`。

```text
index.html              新个人站入口
assets/style.css        浅色 OS 视觉与响应式布局
assets/app.js           路由、筛选、快捷导航、邮箱复制
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

视觉方向参考用户提供的 [HiWhaleW 个人站](https://hiwhalew.github.io/) 截图：浅色桌面、侧栏导航、窗口与流程图。本项目重新实现布局与视觉，没有复制对方源码、照片、个人介绍、经历或作品。

封面来自自己的 [eleme-motion-landing-page](https://github.com/tfiyw-wei/eleme-motion-landing-page) 项目。该作品是非官方品牌概念，点餐原型使用本地菜单与规则，未接入真实 AI 模型或交易系统。

## 发布

GitHub Pages 使用 `main` 分支根目录，无需构建；`.nojekyll` 禁用 Jekyll 处理。所有站内资源使用相对地址，兼容 `/personal-website/` 项目路径。

## 验证

- 320、390、768、1024、1440 像素宽度的四个页面均无横向溢出。
- 已验证作品筛选、快捷导航搜索、邮件链接、复制邮箱与浏览器后退。
- 保留原始个人介绍页，使用新窗口打开以避免丢失编辑状态。
