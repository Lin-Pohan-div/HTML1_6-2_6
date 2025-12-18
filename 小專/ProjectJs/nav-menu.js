document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const parent = btn.parentElement;
        const open = parent.classList.contains('open');
        // 關閉所有
        document.querySelectorAll('.dropbtn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        if (!open) {
            parent.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});
document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropbtn').forEach(b => b.setAttribute('aria-expanded', 'false'));
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    }
});

// subscribe button
// scroll to the subscribe section and focus the email input to avoid undefined function errors
function openModal() {
    const section = document.getElementById('subscribe');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const input = section.querySelector('input[type="email"]');
        if (input) input.focus();
    }
}


// enhance dropdown accessibility and synchronize ARIA with open state
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown').forEach(function (drop) {
        var btn = drop.querySelector('.dropbtn');
        var menu = drop.querySelector('.dropdown-content');
        if (!btn || !menu) return;

        // ensure menu has an id and initialize ARIA states
        if (!menu.id) menu.id = 'dropdown-' + Math.random().toString(36).slice(2, 9);
        btn.setAttribute('aria-controls', menu.id);
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var isOpen = drop.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        });

        // close when clicking outside
        document.addEventListener('click', function (e) {
            if (!drop.contains(e.target) && drop.classList.contains('open')) {
                drop.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }
        });

        // keyboard: Esc to close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && drop.classList.contains('open')) {
                drop.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
                btn.focus();
            }
        });
    });
});
(function () {
    var mobileToggle = document.getElementById('mobileNavToggle');
    var mobileNav = document.getElementById('mobileNav');
    var closeBtn = document.getElementById('closeMobileNav');

    function openMobileNav() {
        mobileNav.setAttribute('aria-hidden', 'false');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // put keyboard focus inside menu
        var firstFocusable = mobileNav.querySelector('summary, a, button');
        if (firstFocusable) firstFocusable.focus();
    }

    function closeMobileNav() {
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        mobileToggle.focus();
    }

    mobileToggle && mobileToggle.addEventListener('click', function () {
        var hidden = mobileNav.getAttribute('aria-hidden') === 'true';
        if (hidden) openMobileNav();
        else closeMobileNav();
    });

    closeBtn && closeBtn.addEventListener('click', closeMobileNav);

    // close when click on backdrop
    mobileNav && mobileNav.addEventListener('click', function (e) {
        if (e.target === mobileNav) closeMobileNav();
    });

    // close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.getAttribute('aria-hidden') === 'false') {
            closeMobileNav();
        }
    });
})();

(function () {
    const toggleBtn = document.getElementById('mobileSearchToggle');
    const overlay = document.getElementById('mobileSearchOverlay');
    const closeBtn = document.getElementById('closeMobileSearch');
    const clearBtn = document.getElementById('clearMobileSearch');
    const input = document.getElementById('mobileSearchInput');
    const resultsList = document.getElementById('mobileSearchResultsList');
    const resultsCount = document.getElementById('mobileSearchResultsCount');

    // Simulated data
    const mockData = [
        { title: '電腦教室｜極簡風簡報技巧', url: '#', meta: '2025-12-14 • 教學' },
        { title: 'AI 新品：快速上手指南', url: '#', meta: '2025-12-10 • AI' },
        { title: '雲端部署最佳實務', url: '#', meta: '2025-11-30 • Cloud' },
        { title: '資安警示：避免這些常見錯誤', url: '#', meta: '2025-11-22 • 資安' },
        { title: '永續 IT：綠色設計入門', url: '#', meta: '2025-10-07 • 永續IT' },
        { title: '研討會：企業數位轉型回顧', url: '#', meta: '2025-09-18 • 研討會' },
        { title: '專題：醫療 IT 創新應用', url: '#', meta: '2025-08-12 • 醫療IT' },
        { title: '工具推薦：生產力提升插件', url: '#', meta: '2025-07-01 • 工具' }
    ];

    function openOverlay() {
        overlay.style.display = 'block';
        overlay.setAttribute('aria-hidden', 'false');
        input.value = '';
        renderResults(mockData.slice(0, 6), '為您推薦');
        setTimeout(() => input.focus(), 100);
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeyDown);
    }

    function closeOverlay() {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        resultsList.innerHTML = '';
        resultsCount.textContent = '';
        document.body.style.overflow = '';
        if (toggleBtn) toggleBtn.focus();
        document.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') closeOverlay();
    }

    function renderResults(items, label) {
        resultsList.innerHTML = '';
        if (!items || items.length === 0) {
            resultsCount.textContent = '找不到結果';
            return;
        }
        resultsCount.textContent = label ? `${label}（${items.length}）` : `找到 ${items.length} 筆結果`;
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.url}"><strong>${escapeHtml(item.title)}</strong><div class="search-results-meta">${escapeHtml(item.meta || '')}</div></a>`;
            resultsList.appendChild(li);
        });
    }

    function escapeHtml(text) {
        return String(text).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    }

    function doSearch(query) {
        const q = (query || '').trim().toLowerCase();
        if (q === '') {
            // show recommendations when empty
            renderResults(mockData.slice(0, 6), '為您推薦');
            return;
        }
        const filtered = mockData.filter(item => item.title.toLowerCase().includes(q) || (item.meta || '').toLowerCase().includes(q));
        renderResults(filtered, '搜尋結果');
    }

    // Event bindings
    if (toggleBtn) toggleBtn.addEventListener('click', (e) => { e.preventDefault(); openOverlay(); });
    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
    if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; input.focus(); doSearch(''); });

    let debounceTimer = null;
    input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => doSearch(e.target.value), 180);
    });

    // Close when clicking outside the inner dialog
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
    });

    // Accessibility: prevent underlying content from being focusable while open
    overlay.addEventListener('transitionend', () => { /* placeholder if needed */ });

})();