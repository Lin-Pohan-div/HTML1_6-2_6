document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('floatingLogoBtn');
    const target = document.getElementById('Logo');
    if (!btn || !target) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = target.querySelector('a') || target;
        if (link) {
            link.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // 若有可 focus 的元素則聚焦，提升無障礙
            const focusable = link.querySelector('a,button,[tabindex]') || link;
            if (focusable && typeof focusable.focus === 'function') focusable.focus({ preventScroll: true });
        }
    });

    // 觀察 Logo 可見性以切換按鈕狀態
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) btn.classList.add('is-active');
            else btn.classList.remove('is-active');
        });
    }, { threshold: 0.5 });

    io.observe(target);
});