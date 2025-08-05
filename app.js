document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggler ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggleBtn.textContent = '🌙';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggleBtn.textContent = '🌙';
        } else {
            themeToggleBtn.textContent = '☀️';
        }
        localStorage.setItem('theme', theme);
    });

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('header nav');
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Change hamburger to X and back
            if (nav.classList.contains('active')) {
                mobileMenuBtn.textContent = '✕';
            } else {
                mobileMenuBtn.textContent = '☰';
            }
        });
    }

    // --- Copy IP Button ---
    const copyIpBtn = document.getElementById('copy-ip-btn');
    if (copyIpBtn) {
        copyIpBtn.addEventListener('click', () => {
            const ipAddress = document.getElementById('ip-address').innerText;
            navigator.clipboard.writeText(ipAddress).then(() => {
                const originalText = copyIpBtn.innerText;
                copyIpBtn.innerText = '¡Copiado!';
                copyIpBtn.disabled = true;
                setTimeout(() => {
                    copyIpBtn.innerText = originalText;
                    copyIpBtn.disabled = false;
                }, 2000);
            });
        });
    }
    
    // --- Active Nav Link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Minecraft Server Ping API ---
    const playerCountEl = document.getElementById('player-count-num');
    if(playerCountEl) {
        const serverIp = "play.sky-rush.xyz";
        // Note: The API might be blocked by CORS in a local environment. It should work on a deployed server.
        // It might also fail if the server is offline or doesn't allow pings.
        fetch(`https://api.minetools.eu/ping/${serverIp}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if(data.players && data.players.online !== undefined) {
                    playerCountEl.textContent = `${data.players.online} / ${data.players.max}`;
                } else {
                    playerCountEl.textContent = 'Offline';
                }
            })
            .catch(error => {
                console.error('Failed to fetch player count:', error);
                playerCountEl.textContent = 'Error';
            });
    }
});