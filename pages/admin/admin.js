// Admin Dashboard 功能
let allData = {
    members: [],
    services: [],
    company: null,
    contact: null
};

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
        window.location.href = '../login.html';
        return false;
    }

    const currentUser = JSON.parse(user);
    if (currentUser.role !== 'admin') {
        showToast('无权访问管理员页面', 'error');
        window.location.href = '../dashboard.html';
        return false;
    }

    return true;
}

// 加载所有数据
async function loadAllData() {
    try {
        const [members, services, company, contact, users] = await Promise.all([
            fetch('../../data/team/members.json').then(r => r.json()),
            fetch('../../data/services/services.json').then(r => r.json()),
            fetch('../../data/about/company.json').then(r => r.json()),
            fetch('../../data/contact/info.json').then(r => r.json()),
            fetch('../../data/auth/users.json').then(r => r.json())
        ]);

        allData = { members, services, company, contact, users };

        updateStats();
        renderMembersList();
        renderServicesList();
        loadCompanyForm();
        loadContactForm();

    } catch (error) {
        console.error('加载数据失败:', error);
        showToast('加载数据失败', 'error');
    }
}

// 更新统计数据
function updateStats() {
    document.getElementById('totalMembers').textContent = allData.members.length;
    document.getElementById('totalServices').textContent = allData.services.length;
    document.getElementById('totalUsers').textContent = allData.users.users.length;
}

// 渲染成员列表
function renderMembersList() {
    const container = document.getElementById('membersList');
    container.innerHTML = allData.members.map(member => `
        <div class="member-item">
            <div class="member-info">
                <div class="member-avatar">${member.avatar}</div>
                <div class="member-details">
                    <h4>${member.name}</h4>
                    <div class="member-role">${member.role}</div>
                </div>
            </div>
            <div class="member-actions">
                <button class="btn btn-outline" onclick="editMember(${member.id})">编辑</button>
                <button class="btn btn-outline" onclick="deleteMember(${member.id})" style="border-color: #ef4444; color: #ef4444;">删除</button>
            </div>
        </div>
    `).join('');
}

// 渲染服务列表
function renderServicesList() {
    const container = document.getElementById('servicesList');
    container.innerHTML = allData.services.map(service => `
        <div class="service-item">
            <div class="service-info">
                <div class="service-icon">${service.icon}</div>
                <div>
                    <h4>${service.name}</h4>
                    <div class="service-desc">${service.description}</div>
                </div>
            </div>
            <div class="member-actions">
                <button class="btn btn-outline" onclick="editService(${service.id})">编辑</button>
                <button class="btn btn-outline" onclick="deleteService(${service.id})" style="border-color: #ef4444; color: #ef4444;">删除</button>
            </div>
        </div>
    `).join('');
}

// 加载公司表单
function loadCompanyForm() {
    if (!allData.company || !allData.company.company) return;

    const company = allData.company.company;
    document.getElementById('companyName').value = company.name || '';
    document.getElementById('companyStory').value = company.story || '';
    document.getElementById('companyMission').value = company.mission || '';
    document.getElementById('companyVision').value = company.vision || '';
}

// 加载联系表单
function loadContactForm() {
    if (!allData.contact) return;

    document.getElementById('contactAddress').value = allData.contact.address?.value || '';
    document.getElementById('contactEmail').value = allData.contact.email?.value || '';
    document.getElementById('contactPhone').value = allData.contact.phone?.value || '';
    document.getElementById('contactWebsite').value = allData.contact.website?.value || '';
}

// 编辑成员
function editMember(id) {
    const member = allData.members.find(m => m.id === id);
    if (!member) return;

    document.getElementById('memberModalTitle').textContent = '编辑成员';
    document.getElementById('memberId').value = member.id;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberRole').value = member.role;
    document.getElementById('memberDesc').value = member.description;
    document.getElementById('memberAvatar').value = member.avatar;

    document.getElementById('memberModal').classList.add('show');
}

// 删除成员
function deleteMember(id) {
    if (!confirm('确定要删除这个成员吗？')) return;

    const index = allData.members.findIndex(m => m.id === id);
    if (index > -1) {
        allData.members.splice(index, 1);
        renderMembersList();
        updateStats();
        showToast('成员已删除', 'success');
    }
}

// 显示添加成员模态框
function showAddMemberModal() {
    document.getElementById('memberModalTitle').textContent = '添加成员';
    document.getElementById('memberForm').reset();
    document.getElementById('memberId').value = '';
    document.getElementById('memberModal').classList.add('show');
}

// 关闭成员模态框
function closeMemberModal() {
    document.getElementById('memberModal').classList.remove('show');
}

// 保存成员
document.getElementById('memberForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('memberId').value;
    const memberData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('memberName').value,
        role: document.getElementById('memberRole').value,
        description: document.getElementById('memberDesc').value,
        avatar: document.getElementById('memberAvatar').value,
        social: {
            linkedin: '#',
            github: '#'
        },
        skills: [],
        experience: '0年'
    };

    if (id) {
        // 更新
        const index = allData.members.findIndex(m => m.id === parseInt(id));
        if (index > -1) {
            allData.members[index] = { ...allData.members[index], ...memberData };
        }
    } else {
        // 添加
        allData.members.push(memberData);
    }

    renderMembersList();
    updateStats();
    closeMemberModal();
    showToast(id ? '成员已更新' : '成员已添加', 'success');
});

// 编辑服务
function editService(id) {
    const service = allData.services.find(s => s.id === id);
    if (!service) return;

    const newDescription = prompt('服务描述:', service.description);
    if (newDescription !== null) {
        service.description = newDescription;
        renderServicesList();
        showToast('服务已更新', 'success');
    }
}

// 删除服务
function deleteService(id) {
    if (!confirm('确定要删除这个服务吗？')) return;

    const index = allData.services.findIndex(s => s.id === id);
    if (index > -1) {
        allData.services.splice(index, 1);
        renderServicesList();
        updateStats();
        showToast('服务已删除', 'success');
    }
}

// 添加服务
function showAddServiceModal() {
    const name = prompt('服务名称:');
    if (!name) return;

    const icon = prompt('图标 (emoji):', '💼') || '💼';
    const description = prompt('服务描述:') || '';

    const newService = {
        id: Date.now(),
        name,
        icon,
        description,
        features: [],
        category: '其他'
    };

    allData.services.push(newService);
    renderServicesList();
    updateStats();
    showToast('服务已添加', 'success');
}

// 保存公司信息
document.getElementById('companyForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!allData.company || !allData.company.company) return;

    allData.company.company.name = document.getElementById('companyName').value;
    allData.company.company.story = document.getElementById('companyStory').value;
    allData.company.company.mission = document.getElementById('companyMission').value;
    allData.company.company.vision = document.getElementById('companyVision').value;

    showToast('公司信息已保存', 'success');
});

// 保存联系信息
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!allData.contact) return;

    allData.contact.address.value = document.getElementById('contactAddress').value;
    allData.contact.email.value = document.getElementById('contactEmail').value;
    allData.contact.phone.value = document.getElementById('contactPhone').value;
    allData.contact.website.value = document.getElementById('contactWebsite').value;

    showToast('联系信息已保存', 'success');
});

// 退出登录
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../login.html';
    }
});

// 侧边栏切换
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const tabId = item.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    });
});

// 页面加载
window.addEventListener('DOMContentLoaded', () => {
    if (checkLogin()) {
        loadAllData();
    }
});
