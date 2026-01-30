// Dashboard 功能
let currentUser = null;
let memberData = null;

// 显示 Toast 消息
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 检查登录状态
function checkLogin() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }

    currentUser = JSON.parse(user);
    updateUserUI();
    return true;
}

// 更新用户界面
function updateUserUI() {
    document.getElementById('userAvatar').textContent = currentUser.avatar;
    document.getElementById('userName').textContent = currentUser.name;
}

// 加载成员数据
async function loadMemberData() {
    try {
        const response = await fetch('../data/team/members.json');
        const members = await response.json();

        // 查找当前用户的数据
        memberData = members.find(m => m.id == currentUser.roleId);

        if (memberData) {
            loadProfileData();
            loadSkillsData();
            loadSocialData();
            updatePreview();
        }
    } catch (error) {
        console.error('加载成员数据失败:', error);
    }
}

// 加载个人资料
function loadProfileData() {
    if (!memberData) return;

    document.getElementById('name').value = memberData.name || '';
    document.getElementById('role').value = memberData.role || '';
    document.getElementById('description').value = memberData.description || '';
    document.getElementById('experience').value = memberData.experience || '';
    document.getElementById('avatar').value = memberData.avatar || '';
}

// 加载技能数据
function loadSkillsData() {
    if (!memberData || !memberData.skills) return;

    const skillsTextarea = document.getElementById('skills');
    skillsTextarea.value = memberData.skills.join('\n');
    updateSkillsPreview();
}

// 加载社交链接
function loadSocialData() {
    if (!memberData || !memberData.social) return;

    document.getElementById('linkedin').value = memberData.social.linkedin || '';
    document.getElementById('github').value = memberData.social.github || '';
    document.getElementById('twitter').value = memberData.social.twitter || '';
}

// 更新技能预览
function updateSkillsPreview() {
    const skillsTextarea = document.getElementById('skills');
    const currentSkillsDiv = document.getElementById('currentSkills');
    const skills = skillsTextarea.value.split('\n').filter(s => s.trim());

    currentSkillsDiv.innerHTML = skills.length > 0
        ? skills.map(skill => `<span class="skill-tag">${skill.trim()}</span>`).join('')
        : '<span style="color: var(--light-text);">暂无技能</span>';
}

// 更新预览
function updatePreview() {
    if (!memberData) return;

    document.getElementById('previewAvatar').textContent =
        document.getElementById('avatar').value || memberData.avatar || '?';
    document.getElementById('previewName').textContent =
        document.getElementById('name').value || memberData.name || '姓名';
    document.getElementById('previewRole').textContent =
        document.getElementById('role').value || memberData.role || '职位';
    document.getElementById('previewDesc').textContent =
        document.getElementById('description').value || memberData.description || '个人描述';

    // 技能
    const skills = document.getElementById('skills').value.split('\n').filter(s => s.trim());
    const previewSkills = document.getElementById('previewSkills');
    previewSkills.innerHTML = skills.length > 0
        ? skills.map(skill => `<span class="skill-tag">${skill.trim()}</span>`).join('')
        : '';

    // 社交链接
    const linkedin = document.getElementById('linkedin').value || memberData.social?.linkedin;
    const github = document.getElementById('github').value || memberData.social?.github;
    const twitter = document.getElementById('twitter').value || memberData.social?.twitter;

    const previewSocial = document.getElementById('previewSocial');
    let socialHtml = '';
    if (linkedin) socialHtml += `<a href="${linkedin}" class="social-link">LinkedIn</a>`;
    if (github) socialHtml += `<a href="${github}" class="social-link">GitHub</a>`;
    if (twitter) socialHtml += `<a href="${twitter}" class="social-link">Twitter</a>`;
    previewSocial.innerHTML = socialHtml;
}

// 保存个人资料
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!memberData) {
        showToast('无法更新：未找到成员数据', 'error');
        return;
    }

    // 更新数据
    memberData.name = document.getElementById('name').value;
    memberData.role = document.getElementById('role').value;
    memberData.description = document.getElementById('description').value;
    memberData.experience = document.getElementById('experience').value;
    memberData.avatar = document.getElementById('avatar').value;

    showToast('个人资料已更新！', 'success');
    updatePreview();
});

// 保存技能
document.getElementById('skillsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!memberData) {
        showToast('无法更新：未找到成员数据', 'error');
        return;
    }

    const skills = document.getElementById('skills').value.split('\n').filter(s => s.trim());
    if (skills.length > 8) {
        showToast('最多只能添加8个技能', 'warning');
        return;
    }

    memberData.skills = skills;

    updateSkillsPreview();
    showToast('技能已更新！', 'success');
    updatePreview();
});

// 保存社交链接
document.getElementById('socialForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!memberData) {
        showToast('无法更新：未找到成员数据', 'error');
        return;
    }

    memberData.social = {
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        twitter: document.getElementById('twitter').value
    };

    showToast('社交链接已更新！', 'success');
    updatePreview();
});

// 退出登录
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
});

// 侧边栏切换
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // 更新侧边栏状态
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // 切换内容
        const tabId = item.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    });
});

// 技能输入实时预览
document.getElementById('skills').addEventListener('input', updateSkillsPreview);

// 表单输入实时更新预览
document.querySelectorAll('#profileForm input, #profileForm textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
});

document.querySelectorAll('#socialForm input').forEach(input => {
    input.addEventListener('input', updatePreview);
});

// 页面加载
window.addEventListener('DOMContentLoaded', () => {
    if (checkLogin()) {
        loadMemberData();
    }
});
