(function () {
    const container = document.querySelector('.overlay-content');
    if (!container) return;

    // build form
    const form = document.createElement('form');
    form.setAttribute('role', 'search');
    form.setAttribute('aria-label', '搜尋');
    form.className = 'overlay-form';
    // prevent native submit and forward to performOverlaySearch
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (typeof performOverlaySearch === 'function') {
            performOverlaySearch(e);
        }
    });

    const input = document.createElement('input');
    input.id = 'overlay-search-input';
    input.type = 'text';
    input.name = 'search';
    input.placeholder = 'Search..';
    input.setAttribute('aria-label', '搜尋');
    input.autocomplete = 'off';

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'search-submit';
    button.setAttribute('aria-label', '提交搜尋');
    button.innerHTML = '<span aria-hidden="true">🔍</span>';

    form.appendChild(input);
    form.appendChild(button);

    // insert before the following script (where the original form was)
    const nextScript = container.querySelector('script');
    if (nextScript) container.insertBefore(form, nextScript);
    else container.appendChild(form);

    // optional: simple debounce live-search to call performOverlaySearch while typing
    let timer;
    input.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            if (typeof performOverlaySearch === 'function') performOverlaySearch();
        }, 220);
    });
})();

// Handle overlay search submission; return true to allow normal submit,
// or call e.preventDefault() and handle via JavaScript.
function performOverlaySearch(e) {
    // e.preventDefault(); // uncomment to handle the search with JS
    return true;
}