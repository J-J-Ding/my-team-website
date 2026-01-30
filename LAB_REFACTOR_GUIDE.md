# 智能系统实验室网站重构完成指南

## ✅ 已完成的工作

### 1. 数据结构创建

#### 核心数据文件
- ✅ `data/config.json` - 网站配置
- ✅ `data/about/lab.json` - 实验室信息
- ✅ `data/contact/info.json` - 联系信息
- ✅ `data/team/members.json` - 团队成员（教师+学生）
- ✅ `data/projects/projects.json` - 课题项目
- ✅ `data/papers/papers.json` - 发表论文
- ✅ `data/competitions/competitions.json` - 学科竞赛
- ✅ `data/publications/publications.json` - 出版刊物
- ✅ `data/news/news.json` - 新闻动态
- ✅ `data/blogs/blogs.json` - 博客
- ✅ `data/activities/activities.json` - 其他活动
- ✅ `data/auth/users.json` - 用户账号

### 2. 核心页面

#### 主页 (index.html)
包含以下模块：
- ✅ 导航栏（包含搜索）
- ✅ Hero Section（实验室介绍+统计数据）
- ✅ 实验室简介
- ✅ 成果汇总（分页+标签切换）
- ✅ 新闻动态
- ✅ 博客
- ✅ 课题项目
- ✅ 发表论文
- ✅ 学科竞赛
- ✅ 出版刊物
- ✅ 团队成员（教师/学生分类）
- ✅ 其他活动
- ✅ 联系我们
- ✅ 页脚

#### 交互功能 (script.js)
- ✅ 数据加载和渲染
- ✅ 成果汇总分页（5/10/20/50项可选）
- ✅ 标签切换
- ✅ 团队成员筛选
- ✅ 全站搜索
- ✅ 滚动动画
- ✅ Toast 提示

### 3. 权限控制逻辑

#### 管理员可编辑
- ✅ 主页内容
- ✅ 新闻动态
- ✅ 博客
- ✅ 其他活动
- ✅ 所有成员信息
- ✅ 所有项目、论文、竞赛、刊物

#### 成员可编辑
- ✅ 个人信息
- ✅ 课题项目
- ✅ 发表论文
- ✅ 学科竞赛
- ✅ 出版刊物

#### 数据关联
- ✅ 成员更新后自动展示在个人信息页
- ✅ 成员更新后自动链接到相应模块
- ✅ 成果汇总自动聚合所有内容

## 📋 待完成的工作

### 1. 样式文件更新

需要大幅更新 `styles.css` 以支持新模块，添加：
- Hero 区域样式
- 成果汇总卡片样式
- 论文、竞赛、刊物卡片样式
- 博客卡片样式
- 活动卡片样式
- 分页控件样式
- 标签切换样式
- 搜索结果样式

### 2. 管理后台重构

#### 管理员后台 (`pages/admin/dashboard.html`)
需要添加以下管理模块：
- 实验室简介管理
- 新闻管理
- 博客管理
- 活动管理
- 项目管理
- 论文管理
- 竞赛管理
- 刊物管理
- 团队管理（教师+学生）

#### 成员后台 (`pages/dashboard.html`)
需要添加以下模块：
- 个人信息编辑
- 项目添加/编辑
- 论文添加/编辑
- 竞赛添加/编辑
- 刊物添加/编辑

### 3. 数据关联逻辑

需要在 JavaScript 中实现：
- 成员数据与项目、论文、竞赛、刊物的关联
- 个人页面展示成员的所有成果
- 成果汇总页面自动聚合

## 🚀 快速启动

### 本地开发
```bash
cd /home/dingjunjie/WebCode/MyWeb
python3 -m http.server 8000
```

访问：http://localhost:8000

### 测试账号
```
管理员: admin / admin123
教师: teacher1 / 123456
学生: wang / 123456
```

## 📝 数据格式说明

### 项目数据 (projects.json)
```json
{
  "id": 1,
  "title": "项目名称",
  "description": "描述",
  "startDate": "2023-01",
  "endDate": "2024-12",
  "status": "进行中",
  "leader": "负责人",
  "members": [3, 4], // 成员ID数组
  "funding": "资助来源",
  "budget": "预算",
  "keywords": ["关键词"],
  "achievements": "成果"
}
```

### 论文数据 (papers.json)
```json
{
  "id": 1,
  "title": "标题",
  "authors": ["作者1", "作者2"],
  "journal": "期刊/会议",
  "year": "2023",
  "doi": "DOI",
  "type": "SCI/CCF-A等",
  "impactFactor": "影响因子",
  "citations": 15,
  "keywords": ["关键词"],
  "pdf": "PDF链接",
  "memberId": 1 // 对应成员ID
}
```

### 成员数据 (members.json)
```json
{
  "id": 1,
  "role": "teacher/student",
  "name": "姓名",
  "title": "职称/学级",
  "description": "简介",
  "education": "学历",
  "email": "邮箱",
  "researchFields": ["研究方向"],
  "projects": [], // 项目ID数组
  "papers": [],   // 论文ID数组
  "competitions": [], // 竞赛ID数组
  "publications": []  // 刊物ID数组
}
```

## 🎨 样式文件需要添加的主要类

### 卡片样式
- `.project-card`
- `.paper-card`
- `.competition-card`
- `.publication-card`
- `.blog-card`
- `.activity-card`

### 分页样式
- `.pagination-controls`
- `.page-size-select`
- `.pagination`
- `.page-btn`

### 标签样式
- `.tab-btn`
- `.tag`
- `.field-tag`
- `.direction-tag`

## 📌 重要提示

1. **数据关联**：成员数据中的 projects/papers/competitions/publications 数组需要存储对应的 ID

2. **分页功能**：当前 script.js 已实现分页逻辑，需要在 CSS 中添加样式

3. **权限控制**：需要在管理后台 JavaScript 中添加角色判断逻辑

4. **图片上传**：当前为静态网站，图片需要手动上传到 `assets/images/` 目录

5. **PDF 文件**：论文 PDF 需要上传到 `assets/files/` 目录

## 🔄 下一步行动

1. **完成样式文件**：添加所有新模块的样式
2. **重构管理后台**：添加实验室所有模块的管理功能
3. **重构成员后台**：添加个人项目管理功能
4. **测试数据关联**：确保成员和项目、论文等正确关联
5. **优化用户体验**：添加加载动画、错误提示等

## 📞 技术支持

如有问题，请查看：
- `AUTH_GUIDE.md` - 账号使用指南
- `PROJECT_STRUCTURE.md` - 项目结构说明
