const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentIndex = 0;
const totalSlides = slides.length;
let autoSlide;

// Buat dots (indikator)
for (let i = 0; i < totalSlides; i++) {
   const dot = document.createElement("div");
   dot.classList.add("dot");
   if (i === 0) dot.classList.add("active");
   dot.addEventListener("click", () => goToSlide(i));
   dotsContainer.appendChild(dot);
}

function updateDots() {
   document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
   });
}

function goToSlide(index) {
   currentIndex = index;
   slider.style.transform = `translateX(-${index * 100}%)`;
   updateDots();
   resetAutoSlide();
}

function nextSlide() {
   currentIndex = (currentIndex + 1) % totalSlides;
   goToSlide(currentIndex);
}

function resetAutoSlide() {
   clearInterval(autoSlide);
   autoSlide = setInterval(nextSlide, 2000);
}

// Autoplay slide setiap 2 detik
autoSlide = setInterval(nextSlide, 2000);
