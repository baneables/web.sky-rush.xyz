document.addEventListener('DOMContentLoaded', () => {
    const ADMIN_EMAIL = 'sky-rushnetwork@hotmail.com';
    const ADMIN_PASS = 'f.m23912';

    const loginSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    const loginForm = document.getElementById('admin-login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const announcementForm = document.getElementById('announcement-form');
    const announcementsList = document.getElementById('announcements-list');
    const loginError = document.getElementById('login-error');

    // --- Funciones de UI ---
    const showAdminPanel = () => {
        loginSection.style.display = 'none';
        adminPanel.style.display = 'block';
    };

    const showLoginForm = () => {
        loginSection.style.display = 'block';
        adminPanel.style.display = 'none';
        sessionStorage.removeItem('isAdminLoggedIn');
    };

    // --- Lógica de Anuncios ---
    const getAnnouncements = () => {
        const announcements = localStorage.getItem('skyRushAnnouncements');
        return announcements ? JSON.parse(announcements) : [];
    };

    const saveAnnouncements = (announcements) => {
        localStorage.setItem('skyRushAnnouncements', JSON.stringify(announcements));
    };

    const renderAnnouncements = () => {
        announcementsList.innerHTML = '';
        const announcements = getAnnouncements();

        if (announcements.length === 0) {
            announcementsList.innerHTML = '<p>No hay anuncios por el momento.</p>';
            return;
        }

        announcements.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha

        announcements.forEach(ann => {
            const el = document.createElement('div');
            el.className = 'announcement';
            el.innerHTML = `
                <div class="announcement-header">
                    <h3 class="announcement-title">${ann.title}</h3>
                    <span class="announcement-date">${new Date(ann.date).toLocaleDateString()}</span>
                </div>
                <div class="announcement-body">${ann.body.replace(/\n/g, '<br>')}</div>
            `;
            announcementsList.appendChild(el);
        });
    };

    // --- Lógica de Autenticación ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginError.style.display = 'none';
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            showAdminPanel();
        } else {
            loginError.style.display = 'block';
        }
    });

    logoutBtn.addEventListener('click', () => {
        showLoginForm();
    });

    announcementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('announcement-title').value;
        const body = document.getElementById('announcement-body').value;

        const newAnnouncement = {
            title,
            body,
            date: new Date().toISOString()
        };

        const announcements = getAnnouncements();
        announcements.push(newAnnouncement);
        saveAnnouncements(announcements);

        renderAnnouncements();
        announcementForm.reset();
    });

    // --- Inicialización ---
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        showAdminPanel();
    } else {
        showLoginForm();
    }
    
    renderAnnouncements();
});

