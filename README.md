# tfiyw-wei · 个人作品集

tfiyw-wei 的浅色连续作品集，围绕 **AI 产品探索与交互原型** 展示真实作品、探索清单与联系方式。顶部导航连接同一长页中的各个区域，作品以大图与介绍纵向展开。

**在线访问：[tfiyw-wei.github.io/personal-website](https://tfiyw-wei.github.io/personal-website/)**

## 页面与交互

- 关于：大标题、简短介绍与个人定位。
- 作品：两个真实作品，展示预览、功能说明、在线体验和源码入口。
- 探索：从观察场景到体验迭代的四项实践清单。
- 联系：小红书、GitHub、邮件入口与复制邮箱。
- 顶部导航随滚动标记当前区域，支持锚点链接、浏览器前进/后退、键盘操作与减少动画偏好。
- `⌘/Ctrl + K` 打开快速导航，输入关键词筛选入口，方向键选择，`Enter` 前往，`Esc` 关闭。
- 主要内容直接写在 HTML 中，未启用 JavaScript 时仍可阅读并使用普通链接。

## 本地运行

纯 HTML、CSS、JavaScript，无构建步骤和第三方运行时依赖。

```sh
python3 -m http.server 8877
```

访问 `http://localhost:8877/`。

```text
index.html              连续作品集入口
assets/style.css        浅色长页视觉与响应式布局
assets/app.js           锚点导航、滚动定位、快捷导航、邮箱复制
assets/avatar.png       tfiyw-wei 的公开 GitHub 头像
assets/eleme-cover.jpg   已有品牌概念作品的封面
assets/intro-cover.png   可编辑个人介绍模板的预览
assets/favicon.svg      网站图标
个人介绍.html             保留的可编辑个人介绍页模板
licenses/vcard-MIT.txt   历史导航代码来源的 MIT 许可全文
```

## 原个人介绍页

[可编辑模板](https://tfiyw-wei.github.io/personal-website/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D.html) 保留原有的资料编辑、浏览器本地保存和 HTML 导出功能。模板中的占位内容供使用者填写，不作为站主履历。

## 来源与致谢

早期导航代码以 [codewithsadee/vcard-personal-portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) 为基础，参考版本 `927f09a6ef894a24cc8aef7a2e51f8e93ac306f7`。当前版本仅保留少量历史导航代码与 `data-page` / `data-nav-link` 标记约定，并改为连续长页的锚点导航。vCard 不是当前页面的视觉模板；本站的顶部导航、大标题、作品排版与浅色样式另行实现。

原导航代码作者为 codewithsadee，Copyright (c) 2022；[MIT 许可全文](./licenses/vcard-MIT.txt) 及相关源文件声明随代码保留。

封面来自自己的 [eleme-motion-landing-page](https://github.com/tfiyw-wei/eleme-motion-landing-page) 项目。该作品是非官方品牌概念，点餐原型使用本地菜单与规则，未接入真实 AI 模型或交易系统。

## 发布

GitHub Pages 使用 `main` 分支根目录，无需构建；`.nojekyll` 禁用 Jekyll 处理。所有站内资源使用相对地址，兼容 `/personal-website/` 项目路径。
