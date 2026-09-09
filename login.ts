import { mockCurrentUser } from './mockData.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); 
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(mockCurrentUser));
      window.location.href = './index.html'; 
    });
  }
});