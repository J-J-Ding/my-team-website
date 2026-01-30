# 项目结构说明

## 📁 完整目录结构

```
MyWeb/
├── index.html                      # 主页面文件
├── styles.css                      # 全局样式文件
├── script.js                       # JavaScript 交互逻辑
├── README.md                       # 项目说明文档
├── PROJECT_STRUCTURE.md            # 项目结构说明（本文件）
├── .gitignore                      # Git 忽略文件
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 自动部署配置
└── data/                           # 数据文件夹
    ├── config.json                 # 网站全局配置
    ├── README.md                   # 数据文件夹说明
    ├── team/                       # 团队相关数据
    │   └── members.json            # 团队成员信息
    ├── services/                   # 服务相关数据
    │   └── services.json           # 服务项目信息
    ├── about/                      # 关于我们相关数据
    │   └── company.json            # 公司信息
    └── contact/                    # 联系方式相关数据
        └── info.json               # 联系信息
```

## 📄 文件说明

### 核心文件

#### index.html
- 网站的主 HTML 文件
- 包含所有页面的结构和内容框架
- 通过 JavaScript 动态加载和渲染数据

#### styles.css
- 全局样式定义
- 响应式设计
- 动画效果
- 主题颜色配置

#### script.js
- 页面交互逻辑
- 数据加载和渲染
- 搜索功能实现
- 动画和效果控制

### 配置文件

#### README.md
- 项目介绍
- 部署指南
- 使用说明
- 功能特性

#### PROJECT_STRUCTURE.md
- 项目结构详细说明
- 文件功能描述
- 开发指南

#### .gitignore
- Git 忽略规则
- 排除临时文件和系统文件

#### .github/workflows/deploy.yml
- GitHub Actions 配置
- 自动部署到 GitHub Pages
- 工作流定义

### 数据文件

#### data/config.json
网站全局配置：
- 网站标题、描述、关键词
- 导航菜单配置
- 主题颜色
- 搜索配置

#### data/team/members.json
团队成员数据：
- 成员基本信息（姓名、职位、描述）
- 技能列表
- 社交媒体链接
- 工作经验

#### data/services/services.json
服务项目数据：
- 服务名称和图标
- 服务描述
- 功能特点
- 服务分类

#### data/about/company.json
公司信息：
- 公司基本信息
- 使命、愿景、价值观
- 成就统计
- 服务行业
- 亮点介绍

#### data/contact/info.json
联系信息：
- 公司地址
- 电子邮箱
- 联系电话
- 官方网站
- 工作时间
- 社交媒体账号

## 🔄 数据流向

```
JSON 数据文件
    ↓
loadData() 加载
    ↓
window.appData 全局存储
    ↓
renderXxx() 渲染函数
    ↓
更新页面 DOM
```

## 🎯 功能模块

### 1. 导航栏
- 响应式设计
- 移动端折叠菜单
- 搜索框集成

### 2. 首页 Hero
- 大标题展示
- 引导按钮
- 渐变背景

### 3. 关于我们
- 公司介绍
- 动态数字统计
- 自动数字动画

### 4. 团队成员
- 卡片式布局
- 技能标签展示
- 社交媒体链接
- 悬停效果

### 5. 服务项目
- 网格布局
- 图标展示
- 功能特点标签
- 分类显示

### 6. 联系我们
- 联系信息展示
- 留言表单
- 图标化展示

### 7. 搜索功能
- 全站搜索
- 多关键词匹配
- 结果高亮
- 分类显示
- 自动跳转

## 🚀 开发工作流

### 修改内容

1. **修改团队信息**
   - 编辑 `data/team/members.json`
   - 刷新页面自动更新

2. **修改服务项目**
   - 编辑 `data/services/services.json`
   - 刷新页面自动更新

3. **修改公司信息**
   - 编辑 `data/about/company.json`
   - 刷新页面自动更新

4. **修改联系方式**
   - 编辑 `data/contact/info.json`
   - 刷新页面自动更新

5. **修改网站配置**
   - 编辑 `data/config.json`
   - 刷新页面自动更新

### 添加新功能

1. 在 `data/` 对应文件夹创建新的 JSON 文件
2. 在 `script.js` 中添加数据加载逻辑
3. 创建渲染函数更新页面
4. 在 `styles.css` 中添加样式

## 📱 响应式断点

- **桌面端**: > 1024px
- **平板端**: 768px - 1024px
- **移动端**: < 768px

## 🔧 技术栈

- **HTML5**: 语义化标签
- **CSS3**: Flexbox、Grid、动画
- **JavaScript ES6+**: 异步、模块化
- **Fetch API**: 数据加载
- **Intersection Observer**: 滚动动画

## 📦 部署

项目已配置 GitHub Actions，推送代码到 GitHub 后会自动部署到 GitHub Pages。

## 🎨 自定义主题

在 `data/config.json` 中修改主题颜色：

```json
{
  "theme": {
    "primaryColor": "#2563eb",
    "secondaryColor": "#1e40af",
    "accentColor": "#3b82f6"
  }
}
```

## 📝 注意事项

1. 修改 JSON 文件时确保格式正确
2. 图片资源可放在 `assets/images/` 文件夹
3. 代码遵循统一的编码规范
4. 定期提交代码到 Git

## 🔗 相关文档

- [README.md](./README.md) - 项目说明
- [data/README.md](./data/README.md) - 数据文件夹说明
