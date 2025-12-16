
// 動態計算 .toc-wrap 的 top 與 max-height，確保在 header 高度變動時仍能貼齊並不會超出視窗
(function () {
    function updateTocPosition() {
        const toc = document.querySelector('.toc-wrap');
        if (!toc) return;
        const header = document.querySelector('header');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const offset = Math.round(Math.max(12, headerHeight + 8));
        toc.style.top = offset + 'px';
        toc.style.maxHeight = `calc(100vh - ${offset + 16}px)`;
    }
    window.addEventListener('load', updateTocPosition);
    window.addEventListener('resize', updateTocPosition);
    // 若動態改變 header（如展開式選單）需時常更新，可監聽 DOM 變化
    const header = document.querySelector('header');
    if (header && 'MutationObserver' in window) {
        const mo = new MutationObserver(updateTocPosition);
        mo.observe(header, { attributes: true, childList: true, subtree: true });
    }
    // 初次執行
    updateTocPosition();
})();

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sideBar');
    if (!container) return;
    const links = container.querySelectorAll('.toc a');
    if (!links.length) return;

    // 取得對應的 section 元素
    const sections = Array.from(links)
        .map(a => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);

    // 交叉觀察，當區塊進入視窗時標記對應連結為 active
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = container.querySelector(`.toc a[href="#${id}"]`);
            if (!link) return;
            if (entry.isIntersecting) {
                container.querySelectorAll('.toc a').forEach(a => a.classList.remove('is-active'));
                link.classList.add('is-active');
            }
        });
    }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 });

    sections.forEach(s => io.observe(s));

    // 點擊平滑捲動並設定 active
    links.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            links.forEach(l => l.classList.remove('is-active'));
            a.classList.add('is-active');
        });
    });
});
