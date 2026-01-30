# Data 文件夹结构说明

本文件夹存储项目的所有数据，采用模块化的组织方式。

## 📁 目录结构

```
data/
├── config.json          # 网站配置信息
├── team/                # 团队相关数据
│   └── members.json     # 团队成员信息
├── services/            # 服务相关数据
│   └── services.json    # 服务项目信息
├── about/               # 关于我们相关数据
│   └── company.json     # 公司信息
└── contact/             # 联系方式相关数据
    └── info.json        # 联系信息
```

## 📄 文件说明

### config.json
网站全局配置，包含：
- 网站标题、描述、关键词
- 导航菜单配置
- 主题颜色配置
- 搜索功能配置

### team/members.json
团队成员数据，每个成员包含：
- id: 唯一标识
- name: 姓名
- role: 职位
- description: 个人描述
- avatar: 头像（姓氏）
- social: 社交媒体链接
- skills: 技能列表
- experience: 工作经验

### services/services.json
服务项目数据，每个服务包含：
- id: 唯一标识
- name: 服务名称
- icon: 图标（emoji）
- description: 服务描述
- features: 功能特点列表
- category: 服务分类

### about/company.json
公司信息，包含：
- company: 公司名称、成立时间、使命、愿景、价值观
- achievements: 成就统计
- industries: 服务行业
- highlights: 亮点介绍

### contact/info.json
联系信息，包含：
- 公司基本信息
- 详细联系方式（地址、邮箱、电话、网站）
- 工作时间
- 社交媒体账号

## 🔄 数据更新

更新数据文件后，JavaScript 会自动加载最新数据，无需重启服务器。

## 📊 数据格式

所有数据文件采用 JSON 格式，确保格式正确后保存。

## 🔧 扩展指南

如需添加新数据：
1. 在对应文件夹创建新的 JSON 文件
2. 在 `script.js` 中添加加载逻辑
3. 更新相关 UI 显示代码
