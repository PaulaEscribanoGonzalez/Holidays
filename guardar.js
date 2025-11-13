document.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar festividades desde API
  await window.HolidaysAPI.fetchHolidays("ES");

  // 2. Obtener festividades guardadas de localStorage
  const savedHolidays = JSON.parse(localStorage.getItem("savedHolidays")) || [];

  // 3. Generar lista de guardados
  const container = document.querySelector(".saved-list");
  function renderSavedList() {
    const saved = JSON.parse(localStorage.getItem("savedHolidays")) || [];
    if (!container) return;
    if (saved.length === 0) {
      container.innerHTML = "<p style='text-align:center;color:#888;'>No tienes festividades guardadas aún.</p>";
      return;
    }

    container.innerHTML = saved.map(h => `
      <div class="saved-card">
        <button class="save-btn remove-btn" aria-label="Eliminar">
          <span class="material-icons">delete</span>
        </button>
        <div class="image-container">
          <img src="${h.image || 'https://via.placeholder.com/180'}" alt="${h.title}">
        </div>
        <div class="saved-info">
          <div class="saved-header">
            <h3>${h.title}</h3>
            <div class="saved-badge">
              <span>${h.date}</span>
              <img class="flag" src="https://flagcdn.com/es.svg" alt="ES">
            </div>
          </div>
          <p class="saved-description">${h.description}</p>
        </div>
      </div>
    `).join("");

    // Añadir evento de eliminar
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const card = btn.closest(".saved-card");
        const title = card.querySelector("h3").innerText;
        const updated = saved.filter(h => h.title !== title);
        localStorage.setItem("savedHolidays", JSON.stringify(updated));
        card.classList.add("fade-out");
        setTimeout(() => {
          card.remove();
          if (updated.length === 0) renderSavedList();
        }, 300);

        // Actualizar calendario
        markSavedHolidays();
      });
    });
  }

  renderSavedList();

  // 4. Función para marcar festividades en el calendario
  function markSavedHolidays() {
    const saved = JSON.parse(localStorage.getItem("savedHolidays")) || [];
    const days = document.querySelectorAll(".calendar-table__item");

    // Limpiar íconos previos
    days.forEach(d => {
      d.classList.remove("has-event");
      const icon = d.querySelector(".day-icon");
      if (icon) icon.remove();
      const dayNumber = d.querySelector(".day-number, span");
      if (dayNumber) dayNumber.style.color = "";
    });

    const eventsList = document.querySelector(".events__list");
    if (eventsList) eventsList.innerHTML = "";

    saved.forEach(h => {
      const dayEl = document.querySelector(`.calendar-table__item[data-date="${h.date}"]`);
      if (!dayEl) {
        // Si no hay celda visible, solo añadir a lista lateral
        if (eventsList) appendEventToList(h.title, h.date);
        return;
      }

      dayEl.dataset.type = "holiday";
      dayEl.classList.add("has-event");

      const dayNumber = dayEl.querySelector(".day-number, span");
      if (dayNumber) dayNumber.style.color = "#FF5733";

      if (!dayEl.querySelector(".day-icon")) {
        const icon = document.createElement("span");
        icon.classList.add("day-icon");
        icon.textContent = "🎉";
        dayEl.appendChild(icon);
      }

      if (eventsList) appendEventToList(h.title, h.date);
    });
  }

  function appendEventToList(title, date) {
    const eventsList = document.querySelector(".events__list");
    if (!eventsList) return;
    const li = document.createElement("li");
    li.className = "events__item";
    li.style.borderLeft = "8px solid #FF5733";
    li.innerHTML = `
      <div class="events__item--left">
        <span class="events__name">${title}</span>
        <span class="events__date">${date}</span>
      </div>
    `;
    eventsList.appendChild(li);
  }

  markSavedHolidays();

  // 5. Guardar manualmente cualquier card
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const card = btn.closest(".related-card, .post-card, .mySlides");
      if (!card) return;

      const title = card.querySelector("h4, h1")?.innerText || "Sin título";
      const description = card.querySelector("p")?.innerText || "";
      const image = card.querySelector("img")?.src || "";
      const rawDate = card.querySelector(".badge-text, .date")?.innerText || "";
      const date = normalizeDate(rawDate);

      const holiday = { title, description, image, date };

      const saved = JSON.parse(localStorage.getItem("savedHolidays")) || [];
      if (!saved.some(h => h.title === holiday.title)) {
        saved.push(holiday);
        localStorage.setItem("savedHolidays", JSON.stringify(saved));
        renderSavedList();
        markSavedHolidays();
      }

      btn.classList.add("saved");
      const icon = btn.querySelector(".material-icons");
      if (icon) icon.textContent = "bookmark";
    });
  });

  function normalizeDate(rawDate) {
    if (!rawDate) return new Date().toISOString().split("T")[0];
    rawDate = rawDate.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) return rawDate;
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(rawDate)) {
      const [d,m,y] = rawDate.split("/").map(Number);
      return `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    }
    return new Date(rawDate).toISOString().split("T")[0];
  }
});
