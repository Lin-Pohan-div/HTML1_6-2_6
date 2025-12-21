
// Open the full screen search box with ARIA and focus management
function openSearch() {
    var overlay = document.getElementById("myOverlay");
    if (!overlay) return;
    overlay.style.display = "block";
    overlay.setAttribute("aria-hidden", "false");
    // prevent background scrolling
    document.body.style.overflow = "hidden";
    // focus the input
    var input = document.getElementById("overlay-search-input");
    if (input) input.focus();
}

// Close the full screen search box and restore focus
function closeSearch() {
    var overlay = document.getElementById("myOverlay");
    if (!overlay) return;
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    var openBtn = document.getElementById("openSearchBtn");
    if (openBtn) openBtn.focus();
}

// Close overlay on Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        var overlay = document.getElementById("myOverlay");
        if (overlay && overlay.style.display === "block") {
            closeSearch();
        }
    }
});


// 範例資料（模擬後端回傳）
(function () {
    
    const SAMPLE_RESULTS = [
        { title: 'PAPAYA 電腦教室｜極簡風簡報技巧', snippet: '快速打造專業簡報的 7 個小技巧...', date: '2025-12-14', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=200&q=60', url: '#' },
        { title: '掌機製造商 Ayaneo 首款手機曝光', snippet: 'Ayaneo 的第一支手機主打遊戲與生產力...', date: '2025-12-12', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=60', url: '#' },
        { title: 'OpenAI 測試 ChatGPT 成人模式：驗證機制說明', snippet: '了解新的驗證流程與使用場景...', date: '2025-12-10', img: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=200&q=60', url: '#' },
        { title: '雲端部署最佳實務', snippet: '從架構到成本控制的完整檢查清單...', date: '2025-12-05', img: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=200&q=60', url: '#' },
        { title: 'Oura Ring 4 Ceramic 智慧陶瓷戒指亮相評測', snippet: '深入解析新一代睡眠與健康追蹤功能...', date: '2025-12-08', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=200&q=60', url: '#' }
    ];

    // 取用頁面中的輸入，覆寫 / 替換原本的 submit handler
    window.performOverlaySearch = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        const q = (document.getElementById('overlay-search-input') || {}).value || '';
        const normalized = q.trim().toLowerCase();
        const results = normalized
            ? SAMPLE_RESULTS.filter(r => (r.title + ' ' + r.snippet).toLowerCase().includes(normalized))
            : SAMPLE_RESULTS.slice(); // 若無輸入則顯示完整模擬清單
        renderResults(results, normalized);
        return false; // 阻止表單實際送出
    };

    function renderResults(results, query) {
        const container = document.getElementById('searchResults');
        const list = document.getElementById('searchResultsList');
        const count = document.getElementById('searchResultsCount');

        list.innerHTML = '';
        if (!results.length) {
            count.textContent = `沒有找到符合「${query}」的結果。`;
            const no = document.createElement('div');
            no.className = 'no-results';
            no.textContent = '沒有結果。請嘗試其他關鍵字。';
            list.appendChild(no);
        } else {
            count.textContent = `找到 ${results.length} 則結果`;
            results.forEach((r, i) => {
                const li = document.createElement('li');
                li.innerHTML = `
    <img class="result-thumb" src="${r.img}" alt="">
        <div class="result-body">
            <a class="result-link" href="${r.url}" tabIndex="0"><div class="result-title">${r.title}</div></a>
            <p class="result-snippet">${r.snippet}</p>
            <div class="result-meta">${r.date}</div>
        </div>
        `;
                // 第一個可聚焦的連結以便鍵盤使用者立即進入
                list.appendChild(li);
            });
        }

        // 顯示 panel 並管理可見性屬性
        container.style.display = 'block';
        container.setAttribute('aria-hidden', 'false');
        // focus 第一個連結
        const firstLink = container.querySelector('.result-link');
        if (firstLink) firstLink.focus();
    }

    // 隱藏結果
    window.hideSearchResults = function () {
        const container = document.getElementById('searchResults');
        if (!container) return;
        container.style.display = 'none';
        container.setAttribute('aria-hidden', 'true');
        // 回到搜尋欄焦點
        const input = document.getElementById('overlay-search-input');
        if (input) input.focus();
    };

    // 當 overlay 關閉（樣式變更）時自動隱藏結果，避免結果留在畫面上
    const overlay = document.getElementById('myOverlay');
    if (overlay && window.MutationObserver) {
        const obs = new MutationObserver(() => {
            if (overlay.style.display !== 'block') hideSearchResults();
        });
        obs.observe(overlay, { attributes: true, attributeFilter: ['style'] });
    }

    // 快速鍵：在結果上使用上下鍵切換，Esc 隱藏結果（不覆寫原來的 Esc 處理）
    document.addEventListener('keydown', function (e) {
        const container = document.getElementById('searchResults');
        if (!container || container.style.display !== 'block') return;
        const links = Array.from(container.querySelectorAll('.result-link'));
        const active = document.activeElement;
        if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault();
            const idx = Math.max(0, links.indexOf(active) + 1);
            (links[idx] || links[0])?.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'Up') {
            e.preventDefault();
            const idx = Math.max(0, links.indexOf(active) - 1);
            (links[idx] || links[links.length - 1])?.focus();
        } else if (e.key === 'Escape' || e.key === 'Esc') {
            hideSearchResults();
        }
    });

})();