function displayValue() {
  starVal = document.forms["star-rating-form"]["star-radio"].value;
  if (starVal == -1) {
    document.getElementById("result").innerText = "Not Chosen";
  } else {
    document.getElementById("result").innerText =
      "You chose: " + starVal +
      " out of 5.";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  displayValue();
  document.forms["star-rating-form"]["star-radio"].forEach((star) => {
    star.addEventListener("change", () => {
      displayValue();
    });
  });
});

// change the background of the page according to the value of the checkbox
const input = document.querySelector('input[type="checkbox"]');
function handleInput() {
  const { checked } = this;
  document.querySelector('body').style.background = checked ? '#151d29' : '#d6e7f7';
}
input.addEventListener('input', handleInput);

//translator

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

//carrousel or slideshow

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}