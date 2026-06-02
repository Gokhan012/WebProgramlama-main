// theme.js
const isDark = localStorage.getItem('theme') === 'dark';
if (isDark) {
    document.documentElement.classList.add('dark-mode');
}

function updateTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    document.querySelectorAll('.themeToggleBtn').forEach(btn => {
        btn.innerHTML = isDark ? '☀️ Aydınlık' : '🌙 Karanlık';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTheme();

    document.querySelectorAll('.themeToggleBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const isDarkNow = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkNow ? 'light' : 'dark');
            updateTheme();
        });
    });
});
