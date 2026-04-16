document.addEventListener('DOMContentLoaded', ()=>{
  const user = read('skydealUser', {orders:3});
  const box = document.getElementById('loyaltyBox');
  if(box) box.innerHTML = `<h3>Ваш уровень лояльности</h3><p class="muted">У вас ${user.orders} покупки. Активная скидка: <strong>${getDiscount(user.orders)}%</strong>.</p><div style="height:14px"></div><div class="summary-row"><span class="pill badge-blue">Новичок 5%</span><span class="pill badge-warn">Постоянный 10%</span><span class="pill badge-success">VIP 15%</span></div>`;
});
