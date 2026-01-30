// 加载团队数据并渲染
async function loadTeam() {
  const res = await fetch('team.json');
  const team = await res.json();
  renderTeam(team);
  populateRoles(team);
  animateStats();
}

function renderTeam(team) {
  const grid = document.getElementById('teamGrid');
  grid.innerHTML = '';
  team.forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
      <div class="team-image">
        ${member.image ? `<img src="${member.image}" alt="${member.name}" />` : `<div class="placeholder-avatar">${member.name.slice(0,1)}</div>`}
      </div>
      <div class="team-info">
        <h3>${member.name}</h3>
        <p class="team-role">${member.role}</p>
        <p class="team-desc">${member.short}</p>
        <div class="social-links">
          ${member.twitter?`<a href="${member.twitter}" class="social-link" target="_blank">Twitter</a>`:''}
          ${member.github?`<a href="${member.github}" class="social-link" target="_blank">GitHub</a>`:''}
        </div>
      </div>
    `;
    card.addEventListener('click', ()=> openModal(member));
    grid.appendChild(card);
  });
}

function populateRoles(team) {
  const roleSet = new Set(team.map(m=>m.role));
  const sel = document.getElementById('filterRole');
  roleSet.forEach(r=>{
    const opt = document.createElement('option'); opt.value=r; opt.textContent=r; sel.appendChild(opt);
  });
}

function openModal(member){
  const modal = document.getElementById('memberModal');
  modal.setAttribute('aria-hidden','false');
  modal.querySelector('.modal-avatar').innerHTML = member.image?`<img src="${member.image}" alt="${member.name}">`:`<div class="placeholder-avatar">${member.name.slice(0,1)}</div>`;
  modal.querySelector('.modal-name').textContent = member.name;
  modal.querySelector('.modal-role').textContent = member.role;
  modal.querySelector('.modal-bio').textContent = member.bio || member.short;
  const contact = modal.querySelector('.modal-contact');
  contact.innerHTML = '';
  if(member.email) contact.innerHTML += `<div>✉️ <a href="mailto:${member.email}">${member.email}</a></div>`;
  if(member.phone) contact.innerHTML += `<div>📱 ${member.phone}</div>`;
}

function closeModal(){
  const modal = document.getElementById('memberModal');
  modal.setAttribute('aria-hidden','true');
}

document.addEventListener('click', (e)=>{
  if(e.target.matches('.modal-close') || e.target.matches('.modal')) closeModal();
});

// 搜索与筛选
document.addEventListener('input', async (e)=>{
  if(e.target.id === 'search' || e.target.id === 'filterRole') {
    const q = document.getElementById('search').value.toLowerCase();
    const role = document.getElementById('filterRole').value;
    const res = await fetch('team.json');
    const team = await res.json();
    const filtered = team.filter(m=>{
      const matchQ = !q || `${m.name} ${m.role} ${m.short} ${m.bio}`.toLowerCase().includes(q);
      const matchRole = !role || m.role === role;
      return matchQ && matchRole;
    });
    renderTeam(filtered);
  }
});

// 联系表单（仅前端演示）
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('感谢您的留言，我们会尽快与您联系。');
  e.target.reset();
});

// 统计数字动画
function animateStats(){
  document.querySelectorAll('.stat-number').forEach(el=>{
    const target = +el.dataset.target;
    let curr = 0; const step = Math.ceil(target/60);
    const iv = setInterval(()=>{
      curr += step; if(curr>=target){ el.textContent = target; clearInterval(iv); } else el.textContent = curr; }, 16);
  });
}

// 初始加载
loadTeam().catch(err=>console.error(err));

// 简单汉堡菜单
document.querySelector('.hamburger').addEventListener('click', ()=>{
  document.querySelector('.nav-menu').classList.toggle('active');
});
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
