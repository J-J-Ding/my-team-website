// 登录功能
const loginForm = document.getElementById('loginForm');
const toast = document.getElementById('toast');

// 显示 Toast 消息
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 登录处理
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
        // 加载用户数据
        const response = await fetch('../data/auth/users.json');
        const data = await response.json();

        // 查找用户
        const user = data.users.find(u =>
            u.username === username && u.password === password
        );

        if (user) {
            // 保存登录状态
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                roleId: user.roleId
            }));

            showToast(`欢迎回来，${user.name}！`, 'success');

            // 根据角色跳转
            setTimeout(() => {
                if (user.role === 'admin') {
                    window.location.href = 'admin/dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }, 1000);
        } else {
            showToast('用户名或密码错误', 'error');
        }
    } catch (error) {
        console.error('登录失败:', error);
        showToast('登录失败，请稍后重试', 'error');
    }
});

// 检查是否已登录
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }
}

// 页面加载时检查登录状态
checkLoginStatus();
