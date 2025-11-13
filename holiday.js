// === Fade-in animation ===
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(fadeEl => observer.observe(fadeEl));

// === Guardar festividad en localStorage ===
function saveHoliday(holiday) {
  const saved = JSON.parse(localStorage.getItem("savedHolidays")) || [];

  if (!saved.some(h => h.title === holiday.title)) {
    saved.push(holiday);
    localStorage.setItem("savedHolidays", JSON.stringify(saved));
    alert("🎉 Festividad guardada en tu lista");
  } else {
    alert("🗓️ Esta festividad ya está guardada");
  }
}

// === Escuchar clics en los iconos de guardar ===
document.querySelectorAll('.save-btn').forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    // Cambiar estado visual
    button.classList.toggle('saved');
    const icon = button.querySelector('.material-icons');
    icon.textContent = button.classList.contains('saved') ? 'bookmark' : 'bookmark_border';

    // Obtener la card asociada
    const card = button.closest('.related-card');
    if (!card) return;

    const title = card.querySelector('h4')?.innerText || "Sin título";
    const desc = card.querySelector('p')?.innerText || "";
    const img = card.querySelector('img')?.src || "";
    const date = card.querySelector('.badge-text')?.innerText || "";

    // Guardar en localStorage
    const holiday = { title, desc, img, date };
    saveHoliday(holiday);
  });
});
