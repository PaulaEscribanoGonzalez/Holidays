document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.saved-card');

  // Cargar guardados desde localStorage (array de índices o IDs)
  const savedFestivities = JSON.parse(localStorage.getItem('savedFestivities')) || [];

  cards.forEach((card, index) => {
    const button = card.querySelector('.save-btn');
    const icon = button.querySelector('.material-icons');

    // Si esta festividad no está guardada, ocultarla al cargar
    if (!savedFestivities.includes(index)) {
      card.remove();
      return;
    }

    // Si está guardada, mostrarla marcada
    button.classList.add('saved');
    icon.textContent = 'bookmark';

    // Evento de clic para quitar o agregar
    button.addEventListener('click', e => {
      e.preventDefault();

      const isSaved = button.classList.toggle('saved');
      icon.textContent = isSaved ? 'bookmark' : 'bookmark_border';

      // Si se quita el guardado → eliminar card visualmente
      if (!isSaved) {
        card.classList.add('fade-out'); // animación suave (opcional)
        setTimeout(() => card.remove(), 300);

        const pos = savedFestivities.indexOf(index);
        if (pos !== -1) savedFestivities.splice(pos, 1);
      }

      // Si se guarda, agregar al array
      else if (!savedFestivities.includes(index)) {
        savedFestivities.push(index);
      }

      // Actualizar localStorage
      localStorage.setItem('savedFestivities', JSON.stringify(savedFestivities));
    });
  });
});

