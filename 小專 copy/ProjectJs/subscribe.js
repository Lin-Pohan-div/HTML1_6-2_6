/* Inject corrected CSS from JS so this single file is valid JS.
   Alternatively move this CSS into a separate subscribe.css and include it via <link>.
*/


/* Insert styles into document if running in a browser */
if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-origin', 'subscribe.js');
    styleEl.textContent = subscribeStyles;
    document.head.appendChild(styleEl);
}

function subscribe(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    if (!email) {
        alert('請輸入 Email');
        return;
    }
    // 暫時回饋：可改為實際 API 呼叫
    alert('已訂閱：' + email);
    form.reset();
}