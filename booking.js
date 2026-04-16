function selectedProduct(){
  const params = new URLSearchParams(location.search);
  if(params.get('flight')){
    const f = window.FLIGHTS.find(x => x.id === Number(params.get('flight')));
    return f ? {type:'flight', title:`${f.from} → ${f.to}`, price:f.price, meta:f.airline + ' · ' + f.date} : null;
  }
  if(params.get('tour')){
    const t = window.TOURS.find(x => x.id === Number(params.get('tour')));
    return t ? {type:'tour', title:t.title, price:t.price, meta:`${t.country} · ${t.days} дней`} : null;
  }
  return {type:'flight', title:'Ташкент → Стамбул', price:2400000, meta:'Turkish Airlines · 2026-05-10'};
}
function renderBookingSummary(){
  const box = document.getElementById('bookingSummary'); if(!box) return;
  const user = read('skydealUser', {orders:3});
  const product = selectedProduct();
  const discount = getDiscount(user.orders);
  const baggage = Number(document.getElementById('baggage')?.value || 0);
  const final = Math.round(product.price + baggage - product.price * discount / 100);
  box.innerHTML = `<h3>Ваш заказ</h3><ul><li><span>Вы выбрали</span><strong>${product.title}</strong></li><li><span>Детали</span><strong>${product.meta}</strong></li><li><span>Базовая цена</span><strong>${formatPrice(product.price)}</strong></li><li><span>Доп. багаж</span><strong>${formatPrice(baggage)}</strong></li><li><span>Скидка</span><strong>${discount}%</strong></li></ul><div style="height:14px"></div><div class="total">${formatPrice(final)}</div>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderBookingSummary();
  document.getElementById('baggage')?.addEventListener('input', renderBookingSummary);
  const form = document.getElementById('bookingForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const user = read('skydealUser', {name:'Руслан', email:'ruslan@example.com', orders:3});
    const product = selectedProduct();
    const booking = {
      id: 'SD-' + Math.floor(Math.random()*900000 + 100000),
      customer: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      product,
      baggage: Number(form.baggage.value || 0),
      date: new Date().toLocaleString('ru-RU'),
      discount: getDiscount(user.orders)
    };
    save('skydealLastBooking', booking);
    const history = read('skydealHistory', []); history.unshift(booking); save('skydealHistory', history);
    location.href = 'confirmation.html';
  });
});
