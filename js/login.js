import { mockCurrentUser } from './mockData.js';
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const loginError = document.getElementById('loginError');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredEmail = emailInput?.value.trim();
            if (enteredEmail === mockCurrentUser.email_uni) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(mockCurrentUser));
                const existingReviews = localStorage.getItem('user_reviews');
                if (!existingReviews || existingReviews === '[]') {
                    localStorage.setItem('user_reviews', JSON.stringify(mockCurrentUser.reviews));
                }
                window.location.href = './index.html';
            }
            else {
                loginError.innerText = 'ไม่พบอีเมลนี้ในระบบ หรือกรอกอีเมลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
                emailInput.focus();
            }
        });
    }
});
//# sourceMappingURL=login.js.map