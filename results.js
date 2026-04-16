const resultsContainer = document.getElementById("resultsContainer");
const resultsInfo = document.getElementById("resultsInfo");

const savedSearch = JSON.parse(localStorage.getItem("flightSearch"));

function normalizeText(text) {
  return String(text).trim().toLowerCase();
}

function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price) + " сум";
}

function renderFlights(list) {
  if (!resultsContainer) return;

  if (!list.length) {
    resultsContainer.innerHTML = `
      <div class="card">
        <h3>Билеты не найдены</h3>
        <p class="muted">Попробуй изменить город, дату или класс.</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = list.map(flight => {
    return `
      <div class="flight-card">
        <div class="flight-body">
          <h3>${flight.from} → ${flight.to}</h3>

          <div class="flight-meta">
            <span class="pill">${flight.airline}</span>
            <span class="pill">${flight.classType}</span>
            <span class="pill">${flight.date}</span>
          </div>

          <div class="timeline">
            <div>
              <div class="big">${flight.departure}</div>
              <div class="small muted">${flight.from}</div>
            </div>

            <div>
              <div class="line"></div>
              <div class="small muted center">${flight.duration}</div>
            </div>

            <div>
              <div class="big">${flight.arrival}</div>
              <div class="small muted">${flight.to}</div>
            </div>
          </div>
        </div>

        <div class="flight-body">
          <p class="price">${formatPrice(flight.price)}</p>
          <br />
          <a class="btn btn-primary" href="booking.html?id=${flight.id}">
            Купить билет
          </a>
        </div>
      </div>
    `;
  }).join("");
}

if (!savedSearch) {
  resultsInfo.textContent = "Параметры поиска не найдены.";
  renderFlights([]);
} else {
  const filteredFlights = flights.filter(flight => {
    const sameFrom = normalizeText(flight.from) === normalizeText(savedSearch.from);
    const sameTo = normalizeText(flight.to) === normalizeText(savedSearch.to);
    const sameDate = flight.date === savedSearch.date;

    const sameClass =
      savedSearch.classType === "Любой" ||
      flight.classType === savedSearch.classType;

    return sameFrom && sameTo && sameDate && sameClass;
  });

  resultsInfo.textContent =
    `${savedSearch.from} → ${savedSearch.to}, ${savedSearch.date}, класс: ${savedSearch.classType}`;

  renderFlights(filteredFlights);
}