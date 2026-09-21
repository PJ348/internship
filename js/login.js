import { mockCurrentUser } from './mockData.js';
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredEmail = emailInput.value.trim();
        const enteredPassword = passwordInput.value;
        if (enteredEmail === mockCurrentUser.email_uni && enteredPassword === mockCurrentUser.password) {
            const { password, ...safeUser } = mockCurrentUser;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(safeUser));
            window.location.href = './index.html';
        }
        else {
            loginError.textContent = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
            emailInput.focus();
        }
    });
});
//# sourceMappingURL=login.js.map