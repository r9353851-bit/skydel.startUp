function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function read(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function formatPrice(n){ return new Intl.NumberFormat('ru-RU').format(n) + ' сум'; }
function getDiscount(count){ if(count >= 3) return 15; if(count === 2) return 10; if(count === 1) return 5; return 0; }
function applyLayout(){
  const year = document.querySelector('[data-year]'); if(year) year.textContent = new Date().getFullYear();
  const user = read('skydealUser', {name:'Гость', email:'guest@skydeal.uz', orders:3});
  const authName = document.querySelectorAll('[data-username]'); authName.forEach(el => el.textContent = user.name);
}
function createFlightCard(f){
  return `<article class="flight-card"><div class="flight-body"><span class="pill">${f.airline}</span><h3>${f.from} → ${f.to}</h3><div class="flight-meta"><span class="pill">${f.classType}</span><span class="pill">${f.baggage}</span><span class="pill">${f.stops}</span></div><div class="timeline"><div><div class="big">${f.departure}</div><div class="small muted">${f.from}</div></div><div><div class="line"></div><div class="small muted center">${f.duration} · ${f.date}</div></div><div><div class="big">${f.arrival}</div><div class="small muted">${f.to}</div></div></div></div><div class="flight-body"><div class="small muted">Цена от</div><div class="big price">${formatPrice(f.price)}</div><div style="height:12px"></div><a class="btn btn-primary btn-full" href="flight-details.html?id=${f.id}">Подробнее</a></div></article>`;
}
function createTourCard(t){
  return `<article class="tour-card"><img src="${t.image}" alt="${t.title}"><div class="tour-body"><span class="pill">${t.country}</span><h3>${t.title}</h3><p class="muted">${t.desc}</p><div class="tour-meta"><span class="pill">${t.days} дней</span><span class="pill">${t.hotel}</span><span class="pill">⭐ ${t.rating}</span></div><div class="summary-row" style="justify-content:space-between;margin-top:14px"><strong class="price">${formatPrice(t.price)}</strong><a class="btn btn-soft" href="booking.html?tour=${t.id}">Купить тур</a></div></div></article>`;
}
function populateFeatured(){
  const flightsBox = document.getElementById('featuredFlights'); if(flightsBox && window.FLIGHTS) flightsBox.innerHTML = window.FLIGHTS.slice(0,3).map(createFlightCard).join('');
  const toursBox = document.getElementById('featuredTours'); if(toursBox && window.TOURS) toursBox.innerHTML = window.TOURS.slice(0,3).map(createTourCard).join('');
}
function searchFormHandler(){
  const form = document.getElementById('searchForm'); if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const params = new URLSearchParams({
      from: form.from.value.trim(),
      to: form.to.value.trim(),
      date: form.date.value,
      classType: form.classType.value
    });
    location.href = 'results.html?' + params.toString();
  });
}
function discountChecker(){
  const btn = document.getElementById('checkDiscountBtn'); if(!btn) return;
  btn.addEventListener('click', ()=>{
    const orders = Number(document.getElementById('orderCount').value || 0);
    document.getElementById('discountResult').textContent = `Скидка клиента: ${getDiscount(orders)}%`;
  });
}
applyLayout();
document.addEventListener('DOMContentLoaded', ()=>{applyLayout();populateFeatured();searchFormHandler();discountChecker();});


const dateInput = document.getElementById("date");

if (dateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dd = String(tomorrow.getDate()).padStart(2, "0");

  dateInput.value = `${yyyy}-${mm}-${dd}`;
}