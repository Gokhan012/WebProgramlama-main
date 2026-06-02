import { getStorageItem } from '../utils.js';

export const AuthHandler = {
    getUser: () => sessionStorage.getItem('loggedInUser'),
    
    logout: () => {
        sessionStorage.removeItem("loggedInUser");
        window.location.href = "/Home/Login";
    },

    updateNav: () => {
        const user = AuthHandler.getUser();
        const navSection = document.getElementById("nav-auth-section");
        if (!navSection) return;

        if (user) {
            let adminBtnHtml = "";
            if (user.toLowerCase() === "admin") {
                adminBtnHtml = `<a href="/Home/Admin" class="restart-btn" style="text-decoration: none; color: #10b981; border-color: #a7f3d0; background: #ecfdf5; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600;">⚙️ Admin Paneli</a>`;
            }

            navSection.innerHTML = `
                ${adminBtnHtml}
                <a href="/Home/Profile" class="restart-btn" style="text-decoration: none; color: #3b82f6; border-color: #bfdbfe; background: #eff6ff; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600;">👤 Profil</a>
                <button id="navLogoutBtn" class="restart-btn" style="color: #ef4444; border-color: #fecaca; background: #fef2f2; cursor: pointer; padding: 8px 16px;">
                    <span class="icon">🚪</span> Çıkış Yap
                </button>
            `;
            document.getElementById("navLogoutBtn").addEventListener("click", AuthHandler.logout);
        } else {
            const isLogin = window.location.pathname.toLowerCase().includes("register");
            if (!isLogin) {
                navSection.innerHTML = `<a href="/Home/Register" class="restart-btn" style="text-decoration: none; color: #ffffff; border-color: #2563eb; background: #3b82f6; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">Kayıt Ol</a>`;
            } else {
                navSection.innerHTML = `<a href="/Home/Login" class="restart-btn" style="text-decoration: none; color: #ffffff; border-color: #2563eb; background: #3b82f6; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">Giriş Yap</a>`;
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", AuthHandler.updateNav);
