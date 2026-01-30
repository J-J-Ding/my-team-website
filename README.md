# 团队网页展示项目

一个现代化的团队网页展示项目，可以通过 GitHub Pages 直接部署和访问。

## 项目特点

- ✨ 现代化设计，响应式布局
- 📱 完美适配移动端和桌面端
- 🎨 精美的动画效果和交互体验
- 🚀 纯静态页面，无需后端
- 🌐 可直接部署到 GitHub Pages

## 项目结构

```
MyWeb/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # JavaScript 交互
└── README.md       # 项目说明
```

## 本地运行

1. 克隆或下载项目到本地
2. 直接用浏览器打开 `index.html` 文件
3. 或者使用本地服务器（推荐）：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve

# 使用 VS Code Live Server 插件
```

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions（推荐）

1. **创建 GitHub 仓库**

   在 GitHub 上创建一个新仓库，例如 `my-team-website`

2. **上传代码**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/my-team-website.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**

   - 进入仓库的 `Settings` 页面
   - 左侧菜单选择 `Pages`
   - 在 `Source` 选项中选择 `GitHub Actions`

4. **创建 GitHub Actions 工作流**

   在仓库中创建 `.github/workflows/deploy.yml` 文件：

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Pages
           uses: actions/configure-pages@v5

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: '.'

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

5. **提交并推送**

   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

6. **访问网站**

   推送后，GitHub Actions 会自动部署，几分钟后可以通过以下地址访问：
   ```
   https://你的用户名.github.io/my-team-website/
   ```

### 方法二：使用 gh-pages 分支

1. **安装 gh-pages 工具**

   ```bash
   npm install -g gh-pages
   ```

2. **部署到 GitHub Pages**

   ```bash
   gh-pages -d . -m "Deploy to GitHub Pages"
   ```

3. **访问网站**

   ```
   https://你的用户名.github.io/
   ```

### 方法三：手动配置（最简单）

1. **上传代码到 GitHub 仓库**

2. **启用 GitHub Pages**

   - 进入仓库的 `Settings` 页面
   - 左侧菜单选择 `Pages`
   - 在 `Source` 选项中选择 `Deploy from a branch`
   - 选择 `main` 分支和 `/(root)` 目录
   - 点击 `Save`

3. **访问网站**

   ```
   https://你的用户名.github.io/仓库名/
   ```

## 自定义内容

### 修改团队信息

在 `index.html` 中找到团队卡片部分，修改姓名、职位、描述等信息：

```html
<div class="team-card">
    <div class="team-image">
        <div class="placeholder-avatar">张</div>
    </div>
    <div class="team-info">
        <h3>张伟</h3>  <!-- 修改姓名 -->
        <p class="team-role">创始人 & CEO</p>  <!-- 修改职位 -->
        <p class="team-desc">拥有10年互联网行业经验...</p>  <!-- 修改描述 -->
    </div>
</div>
```

### 修改样式

在 `styles.css` 中可以修改：
- `--primary-color`: 主色调
- `--secondary-color`: 次要色调
- 字体、间距等

### 修改联系信息

在 `index.html` 的联系部分修改：
- 地址
- 邮箱
- 电话
- 网址

## 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式和动画
- **JavaScript (ES6+)**: 交互功能
- **GitHub Actions**: 自动部署

## 功能特性

- 🎯 导航栏（支持移动端折叠菜单）
- 🏠 Hero 区域展示
- 👥 团队成员展示
- 📈 动态数字统计
- 💼 服务项目展示
- 📬 联系表单
- 📱 完全响应式设计
- ✨ 平滑滚动和动画效果

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

创建时间：2024年
