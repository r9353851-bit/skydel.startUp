document.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const user = {name:'Руслан', email:loginForm.email.value || 'ruslan@example.com', orders:3};
    save('skydealUser', user); location.href = 'profile.html';
  });
  const registerForm = document.getElementById('registerForm');
  registerForm?.addEventListener('submit', e => {
    e.preventDefault();
    const user = {name:registerForm.name.value, email:registerForm.email.value, orders:0};
    save('skydealUser', user); save('skydealHistory', []); location.href = 'profile.html';
  });
});
