document.addEventListener('DOMContentLoaded', ()=>{
  const root = document.getElementById('flightDetails'); if(!root || !window.FLIGHTS) return;
  const id = Number(new URLSearchParams(location.search).get('id'));
  const f = window.FLIGHTS.find(x => x.id === id) || window.FLIGHTS[0];
  root.innerHTML = `<div class="form-card"><span class="pill">${f.airline}</span><h2 style="margin:12px 0">${f.from} → ${f.to}</h2><p class="muted">Дата: ${f.date}</p><div class="timeline"><div><div class="big">${f.departure}</div><div class="small muted">Вылет</div></div><div><div class="line"></div><div class="small muted center">${f.duration}</div></div><div><div class="big">${f.arrival}</div><div class="small muted">Прилет</div></div></div><div class="grid-3" style="margin-top:18px"><div class="mini-card"><strong>${f.classType}</strong><span class="muted">Класс</span></div><div class="mini-card"><strong>${f.baggage}</strong><span class="muted">Багаж</span></div><div class="mini-card"><strong>${f.stops}</strong><span class="muted">Пересадки</span></div></div></div>`;
  const summary = document.getElementById('detailsSummary');
  summary.innerHTML = `<h3>Информация</h3><ul><li><span>Авиакомпания</span><strong>${f.airline}</strong></li><li><span>Маршрут</span><strong>${f.from} → ${f.to}</strong></li><li><span>Дата</span><strong>${f.date}</strong></li><li><span>Цена</span><strong class="price">${formatPrice(f.price)}</strong></li></ul><div style="height:14px"></div><a class="btn btn-primary btn-full" href="booking.html?flight=${f.id}">Перейти к бронированию</a>`;
});
