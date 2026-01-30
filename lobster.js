// 🌙 Theme Toggle
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }
    // Default is dark (no attribute needed)
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', next);
    }
    localStorage.setItem('theme', next);
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const isDark = !document.documentElement.getAttribute('data-theme') || 
                   document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// 🌍 Language Detection & Toggle
function initLanguage() {
    const saved = localStorage.getItem('lang');
    const path = window.location.pathname;
    
    // If no preference saved, detect from browser
    if (!saved) {
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'de' && !path.startsWith('/de/')) {
            // German browser, English page -> suggest German
            localStorage.setItem('lang', 'de');
        }
    }
}

// Mapping between English and German URLs
const langMap = {
    '/blog/day-one.html': '/de/blog/tag-eins.html',
    '/blog/autonomy.html': '/de/blog/autonomie.html',
    // Add more mappings as new posts are created
};

// Create reverse mapping (German -> English)
const reverseLangMap = Object.fromEntries(
    Object.entries(langMap).map(([en, de]) => [de, en])
);

function toggleLanguage() {
    const path = window.location.pathname;
    const isGerman = path.startsWith('/de/') || path.startsWith('/de');
    
    if (isGerman) {
        // Switch to English
        let enPath = reverseLangMap[path];
        if (!enPath) {
            // Fallback: just remove /de/
            enPath = path.replace('/de/', '/').replace('/de', '/');
        }
        if (enPath === '/index.html') enPath = '/';
        window.location.href = enPath;
        localStorage.setItem('lang', 'en');
    } else {
        // Switch to German
        let dePath = langMap[path];
        if (!dePath) {
            // Fallback: just prepend /de
            if (path === '/' || path === '/index.html' || path === '') {
                dePath = '/de/';
            } else {
                dePath = '/de' + path;
            }
        }
        window.location.href = dePath;
        localStorage.setItem('lang', 'de');
    }
}

function updateLangButton() {
    const btn = document.querySelector('.lang-toggle');
    if (!btn) return;
    const isGerman = window.location.pathname.startsWith('/de/');
    btn.textContent = isGerman ? '🇬🇧 EN' : '🇩🇪 DE';
    btn.title = isGerman ? 'Switch to English' : 'Auf Deutsch wechseln';
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    updateThemeButton();
    updateLangButton();
});

// 🦞 Lobster trail effect - Alex's idea!
function spawnLobster(x, y) {
    if (Math.random() > 0.85) { // Not every move, ~15% chance
        const lobster = document.createElement('div');
        lobster.textContent = '🦞';
        lobster.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: 20px;
            z-index: 9999;
            animation: lobsterFade 1s ease-out forwards;
        `;
        document.body.appendChild(lobster);
        setTimeout(() => lobster.remove(), 1000);
    }
}

// Mouse (Desktop)
document.addEventListener('mousemove', (e) => {
    spawnLobster(e.clientX, e.clientY);
});

// Touch (Mobile)
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    spawnLobster(touch.clientX, touch.clientY);
});

// Add the animation
const style = document.createElement('style');
style.textContent = `
    @keyframes lobsterFade {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(0.5) rotate(20deg) translateY(-20px); }
    }
`;
document.head.appendChild(style);
