// API.js - Holidays + Wikipedia Images
window.HolidaysAPI = (function() {
  const calendarificKey = "a4VEO8026bdpyCps0dyC7tVvlCYhmIQB"; 
  const defaultCountry = "ES";

  let holidays = [];
  let ready = false;

  async function fetchHolidays(country = defaultCountry, year = new Date().getFullYear()) {
    try {
      const url = `https://calendarific.com/api/v2/holidays?api_key=${calendarificKey}&country=${country}&year=${year}`;
      console.log("📡 Fetching:", url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Verifica que haya datos
      if (!data?.response?.holidays) {
        console.warn("⚠️ No holidays found in response", data);
        return [];
      }

      holidays = data.response.holidays.map(h => ({
        title: h.name,
        date: h.date.iso,
        description: h.description || "Sin descripción.",
        flag: `https://flagcdn.com/${country.toLowerCase()}.svg`,
      }));

      console.log("✅ Holidays loaded:", holidays.length);
      ready = true;
      window.dispatchEvent(new CustomEvent("holidays-ready", { detail: { holidays } }));
      return holidays;
    } catch (err) {
      console.error("❌ Error al cargar Calendarific:", err);
      return [];
    }
  }

  async function fetchWikiImage(title) {
    try {
      const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600`;
      const res = await fetch(url);
      const data = await res.json();
      const page = Object.values(data.query.pages)[0];
      return page?.thumbnail?.source || "https://via.placeholder.com/600x400?text=Sin+imagen";
    } catch (err) {
      console.error("Error en Wikipedia:", err);
      return "https://via.placeholder.com/600x400?text=Error";
    }
  }

  async function fetchWikiDescription(title) {
    try {
      const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&format=json&titles=${encodeURIComponent(title)}`;
      const res = await fetch(url);
      const data = await res.json();
      const page = Object.values(data.query.pages)[0];
      return page?.extract || "No hay descripción.";
    } catch (err) {
      console.error("Error al obtener descripción de Wikipedia:", err);
      return "Error al cargar descripción.";
    }
  }

  return { fetchHolidays, fetchWikiImage, fetchWikiDescription };
})();
