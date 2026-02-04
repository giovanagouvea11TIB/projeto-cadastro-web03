document.addEventListener('DOMContentLoaded', () => {
    const themeParams = {
        key: 'lumina-theme',
        light: 'light',
        dark: 'dark'
    };

    const savedTheme = localStorage.getItem(themeParams.key);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateToggleIcon(savedTheme === themeParams.dark);
    } else if (prefersDark) {
        document.body.classList.add(themeParams.dark);
        updateToggleIcon(true);
    } else {
        document.body.classList.add(themeParams.light);
        updateToggleIcon(false);
    }

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains(themeParams.dark);

            if (isDark) {
                document.body.classList.replace(themeParams.dark, themeParams.light);
                localStorage.setItem(themeParams.key, themeParams.light);
                updateToggleIcon(false);
            } else {
                document.body.classList.replace(themeParams.light, themeParams.dark);
                localStorage.setItem(themeParams.key, themeParams.dark);
                updateToggleIcon(true);
            }
        });
    }

    function updateToggleIcon(isDark) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        // Simple text or character icon change
        btn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
        btn.setAttribute('aria-label', isDark ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro');
    }
});
