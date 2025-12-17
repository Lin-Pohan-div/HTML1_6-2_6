
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
