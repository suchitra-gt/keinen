// Auth check and navigation update script
document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    checkPageProtection();
});

function updateNav() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    const loggedInUser = JSON.parse(localStorage.getItem('keinen_logged_in'));
    
    // Remove existing Login/Register/Logout buttons to avoid duplicates if script runs multiple times
    const authButtons = navLinks.querySelectorAll('.auth-btn');
    authButtons.forEach(btn => btn.remove());

    if (loggedInUser) {
        // User is logged in
        const logoutLi = document.createElement('li');
        logoutLi.className = 'auth-btn';
        logoutLi.innerHTML = `<a href="#" onclick="handleLogout()" class="btn-s" style="padding: 10px 20px; font-size: 11px; margin-left: 10px; border-color: var(--accent-1); color: var(--accent-1);">Logout (${loggedInUser.name.split(' ')[0]})</a>`;
        navLinks.appendChild(logoutLi);
    } else {
        // User is not logged in
        const loginLi = document.createElement('li');
        loginLi.className = 'auth-btn';
        loginLi.innerHTML = `<a href="auth.html" class="nav-link-item">Login</a>`;
        
        const registerLi = document.createElement('li');
        registerLi.className = 'auth-btn';
        registerLi.innerHTML = `<a href="auth.html" class="btn-s" style="padding: 10px 20px; font-size: 11px; margin-left: 10px; border-color: var(--accent-1); color: var(--accent-1);">Register</a>`;
        
        navLinks.appendChild(loginLi);
        navLinks.appendChild(registerLi);
    }
}

function handleLogout() {
    localStorage.removeItem('keinen_logged_in');
    window.location.href = 'index.html';
}

function checkPageProtection() {
    const protectedPages = ['services.html', 'industries.html', 'innovation.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage)) {
        const loggedInUser = localStorage.getItem('keinen_logged_in');
        if (!loggedInUser) {
            sessionStorage.setItem('auth_redirect', currentPage);
            window.location.href = 'auth.html';
        }
    }
}
