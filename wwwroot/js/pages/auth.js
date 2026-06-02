import { apiFetch, setStorageItem } from '../utils.js';

export const initAuthForms = () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("loginName").value;
            const password = document.getElementById("loginPassword").value;
            const msgArea = document.getElementById("auth-message-area");
            
            msgArea.style.display = "block";
            const { status, data } = await apiFetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password })
            });

            if (status === 200) {
                sessionStorage.setItem("loggedInUser", name);
                msgArea.className = "alert-success";
                msgArea.innerHTML = "✅ " + data.message;
                setTimeout(() => window.location.href = "/Home/Index", 1000);
            } else {
                msgArea.className = "alert-danger";
                msgArea.innerHTML = "❌ " + (data.error || "Giriş başarısız.");
            }
        });
    }

    if (registerForm) {
        const phoneInput = document.getElementById("regPhone");
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let x = e.target.value.replace(/\D/g, '');
                if (x.length > 0 && x[0] === '0') {
                    let match = x.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                    e.target.value = !match[2] ? match[1] : `${match[1]} (${match[2]}${match[3] ? ') ' + match[3] : ''}${match[4] ? ' ' + match[4] : ''}${match[5] ? ' ' + match[5] : ''}`;
                } else {
                    let match = x.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                    e.target.value = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
                }
            });
        }

        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const payload = {
                name: document.getElementById("regName").value,
                password: document.getElementById("regPassword").value,
                firstname: document.getElementById("regFirstName")?.value || "",
                surname: document.getElementById("regSurname")?.value || "",
                age: document.getElementById("regAge")?.value || 0,
                email: document.getElementById("regEmail")?.value || "",
                phone: document.getElementById("regPhone")?.value || ""
            };
            
            const msgArea = document.getElementById("auth-message-area");
            msgArea.style.display = "block";

            const { status, data } = await apiFetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (status === 200) {
                msgArea.className = "alert-success";
                msgArea.innerHTML = "✅ " + data.message;
                setTimeout(() => window.location.href = "/Home/Login", 1500);
            } else {
                msgArea.className = "alert-danger";
                msgArea.innerHTML = "❌ " + (data.error || "Kayıt başarısız.");
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", initAuthForms);
