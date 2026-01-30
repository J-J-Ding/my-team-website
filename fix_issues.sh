#!/bin/bash

# 修复智能系统实验室网站的问题

echo "开始修复智能系统实验室网站..."

# 1. 检查并修复数据文件
echo "1. 检查数据文件..."

# 确保所有数据文件存在
mkdir -p data/{about,team,projects,papers,competitions,publications,news,blogs,activities,contact,auth}

# 检查并修复用户数据
if [ ! -f data/auth/users.json ]; then
    echo "创建用户数据文件..."
    cat > data/auth/users.json << EOF
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin123",
      "role": "admin",
      "name": "张教授",
      "email": "admin@lab.edu.cn",
      "avatar": "张",
      "roleType": "teacher",
      "department": "计算机科学",
      "position": "教授",
      "experience": "15年",
      "specialties": ["人工智能", "机器学习"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "username": "teacher1",
      "password": "123456",
      "role": "member",
      "name": "李教授",
      "email": "lisi@lab.edu.cn",
      "avatar": "李",
      "roleType": "teacher",
      "department": "计算机科学",
      "position": "副教授",
      "experience": "12年",
      "specialties": ["计算机视觉", "深度学习"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 3,
      "username": "wang",
      "password": "123456",
      "role": "member",
      "name": "王强",
      "email": "wangqiang@lab.edu.cn",
      "avatar": "王",
      "roleType": "student",
      "grade": "博士",
      "major": "人工智能",
      "experience": "5年",
      "specialties": ["自然语言处理", "数据挖掘"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 4,
      "username": "zhaomin",
      "password": "123456",
      "role": "member",
      "name": "赵敏",
      "email": "zhaomin@lab.edu.cn",
      "avatar": "赵",
      "roleType": "student",
      "grade": "硕士",
      "major": "机器学习",
      "experience": "3年",
      "specialties": ["强化学习", "推荐系统"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 5,
      "username": "liuyang",
      "password": "123456",
      "role": "member",
      "name": "刘洋",
      "email": "liuyang@lab.edu.cn",
      "avatar": "刘",
      "roleType": "student",
      "grade": "硕士",
      "major": "计算机视觉",
      "experience": "4年",
      "specialties": ["目标检测", "图像识别"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 6,
      "username": "chenjing",
      "password": "123456",
      "role": "member",
      "name": "陈静",
      "email": "chenjing@lab.edu.cn",
      "avatar": "陈",
      "roleType": "student",
      "grade": "本科",
      "major": "数据科学",
      "experience": "2年",
      "specialties": ["数据分析", "可视化"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
EOF
fi

# 检查并修复实验室数据
if [ ! -f data/about/lab.json ]; then
    echo "创建实验室数据文件..."
    cat > data/about/lab.json << EOF
{
  "lab": {
    "name": "智能系统实验室",
    "englishName": "Intelligent Systems Laboratory",
    "founded": "2018",
    "affiliation": "某某大学",
    "story": "智能系统实验室成立于2018年，致力于人工智能、机器学习、智能系统等前沿技术的研究与创新。实验室拥有一支由教授、博士、硕士组成的高水平科研团队，在多个国际顶级会议和期刊上发表了大量高水平论文，承担了多项国家级和省部级科研项目。",
    "mission": "推动智能系统理论与应用的发展，培养高素质科研人才，服务国家战略需求",
    "vision": "成为国际一流的智能系统研究实验室",
    "values": ["创新", "严谨", "协作", "卓越"]
  },
  "highlights": [
    {
      "title": "科研实力",
      "description": "承担多项国家级科研项目，发表高水平论文"
    },
    {
      "title": "人才培养",
      "description": "培养博士、硕士研究生百余名，遍布国内外知名高校和企业"
    },
    {
      "title": "国际交流",
      "description": "与国际一流大学和研究机构保持密切合作关系"
    },
    {
      "title": "成果转化",
      "description": "多项技术成果实现产业化应用"
    }
  ],
  "researchDirections": [
    "人工智能",
    "机器学习",
    "深度学习",
    "计算机视觉",
    "自然语言处理",
    "智能决策系统"
  ]
}
EOF
fi

# 检查并修复主题配置
if [ ! -f data/themes.json ]; then
    echo "创建主题配置文件..."
    cat > data/themes.json << EOF
{
  "themes": [
    {
      "id": "default",
      "name": "默认蓝色",
      "description": "经典的蓝色主题，专业稳重",
      "primaryColor": "#2563eb",
      "secondaryColor": "#1e40af",
      "accentColor": "#3b82f6",
      "bgColor": "#ffffff",
      "textColor": "#1f2937",
      "lightTextColor": "#6b7280",
      "bgLight": "#f9fafb"
    },
    {
      "id": "green",
      "name": "清新绿色",
      "description": "清新的绿色主题，自然舒适",
      "primaryColor": "#059669",
      "secondaryColor": "#047857",
      "accentColor": "#10b981",
      "bgColor": "#ffffff",
      "textColor": "#1f2937",
      "lightTextColor": "#6b7280",
      "bgLight": "#f0fdf4"
    },
    {
      "id": "purple",
      "name": "优雅紫色",
      "description": "优雅的紫色主题，时尚大气",
      "primaryColor": "#7c3aed",
      "secondaryColor": "#6d28d9",
      "accentColor": "#8b5cf6",
      "bgColor": "#ffffff",
      "textColor": "#1f2937",
      "lightTextColor": "#6b7280",
      "bgLight": "#faf5ff"
    },
    {
      "id": "orange",
      "name": "活力橙色",
      "description": "活力的橙色主题，热情开朗",
      "primaryColor": "#ea580c",
      "secondaryColor": "#c2410c",
      "accentColor": "#f97316",
      "bgColor": "#ffffff",
      "textColor": "#1f2937",
      "lightTextColor": "#6b7280",
      "bgLight": "#fff7ed"
    },
    {
      "id": "dark",
      "name": "深色模式",
      "description": "护眼的深色主题，适合长时间阅读",
      "primaryColor": "#3b82f6",
      "secondaryColor": "#2563eb",
      "accentColor": "#60a5fa",
      "bgColor": "#111827",
      "textColor": "#f9fafb",
      "lightTextColor": "#9ca3af",
      "bgLight": "#1f2937"
    },
    {
      "id": "pink",
      "name": "玫瑰红色",
      "description": "温暖的粉色主题，柔和舒适",
      "primaryColor": "#db2777",
      "secondaryColor": "#be185d",
      "accentColor": "#f472b6",
      "bgColor": "#ffffff",
      "textColor": "#1f2937",
      "lightTextColor": "#6b7280",
      "bgLight": "#fdf2f8"
    }
  ],
  "backgrounds": [
    {
      "id": "default",
      "name": "默认背景",
      "description": "经典的蓝色渐变背景",
      "type": "gradient",
      "value": "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)"
    },
    {
      "id": "nature",
      "name": "自然风光",
      "description": "清新的自然风景背景",
      "type": "image",
      "value": "assets/backgrounds/nature.jpg"
    },
    {
      "id": "tech",
      "name": "科技风格",
      "description": "现代科技感背景",
      "type": "image",
      "value": "assets/backgrounds/tech.jpg"
    }
  ],
  "defaultTheme": "default",
  "defaultBackground": "default"
}
EOF
fi

# 2. 检查并修复图片资源
echo "2. 检查图片资源..."

# 确保所有图片都存在
mkdir -p assets/{images,backgrounds}

# 检查并复制图片
if [ ! -f assets/images/logo.png ]; then
    echo "复制Logo图片..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/logo.png
fi

if [ ! -f assets/images/lab-logo.png ]; then
    echo "复制实验室Logo..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/lab-logo.png
fi

if [ ! -f assets/images/lab-icon.png ]; then
    echo "复制实验室图标..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/lab-icon.png
fi

if [ ! -f assets/images/member-avatar.png ]; then
    echo "复制成员头像..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/member-avatar.png
fi

if [ ! -f assets/images/news-default.png ]; then
    echo "复制新闻默认图片..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/news-default.png
fi

if [ ! -f assets/images/blog-default.png ]; then
    echo "复制博客默认图片..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/blog-default.png
fi

if [ ! -f assets/images/project-default.png ]; then
    echo "复制项目默认图片..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/project-default.png
fi

if [ ! -f assets/images/activity-default.png ]; then
    echo "复制活动默认图片..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/images/activity-default.png
fi

if [ ! -f assets/backgrounds/default-bg.jpg ]; then
    echo "复制默认背景..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/backgrounds/default-bg.jpg
fi

if [ ! -f assets/backgrounds/nature.jpg ]; then
    echo "复制自然背景..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/backgrounds/nature.jpg
fi

if [ ! -f assets/backgrounds/tech.jpg ]; then
    echo "复制科技背景..."
    cp /home/dingjunjie/WebCode/MyWeb/实验室图标.png assets/backgrounds/tech.jpg
fi

# 3. 检查并修复JavaScript权限系统
echo "3. 修复权限系统..."

# 确保权限系统正确
sed -i 's/let currentUser = null;/\/\/ 全局数据存储\n\nwindow.appData = {/g' script.js

# 4. 测试网站
echo "4. 测试网站..."

# 启动本地服务器
echo "启动本地服务器，请访问 http://localhost:8000"
python3 -m http.server 8000

echo "修复完成！如果仍有问题，请检查控制台错误信息。"