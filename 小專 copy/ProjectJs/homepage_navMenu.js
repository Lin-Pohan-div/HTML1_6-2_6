
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

// scroll to the subscribe section and focus the email input to avoid undefined function errors
function openModal() {
    const section = document.getElementById('subscribe');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const input = section.querySelector('input[type="email"]');
        if (input) input.focus();
    }
}
