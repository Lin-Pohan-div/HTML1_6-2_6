(function () {
    // 自動填入今天日期 (YYYY/MM/DD) 與 datetime 屬性 (YYYY-MM-DD)
    const t = document.getElementById('pubDate');
    if (t) {
        const d = new Date();
        const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
        const iso = `${y}-${m}-${day}`, disp = `${y}/${m}/${day}`;
        t.textContent = '發布：' + disp;
        t.setAttribute('datetime', iso);
    }
})();