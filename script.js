// ==================== 数据加载 ====================

// 全局数据存储
window.appData = {
    config: null,
    lab: null,
    team: [],
    news: [],
    projects: [],
    papers: [],
    competitions: [],
    publications: [],
    blogs: [],
    activities: [],
    contact: null,
    themes: null
};

// 当前分页状态
let currentPage = 1;
let pageSize = 5;
let currentTab = 'projects';

// 主题设置
let currentTheme = null;
let currentBackground = null;
let customBackground = null;

// 用户状态
// 全局数据存储

window.appData = {
let isLoggedIn = false
}

// ==================== 权限和用户管理 ====================

// 检查登录状态
function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        isLoggedIn = true;
        
        // 更新登录按钮
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = '个人中心';
            loginBtn.href = 'pages/dashboard.html';
        }
        
        // 显示自定义背景选项
        const customBgSection = document.getElementById('customBackgroundSection');
        if (customBgSection) {
            customBgSection.style.display = 'block';
        }
        
        // 检查主题权限
        const customBgSectionTheme = document.getElementById('customBackgroundSection');
        if (customBgSectionTheme) {
            customBgSectionTheme.style.display = 'block';
        }
    } else {
        isLoggedIn = false;
        currentUser = null;
        
        // 更新登录按钮
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = '登录';
            loginBtn.href = 'pages/login.html';
        }
        
        // 隐藏自定义背景选项
        const customBgSection = document.getElementById('customBackgroundSection');
        if (customBgSection) {
            customBgSection.style.display = 'none';
        }
    }
}

// 权限检查
function hasPermission(requiredRole) {
    if (!isLoggedIn) return false;
    if (!currentUser) return false;
    
    if (requiredRole === 'admin' && currentUser.role === 'admin') return true;
    if (requiredRole === 'member' && currentUser.role === 'member') return true;
    if (requiredRole === 'teacher' && currentUser.roleType === 'teacher') return true;
    if (requiredRole === 'student' && currentUser.roleType === 'student') return true;
    
    return false;
}

// 用户登出
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userTheme');
    localStorage.removeItem('userBackground');
    localStorage.removeItem('customBackground');
    
    currentUser = null;
    isLoggedIn = false;
    checkLoginStatus();
    
    // 跳转到首页
    window.location.href = 'index.html';
}

// 加载用户数据（权限检查）
async function loadUserData() {
    try {
        const response = await fetch('./data/auth/users.json');
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('加载用户数据失败:', error);
        return [];
    }
}

// ==================== 主题管理 ====================

// ==================== 主题管理 ====================
async function loadThemes() {
    try {
        const response = await fetch('./data/themes.json');
        const data = await response.json();
        window.appData.themes = data;
        loadUserThemeSettings();
        renderThemeModal();
    } catch (error) {
        console.error('加载主题失败:', error);
    }
}

function loadUserThemeSettings() {
    // 加载保存的主题设置
    const savedTheme = localStorage.getItem('userTheme');
    const savedBackground = localStorage.getItem('userBackground');
    const savedCustomBg = localStorage.getItem('customBackground');

    if (savedTheme) {
        applyTheme(savedTheme);
        currentTheme = savedTheme;
    }

    if (savedCustomBg) {
        customBackground = savedCustomBg;
        applyCustomBackground(savedCustomBg);
    } else if (savedBackground) {
        applyBackground(savedBackground);
        currentBackground = savedBackground;
    }
}

function applyTheme(themeId) {
    const theme = window.appData.themes.themes.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--bg-light', theme.bgLight);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--light-text-color', theme.lightTextColor);

    // 应用深色模式
    if (theme.id === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    currentTheme = themeId;
}

function applyBackground(bgId) {
    const bg = window.appData.themes.backgrounds.find(b => b.id === bgId);
    if (!bg) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    switch(bg.type) {
        case 'gradient':
            hero.style.background = bg.value;
            hero.style.backgroundSize = 'cover';
            break;
        case 'image':
            hero.style.backgroundImage = `url(${bg.value})`;
            hero.style.backgroundSize = 'cover';
            hero.style.backgroundPosition = 'center';
            break;
        case 'solid':
            hero.style.background = bg.value;
            break;
    }

    currentBackground = bgId;
}

