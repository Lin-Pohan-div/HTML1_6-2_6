/* Inject corrected CSS from JS so this single file is valid JS.
   Alternatively move this CSS into a separate subscribe.css and include it via <link>.
*/
const subscribeStyles = `
#subscribe {
    background: linear-gradient(180deg, #fff 0%, #fff 100%);
    color: black;
    padding: 24px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid #eee;
    box-sizing: border-box;
    min-width: 240px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.subscribe-inner {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

.subscribe-inner h1 {
    margin: 0 0 12px;
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: .6px;
}

.subscribe-inner p {
    margin: 0 0 22px;
    color: rgba(0, 0, 0, 0.75);
    font-size: 1rem;
    text-align: center;
}

.subscribe-form {
    display: inline-flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
    background: transparent;
}

.subscribe-form input[type="email"] {
    padding: 12px 14px;
    border-radius: 12px;
    border: none;
    width: 240px;
    max-width: calc(100% - 140px);
    font-size: 1rem;
    outline: none;
    box-shadow: 0 6px 20px rgba(11, 37, 80, .08), inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.subscribe-form input::placeholder {
    color: rgba(0, 0, 0, 0.5);
}

.subscribe-form button {
    background: linear-gradient(180deg, #3ea0ff, #2b84f2);
    color: #fff;
    border: none;
    padding: 12px 18px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(43, 132, 242, .18);
    transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
}

.subscribe-form button:hover {
    transform: translateY(-2px);
}

.subscribe-form button:active {
    transform: translateY(0);
}

@media (max-width: 700px) {
    .subscribe-inner h1 {
        font-size: 1.3rem;
    }

    .subscribe-form {
        display: block;
    }

    .subscribe-form input[type="email"],
    .subscribe-form button {
        width: 100%;
        max-width: none;
        display: block;
    }

    .subscribe-form button {
        margin-top: 10px;
    }
}
`;

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