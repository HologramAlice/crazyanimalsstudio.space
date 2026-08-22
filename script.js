
const translations = {
    ru: {
        
        'nav-projects':          'Проекты',
        'nav-about':             'О нас',
        'nav-join':              'Вступить',

        
        'hero-tag':              'CAS_v1',
        'hero-sub':              'Небольшая инди-геймдев команда.',
        'hero-btn-projects':     '// Проекты',

        
        'marquee-indie':         'инди-геймдев',

        
        'tag-current-build':     '// 製作中 · текущая разработка',
        'active-badge':          '● 開発中 · ACTIVE',
        'btn-follow':            'следить ↗',
        'art-not-ready-featured':'// арт ещё не готов · 未定',
        
        
        'tag-about':             '// スタジオ · о студии',
        'stat-games':            'в разработке',
        'stat-members':          'участников',
        'stat-engine':           'движок',
        'stat-founder&coFounder':'Основатель и со-основатель',
        
        
        'roles-sub':             '自分たちのペースで · своим темпом',

        
        'tag-all-projects':      '// 全プロジェクト · все проекты',
        'status-active':         '開発中 · В РАЗРАБОТКЕ',
        'badge-active':          'АКТИВЕН',
        'status-ideas':          'アイデア · ИДЕИ',
        'badge-idea':            'Идея',
        'art-pending':           '// арт не готов · 未定',
        'art-pending-short':     '// арт не готов',

        
        'join-tag-word':         'вступить',
        
        
        'footer-copy':           '© 2026 · Санкт-Петербург',
    },
    en: {
        
        'nav-projects':          'Projects',
        'nav-about':             'About',
        'nav-join':              'Join',

        
        'hero-tag':              'CAS_v1',
        'hero-sub':              'Mini indie gamedev team.',
        'hero-btn-projects':     '// Projects',
        
        
        'marquee-indie':         'indie-gamedev',
        
        
        'tag-current-build':     '// 製作中 · current build',
        'active-badge':          '● 開発中 · ACTIVE',
        'btn-follow':            'follow ↗',
        'art-not-ready-featured':'// art not ready yet',
        
        
        'tag-about':             '// スタジオ · about',
        'stat-games':            'in development',
        'stat-members':          'members',
        'stat-basedIn':          'based in',
        'stat-founders':         'founder & co-founder',
        
        
        'roles-sub':             '自分たちのペースで · at our own pace',
        
        
        'tag-all-projects':      '// 全プロジェクト · all projects',
        'status-active':         '開発中 · IN DEVELOPMENT',
        'badge-active':          'ACTIVE',
        'status-ideas':          'アイデア · IDEAS',
        'badge-idea':            'Idea',
        'art-pending':           '// art not ready · 未定',
        'art-pending-short':     '// art not ready',
       
        
        'join-tag-word':         'join',
        
        
        'footer-copy':           '© 2026 · Saint Petersburg',
    }
};

let currentLang = 'en';

const SCRAMBLE_CHARS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯabcdefghijklmnopqrstuvwxyz0123456789#@!_·/><';

function scrambleElement(el, targetText, duration = 420) {
    const steps = 9;
    const interval = duration / steps;
    let step = 0;

    if (el._scrambleTimer) {
        clearInterval(el._scrambleTimer);
        el._scrambleTimer = null;
    }

    el._scrambleTimer = setInterval(() => {
        step++;
        if (step >= steps) {
            el.textContent = targetText;
            clearInterval(el._scrambleTimer);
            el._scrambleTimer = null;
            return;
        }
        const resolved = Math.floor((step / steps) * targetText.length);
        let out = targetText.slice(0, resolved);
        for (let i = resolved; i < targetText.length; i++) {
            const ch = targetText[i];
            if (ch === ' ' || ch === '·' || ch === '/') {
                out += ch;
            } else {
                out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
        }
        el.textContent = out;
    }, interval);
}

function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('cas-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = translations[lang][key];
        if (val === undefined) return;

        if (/<[a-z]/i.test(val)) {
            el.innerHTML = val;
        } else {
            scrambleElement(el, val);
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cas-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '◑' : '◐';
}

(function init() {
    const savedLang = localStorage.getItem('cas-lang');
    setLang(savedLang || 'en');

    const savedTheme = localStorage.getItem('cas-theme') || 'light';
    applyTheme(savedTheme);
})();

document.querySelectorAll('.media-card').forEach((card) => {
    const frame = card.querySelector('.media-card-frame');
    let entered = false;

    card.addEventListener('mouseenter', () => {
        frame.style.transition = 'box-shadow 0.25s';
        entered = true;
    });
    card.addEventListener('mousemove', e => {
        if (!entered) return;
        const rect = frame.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        frame.style.transform  = `translateY(-16px) scale(1.05) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
        frame.style.boxShadow  = `
            ${dx * -8}px ${dy * -8 + 28}px 56px rgba(0,0,0,0.25),
            0 8px 16px rgba(0,0,0,0.12),
            0 0 0 1px rgba(200,214,43,0.35)
        `;
    });
    card.addEventListener('mouseleave', () => {
        entered = false;
        frame.style.transition = 'transform 0.4s cubic-bezier(0.22,0.61,0.36,1), box-shadow 0.4s';
        frame.style.transform  = '';
        frame.style.boxShadow  = '';
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const delay = parseFloat(e.target.dataset.delay || 0);
            setTimeout(() => {
                e.target.style.opacity   = '1';
                e.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.media-card').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition= 'opacity 0.55s ease, transform 0.55s ease';
    el.dataset.delay   = i * 80;
    observer.observe(el);
});

document.querySelectorAll('.stat').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition= 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay   = i * 60;
    observer.observe(el);
});

document.querySelectorAll('.role-bubble').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px) scale(0.9)';
    el.style.transition= 'opacity 0.4s ease, transform 0.4s ease';
    el.dataset.delay   = i * 70;
    observer.observe(el);
});

const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el  = e.target;
        const text = el.textContent;
        const num  = parseInt(text);
        if (isNaN(num)) return;
        const suffix = text.replace(String(num), '');
        let start = 0;
        const dur = 900, step = 16;
        const inc = num / (dur / step);
        const timer = setInterval(() => {
            start = Math.min(start + inc, num);
            el.innerHTML = Math.floor(start) + '<span>' + suffix.replace(/\d/g, '') + '</span>';
            if (start >= num) clearInterval(timer);
        }, step);
        counterObs.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));
