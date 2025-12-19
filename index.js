const tabs = document.querySelectorAll('.tab-link');
const panes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove active states
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    this.classList.add('active');

    // IF "All" tab is clicked → show all panes
    if (this.dataset.tab === 'tab0') {
      panes.forEach(p => p.classList.add('active'));
    } 
    // ELSE → show only the selected pane
    else {
      document
        .getElementById(this.dataset.tab)
        .classList.add('active');
    }
  });
});


  // Bootstrap carousel setup
document.addEventListener("DOMContentLoaded", () => {
  const heroCarousel = document.querySelector("#heroCarousel");

  const carousel = new bootstrap.Carousel(heroCarousel, {
    pause: 'hover',  // Pause when hovered
    wrap: true        // Loop back to first slide
  });
});

const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let index = 0;
let total = slide.length;

// Calculate how many slides fit on screen
function slidesPerView() {
  if (window.innerWidth <= 500) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 992) return 4;
  return 6;
}

function updateSlider() {
  const perView = slidesPerView();
  const movePercent = (100 / perView) * index;
  slides.style.transform = `translateX(-${movePercent}%)`;
}

// Next
nextBtn.addEventListener("click", () => {
  const perView = slidesPerView();
  if (index < total - perView) index++;
  updateSlider();
});

// Prev
prevBtn.addEventListener("click", () => {
  if (index > 0) index--;
  updateSlider();
});

// Recalculate on resize
window.addEventListener("resize", updateSlider);

