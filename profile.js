document.addEventListener('DOMContentLoaded', ()=>{
  const user = read('skydealUser', {name:'Руслан', email:'ruslan@example.com', orders:3});
  const history = read('skydealHistory', [
    {id:'SD-245991', product:{title:'Ташкент → Стамбул', meta:'Turkish Airlines · 2026-05-10'}, date:'10.04.2026, 13:05'},
    {id:'SD-921145', product:{title:'Antalya Relax Week', meta:'Турция · 7 дней'}, date:'04.04.2026, 18:20'}
  ]);
  const stats = document.getElementById('profileStats');
  if(stats) stats.innerHTML = `<div class="mini-card"><strong>${user.name}</strong><span class="muted">Пользователь</span></div><div class="mini-card"><strong>${history.length}</strong><span class="muted">Заказов</span></div><div class="mini-card"><strong>${getDiscount(user.orders)}%</strong><span class="muted">Текущая скидка</span></div><div class="mini-card"><strong>${user.email}</strong><span class="muted">Email</span></div>`;
  const list = document.getElementById('historyList');
  if(list) list.innerHTML = history.map(item => `<div class="history-item"><div><strong>${item.id}</strong><div>${item.product.title}</div><div class="muted small">${item.product.meta}</div></div><div class="muted">${item.date}</div><span class="pill badge-success">Подтверждено</span></div>`).join('');
});
