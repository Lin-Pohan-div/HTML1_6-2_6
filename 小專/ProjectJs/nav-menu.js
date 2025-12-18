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