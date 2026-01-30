// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接关闭菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 数字动画
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');

    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target + '+';
            }
        };

        updateNumber();
    });
}

// 使用 Intersection Observer 触发数字动画
const aboutSection = document.querySelector('#about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// 表单提交处理
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 获取表单数据
    const formData = new FormData(contactForm);

    // 显示提交成功消息
    alert('感谢您的留言！我们会尽快与您联系。');

    // 重置表单
    contactForm.reset();
});

// 滚动时导航栏效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 团队卡片悬停效果
const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 服务卡片悬停效果
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.service-icon').style.transform = 'scale(1.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.service-icon').style.transform = 'scale(1)';
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 滚动显示元素
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// 为所有section添加滚动动画
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    scrollObserver.observe(section);
});

// 添加visible类样式
const style = document.createElement('style');
style.textContent = `
    .section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .service-icon {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