function applyCustomBackground(imageUrl) {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.style.backgroundImage = `url(${imageUrl})`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
}

function renderThemeModal() {
    const themes = window.appData.themes.themes;
    const backgrounds = window.appData.themes.backgrounds;

    const themeGrid = document.getElementById('themeGrid');
    themeGrid.innerHTML = themes.map(theme => `
        <div class="theme-card ${currentTheme === theme.id ? 'active' : ''}" data-theme="${theme.id}">
            <div class="theme-preview" style="background: ${theme.primaryColor};"></div>
            <div class="theme-info">
                <h5>${theme.name}</h5>
                <p>${theme.description}</p>
            </div>
        </div>
    `).join('');

    const backgroundGrid = document.getElementById('backgroundGrid');
    backgroundGrid.innerHTML = backgrounds.map(bg => `
        <div class="background-card ${currentBackground === bg.id && !customBackground ? 'active' : ''}" data-bg="${bg.id}">
            <div class="background-preview" style="background: ${bg.type === 'gradient' ? bg.value : '#e5e7eb'};">
                ${bg.preview || ''}
            </div>
            <div class="background-info">
                <h5>${bg.name}</h5>
                <p>${bg.description}</p>
            </div>
        </div>
    `).join('');

    // 绑定事件
    themeGrid.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            const themeId = card.dataset.theme;
            applyTheme(themeId);
            themeGrid.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    backgroundGrid.querySelectorAll('.background-card').forEach(card => {
        card.addEventListener('click', () => {
            const bgId = card.dataset.bg;
            customBackground = null;
            applyBackground(bgId);
            backgroundGrid.querySelectorAll('.background-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // 检查登录状态
    checkLoginStatus();
}

function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    currentUser = user ? JSON.parse(user) : null;

    const customBgSection = document.querySelector('.custom-background-section');
    if (currentUser) {
        customBgSection.style.display = 'block';
    } else {
        customBgSection.style.display = 'none';
    }
}

function saveThemeSettings() {
    localStorage.setItem('userTheme', currentTheme);
    localStorage.setItem('userBackground', currentBackground);
    if (customBackground) {
        localStorage.setItem('customBackground', customBackground);
    }
    showToast('主题设置已保存！');
    closeThemeModal();
}

function resetThemeSettings() {
    if (confirm('确定要恢复默认设置吗？')) {
        localStorage.removeItem('userTheme');
        localStorage.removeItem('userBackground');
        localStorage.removeItem('customBackground');

        currentTheme = window.appData.themes.defaultTheme;
        currentBackground = window.appData.themes.defaultBackground;
        customBackground = null;

        applyTheme(currentTheme);
        applyBackground(currentBackground);
        renderThemeModal();
        showToast('已恢复默认设置');
    }
}

function openThemeModal() {
    document.getElementById('themeModal').style.display = 'flex';
}

function closeThemeModal() {
    document.getElementById('themeModal').style.display = 'none';
}

// 自定义背景上传
document.getElementById('customBgInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // 限制文件大小（最大2MB）
    if (file.size > 2 * 1024 * 1024) {
        showToast('图片大小不能超过2MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        customBackground = e.target.result;
        applyCustomBackground(customBackground);
        localStorage.setItem('customBackground', customBackground);

        // 移除其他背景的选中状态
        document.querySelectorAll('.background-card').forEach(c => c.classList.remove('active'));
        showToast('自定义背景已上传');
    };
    reader.readAsDataURL(file);
});

document.getElementById('clearCustomBg')?.addEventListener('click', function() {
    customBackground = null;
    localStorage.removeItem('customBackground');

    // 恢复当前选中的背景
    if (currentBackground) {
        applyBackground(currentBackground);
    }

    showToast('自定义背景已清除');
});

// 异步加载数据
async function loadAllData() {
    try {
        const [
            config, lab, team, news, projects,
            papers, competitions, publications,
            blogs, activities, contact
        ] = await Promise.all([
            fetch('./data/config.json').then(r => r.json()),
            fetch('./data/about/lab.json').then(r => r.json()),
            fetch('./data/team/members.json').then(r => r.json()),
            fetch('./data/news/news.json').then(r => r.json()),
            fetch('./data/projects/projects.json').then(r => r.json()),
            fetch('./data/papers/papers.json').then(r => r.json()),
            fetch('./data/competitions/competitions.json').then(r => r.json()),
            fetch('./data/publications/publications.json').then(r => r.json()),
            fetch('./data/blogs/blogs.json').then(r => r.json()),
            fetch('./data/contact/info.json').then(r => r.json())
        ]);

        window.appData = {
            config, lab, team, news, projects,
            papers, competitions, publications,
            blogs, activities, contact
        };

        // 渲染页面
        renderAllPages();
    } catch (error) {
        console.error('数据加载失败:', error);
    }
}

// 渲染所有页面
function renderAllPages() {
    renderIntroduction();
    renderAchievements();
    renderNews();
    renderBlogs();
    renderProjects();
    renderPapers();
    renderCompetitions();
    renderPublications();
    renderTeam();
    renderActivities();
    renderContact();
    initAnimations();
}

// ==================== 实验室简介 ====================
function renderIntroduction() {
    const lab = window.appData.lab;
    if (!lab) return;

    document.getElementById('introText').innerHTML = `
        <p>${lab.lab.story}</p>
        <div class="lab-highlights">
            ${lab.highlights.map(h => `
                <div class="highlight-item">
                    <h4>${h.title}</h4>
                    <p>${h.description}</p>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('directionsTags').innerHTML = lab.researchDirections
        .map(d => `<span class="direction-tag">${d}</span>`)
        .join('');
}

// ==================== 成果汇总 ====================
function renderAchievements() {
    const tabs = document.querySelectorAll('.achievement-tabs .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            currentPage = 1;
            renderAchievementsContent();
        });
    });

    document.getElementById('pageSize').addEventListener('change', (e) => {
        pageSize = parseInt(e.target.value);
        currentPage = 1;
        renderAchievementsContent();
    });

    renderAchievementsContent();
}

function renderAchievementsContent() {
    let data = [];
    let renderFunc = null;

    switch(currentTab) {
        case 'projects':
            data = window.appData.projects;
            renderFunc = renderProjectCard;
            break;
        case 'papers':
            data = window.appData.papers;
            renderFunc = renderPaperCard;
            break;
        case 'competitions':
            data = window.appData.competitions;
            renderFunc = renderCompetitionCard;
            break;
        case 'publications':
            data = window.appData.publications;
            renderFunc = renderPublicationCard;
            break;
    }

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = data.slice(startIndex, endIndex);

    const content = document.getElementById('achievementsContent');
    content.innerHTML = pageData.map(renderFunc).join('');

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '<button class="page-btn" onclick="changePage(1)" ' + (currentPage === 1 ? 'disabled' : '') + '>首页</button>';
    html += `<button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    html += `<button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>`;
    html += `<button class="page-btn" onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>末页</button>`;

    pagination.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    renderAchievementsContent();
    document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
}

// ==================== 渲染卡片 ====================
function renderProjectCard(project) {
    return `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p class="card-desc">${project.description}</p>
            <div class="card-meta">
                <span>📅 ${project.startDate} - ${project.endDate}</span>
                <span>👤 ${project.leader}</span>
                <span class="status ${project.status}">${project.status}</span>
            </div>
            <div class="card-tags">
                ${project.keywords.map(k => `<span class="tag">${k}</span>`).join('')}
            </div>
            ${project.hasLink ? `
                <div class="link-indicator">
                    <span>🔗</span>
                    <a href="${project.linkUrl}" target="_blank">${project.linkText || '查看详情'}</a>
                </div>
            ` : ''}
        </div>
    `;
}

function renderPaperCard(paper) {
    return `
        <div class="paper-card">
            <h3>${paper.title}</h3>
            <p class="authors">${paper.authors.join(', ')}</p>
            <p class="journal">${paper.journal} (${paper.year})</p>
            <div class="card-meta">
                <span class="type-badge ${paper.type}">${paper.type}</span>
                <span>📊 引用: ${paper.citations}</span>
                ${paper.impactFactor ? `<span>⭐ IF: ${paper.impactFactor}</span>` : ''}
            </div>
            ${paper.hasLink ? `
                <div class="link-indicator">
                    <span>📄</span>
                    <a href="${paper.linkUrl}" target="_blank">${paper.linkText || '查看论文'}</a>
                </div>
            ` : ''}
        </div>
    `;
}

function renderCompetitionCard(competition) {
    return `
        <div class="competition-card">
            <h3>${competition.name}</h3>
            <p>${competition.description}</p>
            <div class="card-meta">
                <span>🏆 ${competition.award}</span>
                <span>📅 ${competition.date}</span>
                <span class="level ${competition.level}">${competition.level}</span>
            </div>
        </div>
    `;
}

function renderPublicationCard(pub) {
    return `
        <div class="publication-card">
            <h3>${pub.title}</h3>
            <p class="authors">${pub.authors.join(', ')}</p>
            <p class="publisher">${pub.publisher} (${pub.publishDate})</p>
            <div class="card-meta">
                <span>📚 ${pub.category}</span>
                <span>📖 ${pub.pages}页</span>
                ${pub.buyLink ? `<a href="${pub.buyLink}" target="_blank" class="buy-link">购买</a>` : ''}
            </div>
        </div>
    `;
}

// ==================== 新闻 ====================
function renderNews() {
    const container = document.getElementById('newsList');
    container.innerHTML = window.appData.news.map(item => `
        <div class="news-item">
            <div class="news-date">${item.date}</div>
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.content.substring(0, 100)}...</p>
                <div class="news-meta">
                    <span class="category">${item.category}</span>
                    <span>👤 ${item.author}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== 博客 ====================
function renderBlogs() {
    const container = document.getElementById('blogsList');
    container.innerHTML = window.appData.blogs.map(blog => `
        <div class="blog-card">
            <h3>${blog.title}</h3>
            <p class="blog-desc">${blog.content.substring(0, 150)}...</p>
            <div class="blog-meta">
                <span>👤 ${blog.author}</span>
                <span>📅 ${blog.date}</span>
                <span class="category">${blog.category}</span>
            </div>
            ${blog.systemName ? `
                <div class="system-info">
                    <strong>系统: ${blog.systemName}</strong>
                    <p>${blog.systemDescription}</p>
                    ${blog.github ? `<a href="${blog.github}" target="_blank" class="btn-link">GitHub</a>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// ==================== 项目列表 ====================
function renderProjects() {
    const container = document.getElementById('projectsList');
    container.innerHTML = window.appData.projects.map(p => renderProjectCard(p)).join('');
}

// ==================== 论文列表 ====================
function renderPapers() {
    const container = document.getElementById('papersList');
    container.innerHTML = window.appData.papers.map(p => renderPaperCard(p)).join('');
}

// ==================== 竞赛列表 ====================
function renderCompetitions() {
    const container = document.getElementById('competitionsList');
    container.innerHTML = window.appData.competitions.map(c => renderCompetitionCard(c)).join('');
}

// ==================== 刊物列表 ====================
function renderPublications() {
    const container = document.getElementById('publicationsList');
    container.innerHTML = window.appData.publications.map(p => renderPublicationCard(p)).join('');
}

// ==================== 团队成员 ====================
function renderTeam() {
    const tabs = document.querySelectorAll('.team-tabs .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const type = tab.dataset.type;
            filterTeam(type);
        });
    });

    filterTeam('all');
}

function filterTeam(type) {
    let filtered = window.appData.team;
    if (type !== 'all') {
        filtered = window.appData.team.filter(m => m.role === type);
    }

    const container = document.getElementById('teamGrid');
    container.innerHTML = filtered.map(member => `
        <div class="team-card" data-id="${member.id}">
            <div class="team-image">
                <div class="placeholder-avatar">${member.avatar}</div>
            </div>
            <div class="team-info">
                <h3>${member.name}</h3>
                <p class="team-role">${member.title}</p>
                <p class="team-desc">${member.description}</p>
                <div class="member-meta">
                    <span>🎓 ${member.education}</span>
                </div>
                <div class="research-fields">
                    ${member.researchFields.map(f => `<span class="field-tag">${f}</span>`).join('')}
                </div>
                <div class="member-stats">
                    <span>项目: ${member.projects.length}</span>
                    <span>论文: ${member.papers.length}</span>
                    <span>竞赛: ${member.competitions.length}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== 活动 ====================
function renderActivities() {
    const container = document.getElementById('activitiesList');
    container.innerHTML = window.appData.activities.map(activity => `
        <div class="activity-card">
            <div class="activity-date">${activity.date}</div>
            <div class="activity-content">
                <h3>${activity.title}</h3>
                <p>${activity.content}</p>
                <div class="activity-meta">
                    <span>📍 ${activity.location}</span>
                    <span class="category">${activity.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== 联系信息 ====================
function renderContact() {
    if (!window.appData.contact) return;

    const contact = window.appData.contact;
    document.getElementById('contactItems').innerHTML = `
        <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span>${contact.address?.value || ''}</span>
        </div>
        <div class="contact-item">
            <span class="contact-icon">📧</span>
            <span>${contact.email?.value || ''}</span>
        </div>
        <div class="contact-item">
            <span class="contact-icon">📱</span>
            <span>${contact.phone?.value || ''}</span>
        </div>
        <div class="contact-item">
            <span class="contact-icon">🌐</span>
            <span>${contact.website?.value || ''}</span>
        </div>
    `;
}

// ==================== 搜索功能 ====================
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchModal = document.getElementById('searchModal');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

document.getElementById('closeSearch').addEventListener('click', () => {
    searchModal.style.display = 'none';
});

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const results = [];

    // 搜索项目
    window.appData.projects.forEach(p => {
        if (p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)) {
            results.push({ ...p, type: '项目', icon: '📋', section: 'projects' });
        }
    });

    // 搜索论文
    window.appData.papers.forEach(p => {
        if (p.title.toLowerCase().includes(query) ||
            p.authors.some(a => a.toLowerCase().includes(query))) {
            results.push({ ...p, type: '论文', icon: '📄', section: 'papers' });
        }
    });

    // 搜索团队成员
    window.appData.team.forEach(m => {
        if (m.name.toLowerCase().includes(query) ||
            m.title.toLowerCase().includes(query)) {
            results.push({ ...m, type: '成员', icon: '👤', section: 'team' });
        }
    });

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `<div class="search-empty">未找到相关内容</div>`;
        return;
    }

    searchResults.innerHTML = `
        <p class="search-count">找到 ${results.length} 个结果</p>
        ${results.map(r => `
            <div class="search-result-item" onclick="goToSection('${r.section}')">
                <div class="result-icon">${r.icon}</div>
                <div class="result-content">
                    <div class="result-type">${r.type}</div>
                    <div class="result-name">${highlightText(r.title || r.name, query)}</div>
                </div>
            </div>
        `).join('')}
    `;

    searchModal.style.display = 'flex';
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function goToSection(section) {
    searchModal.style.display = 'none';
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}

// ==================== 交互效果 ====================
function initAnimations() {
    // Hero 数字动画
    const numbers = document.querySelectorAll('.hero-stats .stat-number');
    numbers.forEach(num => {
        const target = parseInt(num.dataset.target);
        animateNumber(num, target);
    });

    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ==================== 导航栏 ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== 表单 ====================
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('留言已发送，我们会尽快回复！');
    e.target.reset();
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== 页面加载 ====================
window.addEventListener('DOMContentLoaded', async () => {
    await loadThemes();
    checkLoginStatus();
    loadAllData();
});

// 主题切换按钮
document.getElementById('themeToggleBtn').addEventListener('click', openThemeModal);
document.getElementById('closeThemeModal').addEventListener('click', closeThemeModal);
document.getElementById('saveThemeSettings').addEventListener('saveThemeSettings', saveThemeSettings);
document.getElementById('resetThemeSettings').addEventListener('resetThemeSettings', resetThemeSettings);
