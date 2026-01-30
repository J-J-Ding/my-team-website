#!/bin/bash

# 部署检查脚本
# 用于检查网站部署前的关键文件和配置

echo "================================"
echo "  智能系统实验室 - 部署检查"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查计数
passed=0
failed=0

# 检查函数
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((passed++))
    else
        echo -e "${RED}✗${NC} $1 (缺失)"
        ((failed++))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((passed++))
    else
        echo -e "${RED}✗${NC} $1/ (缺失)"
        ((failed++))
    fi
}

echo "1. 检查核心文件..."
check_file "index.html"
check_file "styles.css"
check_file "script.js"
check_file "theme-styles.css"
echo ""

echo "2. 检查数据文件..."
check_file "data/config.json"
check_file "data/themes.json"
check_file "data/about/lab.json"
check_file "data/contact/info.json"
check_file "data/auth/users.json"
check_file "data/team/members.json"
check_file "data/projects/projects.json"
check_file "data/papers/papers.json"
check_file "data/competitions/competitions.json"
check_file "data/publications/publications.json"
check_file "data/news/news.json"
check_file "data/blogs/blogs.json"
check_file "data/activities/activities.json"
echo ""

echo "3. 检查资源文件夹..."
check_dir "assets/images"
check_dir "assets/backgrounds"
check_dir "pages"
check_dir "data"
echo ""

echo "4. 检查关键图片..."
check_file "assets/images/logo.png"
check_file "assets/images/lab-logo.png"
check_file "assets/backgrounds/default-bg.jpg"
echo ""

echo "5. 检查页面文件..."
check_file "pages/login.html"
check_file "pages/login.js"
check_file "pages/dashboard.html"
check_file "pages/dashboard.js"
check_file "pages/auth.css"
check_file "pages/admin/dashboard.html"
check_file "pages/admin/admin.js"
check_file "pages/admin/admin.css"
echo ""

echo "6. 验证 JSON 文件格式..."
for file in data/config.json data/themes.json data/team/members.json; do
    if python3 -c "import json; json.load(open('$file'))" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $file (格式正确)"
        ((passed++))
    else
        echo -e "${RED}✗${NC} $file (格式错误)"
        ((failed++))
    fi
done
echo ""

echo "================================"
echo "  检查结果汇总"
echo "================================"
echo -e "${GREEN}通过:${NC} $passed"
echo -e "${RED}失败:${NC} $failed"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✓ 所有检查通过，可以部署！${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ 存在 $failed 个问题，请先修复${NC}"
    exit 1
fi
