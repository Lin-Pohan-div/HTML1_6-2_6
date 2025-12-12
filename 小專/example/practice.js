// 手機選單開合
const hamburger = document.querySelector('.hamburger');
const drawer = document.getElementById('drawer');
hamburger.addEventListener('click', () => {
    drawer.style.display = drawer.style.display === 'none' || getComputedStyle(drawer).display === 'none'
        ? 'flex' : 'none';
});

// 目的地下拉篩選
const ddBtn = document.getElementById('ddBtn');
const ddMenu = document.getElementById('ddMenu');
const destGrid = document.getElementById('destGrid');
ddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ddMenu.style.display = ddMenu.style.display === 'block' ? 'none' : 'block';
});
document.addEventListener('click', () => ddMenu.style.display = 'none');
ddMenu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        ddBtn.textContent = btn.textContent + ' ▾';
        destGrid.querySelectorAll('.dest-card').forEach(card => {
            card.style.display = (filter === 'popular') ? '' : (card.dataset.type === filter ? '' : 'none');
        });
        ddMenu.style.display = 'none';
    });
});

// 最新文章展開
const readMore = document.getElementById('readMore');
const storyList = document.getElementById('storyList');
readMore.addEventListener('click', () => {
    storyList.querySelectorAll('[data-extra]').forEach(el => el.hidden = false);
    readMore.disabled = true;
    readMore.textContent = 'All caught up';
});

// Highlights 簡易切換
const swapBtn = document.getElementById('swapHighlight');
const hl = document.getElementById('highlights');
let swapped = false;
swapBtn.addEventListener('click', () => {
    swapped = !swapped;
    const cards = hl.querySelectorAll('.hl-card .hl-media');
    cards.forEach((m, i) => {
        m.textContent = swapped ? (i === 0 ? '▶ Video' : 'Image') : (i === 0 ? 'Image' : '▶ Video');
    });
});

// Newsletter 訂閱（假驗證）
const emailInput = document.getElementById('email');
const subscribeBtn = document.getElementById('subscribeBtn');
const subMsg = document.getElementById('subMsg');
subscribeBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        subMsg.textContent = '請輸入有效的 Email。';
        subMsg.style.color = 'red';
    } else {
        subMsg.textContent = '訂閱成功！請至信箱確認。';
        subMsg.style.color = 'green';
    }
});
