import { saveHolidayToSupabase } from "./supabaseCRUD.js";

let slideIndex = 0;
let holidaysByDate = {};
const dayNames = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const monthNames = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
let currentDate = new Date();

/* Guardar festividad */
async function saveHoliday(h) {
  try {
    await saveHolidayToSupabase({
      title: h.title,
      date: h.date,
      description: h.desc || h.description || "",
      image: h.img || h.image || "",
      flag: h.flag || "https://flagcdn.com/es.svg"
    });
    alert(`🎉 "${h.title}" guardada en Supabase`);
  } catch (e) {
    console.error(e);
    alert("❌ Error al guardar la festividad");
  }
}

/* Mostrar día actual */
function updateDayDisplay() {
  const dayStr = `${dayNames[currentDate.getDay()]} ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]}`;
  document.getElementById("current-day").textContent = dayStr;
}

/* Cambiar día */
function changeDay(offset){
  currentDate.setDate(currentDate.getDate() + offset);
  updateDayDisplay();
  loadPostsForDate(currentDate);
}

document.getElementById("prev-day").addEventListener("click",()=>changeDay(-1));
document.getElementById("next-day").addEventListener("click",()=>changeDay(1));

updateDayDisplay();

/* Botones guardar */
function attachSaveButtons() {
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.replaceWith(btn.cloneNode(true)); // Resetear listeners
  });

  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle("saved");
      const icon = btn.querySelector(".material-icons");
      icon.textContent = btn.classList.contains("saved") ? "bookmark" : "bookmark_border";

      const card = btn.closest(".post-card, .mySlides, .related-card");
      if (!card) return;

      const title = card.querySelector("h4,h1")?.innerText || "Sin título";
      const desc = card.querySelector("p")?.innerText || "";
      const img = card.querySelector("img")?.src || "";
      const date = card.querySelector(".badge-text,.date")?.innerText || "";
      saveHoliday({ title, desc, img, date });
    });
  });
}

/* Slider */
function showSlides(){
  const slides = document.getElementsByClassName("mySlides");
  if(slides.length===0) return;
  for(let s of slides) s.style.display="none";
  slideIndex++;
  if(slideIndex>slides.length) slideIndex=1;
  slides[slideIndex-1].style.display="block";
  setTimeout(showSlides,5000);
}

function plusSlides(n){slideIndex+=n-1; showSlides();}

/* Cargar posts del día */
function loadPostsForDate(date){
  const grid = document.getElementById("posts-grid");
  grid.innerHTML="";
  const key = date.toISOString().split("T")[0];
  const dayHolidays = holidaysByDate[key] || [];
  if(dayHolidays.length===0){
    grid.innerHTML=`<p style="text-align:center;color:#999;">No hay festividades para este día.</p>`;
    return;
  }

  dayHolidays.forEach(h=>{
    const card = document.createElement("div");
    card.className="post-card";
    card.dataset.title=h.title;
    card.innerHTML=`
      <div class="card-badge">
        <span class="badge-text">${monthNames[date.getMonth()]} ${date.getDate()}</span>
        <img src="${h.flag}" class="flag" alt="Bandera">
      </div>
      <button class="save-btn"><span class="material-icons">bookmark_border</span></button>
      <a href="#">
        <img src="${h.img}" alt="${h.title}">
        <h4>${h.title}</h4>
        <p>${h.desc.length>150?h.desc.slice(0,150)+"...":h.desc}</p>
      </a>
    `;
    grid.appendChild(card);
  });
  attachSaveButtons();

  // Actualizar con Wikipedia sin bloquear
  [...grid.children].forEach(async card=>{
    const title = card.dataset.title;
    try{
      const wikiImg = await window.HolidaysAPI.fetchWikiImage(title);
      const wikiDesc = await window.HolidaysAPI.fetchWikiDescription(title);
      if(wikiImg) card.querySelector('img').src = wikiImg;
      if(wikiDesc) card.querySelector('p').innerText = wikiDesc.length>250?wikiDesc.slice(0,250)+"...":wikiDesc;
    }catch{}
  });
}

/* Inicialización */
document.addEventListener("DOMContentLoaded",async ()=>{
  const lastYear = new Date().getFullYear()-1;
  const sliderContainer = document.querySelector(".slideshow-container");
  sliderContainer.innerHTML="";

  try{
    const holidays = await window.HolidaysAPI.fetchHolidays("ES",lastYear);

    // Agrupar por fecha
    holidays.forEach(h=>{
      const isoDate = new Date(h.date).toISOString().split("T")[0];
      if(!holidaysByDate[isoDate]) holidaysByDate[isoDate]=[];
      holidaysByDate[isoDate].push({
        title:h.title,
        desc:h.description||"",
        img: h.image || "https://via.placeholder.com/180",
        flag: h.flag || "https://flagcdn.com/es.svg"
      });
    });

    // Posts del día
    loadPostsForDate(currentDate);

    // Slides top 5
    holidays.slice(0,5).forEach(h=>{
      const slide = document.createElement("div");
      slide.className="mySlides fade";
      slide.dataset.title=h.title;
      slide.innerHTML=`
        <img src="${h.image||'https://via.placeholder.com/600x400'}" alt="${h.title}">
        <div class="slide-info">
          <div class="badge">
            <span class="date">${h.date}</span>
            <img class="flag" src="${h.flag}" alt="Bandera">
          </div>
          <h1>${h.title}</h1>
          <p>${h.description?h.description.length>150?h.description.slice(0,150)+"...":h.description:""}</p>
          <button class="save-btn slide-save"><span class="material-icons">bookmark_border</span></button>
        </div>
      `;
      sliderContainer.appendChild(slide);
    });

    attachSaveButtons();
    showSlides();

    // Actualizar slides con Wikipedia sin bloquear
    [...sliderContainer.children].forEach(async slide=>{
      const title = slide.dataset.title;
      try{
        const wikiImg = await window.HolidaysAPI.fetchWikiImage(title);
        const wikiDesc = await window.HolidaysAPI.fetchWikiDescription(title);
        if(wikiImg) slide.querySelector('img').src = wikiImg;
        if(wikiDesc) slide.querySelector('p').innerText = wikiDesc.length>250?wikiDesc.slice(0,250)+"...":wikiDesc;
      }catch{}
    });

  }catch(err){console.error("Error cargando festividades:",err);}
});
