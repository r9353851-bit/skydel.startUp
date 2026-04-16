document.addEventListener('DOMContentLoaded', ()=>{
  const booking = read('skydealLastBooking', null);
  const box = document.getElementById('confirmationBox');
  if(!box) return;
  if(!booking){ box.innerHTML = '<div class="empty-state">Нет последнего заказа. Сначала оформите бронирование.</div>'; return; }
  const total = Math.round(booking.product.price + booking.baggage - booking.product.price * booking.discount / 100);
  box.innerHTML = `<span class="pill badge-success">Оплата принята</span><h2 style="margin:12px 0">Заказ ${booking.id}</h2><p class="muted">Спасибо, ${booking.customer}. Билет сформирован и готов к показу.</p><div class="grid-3" style="margin-top:18px"><div class="mini-card"><strong>${booking.product.title}</strong><span class="muted">Маршрут / тур</span></div><div class="mini-card"><strong>${booking.date}</strong><span class="muted">Дата покупки</span></div><div class="mini-card"><strong>${formatPrice(total)}</strong><span class="muted">Итоговая сумма</span></div></div><div style="height:18px"></div><div class="summary-row"><a class="btn btn-primary" href="profile.html">Перейти в профиль</a><a class="btn btn-soft" href="index.html">На главную</a></div>`;
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
