const track = document.getElementById("loop-slider-track");
const prevBtn = document.getElementById("loop-prev-btn");
const nextBtn = document.getElementById("loop-next-btn");

let index = 0;
const totalSlides = document.querySelectorAll(".loopSlide").length;

// Calculate slides per view dynamically
function slidesPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function updateSlider() {
    const spv = slidesPerView();
    const slideWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Next button → loops forward
nextBtn.addEventListener("click", () => {
    const spv = slidesPerView();
    if (index >= totalSlides - spv) {
        index = 0; // loop to start
    } else {
        index++;
    }
    updateSlider();
});

// Prev button → loops backward
prevBtn.addEventListener("click", () => {
    const spv = slidesPerView();
    if (index === 0) {
        index = totalSlides - spv; // loop to last valid position
    } else {
        index--;
    }
    updateSlider();
});

window.addEventListener("resize", updateSlider);
updateSlider();

const collapsibleBtns = document.querySelectorAll(".collapsible-btn");

collapsibleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;

    // Close all other contents
    collapsibleBtns.forEach(otherBtn => {
      const otherContent = otherBtn.nextElementSibling;
      if (otherContent !== content) {
        otherContent.style.maxHeight = null;
      }
    });

    // Toggle the clicked content
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// multi-slider.js
(function () {
  const track = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let indexPosition = 0;
  let slideCount = slides.length;
  let perView = getSlidesPerView();
  let maxIndex = Math.max(0, slideCount - perView);

  // Determine slides per view to match your CSS breakpoints:
  // desktop -> 6, tablet -> 3, mobile -> 1
  function getSlidesPerView() {
    const w = window.innerWidth;
    if (w <= 575) return 1;   // mobile
    if (w <= 991) return 3;   // tablet
    return 6;                 // desktop
  }

  // Apply the transform to move the track
  function updateSlider() {
    // Recalculate in case sizes changed
    perView = getSlidesPerView();
    maxIndex = Math.max(0, slideCount - perView);

    // Guard: if slides are fewer than perView, ensure index is zero
    if (slideCount <= perView) {
      indexPosition = 0;
      track.style.transform = `translateX(0px)`;
      return;
    }

    // compute width of one slide (includes padding as displayed)
    const slideWidth = slides[0].offsetWidth;
    const moveX = indexPosition * slideWidth;
    track.style.transform = `translateX(-${moveX}px)`;
  }

  // Next: loop forward
  function goNext() {
    // recalc perView & maxIndex (in case screen changed)
    perView = getSlidesPerView();
    maxIndex = Math.max(0, slideCount - perView);

    if (indexPosition >= maxIndex) {
      indexPosition = 0; // loop to start
    } else {
      indexPosition += 1;
    }
    updateSlider();
  }

  // Prev: loop backward
  function goPrev() {
    perView = getSlidesPerView();
    maxIndex = Math.max(0, slideCount - perView);

    if (indexPosition <= 0) {
      indexPosition = maxIndex; // loop to last valid position
    } else {
      indexPosition -= 1;
    }
    updateSlider();
  }

  // Debounce helper for resize to avoid thrashing
  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // keep indexPosition within allowed range after resize
      perView = getSlidesPerView();
      maxIndex = Math.max(0, slideCount - perView);
      if (indexPosition > maxIndex) indexPosition = maxIndex;
      updateSlider();
    }, 80);
  }

  // Event listeners
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);
  window.addEventListener('resize', onResize);
  window.addEventListener('load', updateSlider);

  // In case images load later and change widths (ensure correct after images loaded)
  // This also runs once shortly after script runs
  window.addEventListener('DOMContentLoaded', () => {
    // small timeout to allow layout paint
    setTimeout(updateSlider, 60);
  });

  // expose for debugging (optional)
  // window._multiSliderState = () => ({ indexPosition, perView, maxIndex, slideCount });
})();

// multi-slider.js
(function () {
  const track = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let indexPosition = 0;
  let slideCount = slides.length;
  let perView = getSlidesPerView();
  let maxIndex = Math.max(0, slideCount - perView);

  // Determine slides per view
  function getSlidesPerView() {
    const w = window.innerWidth;
    if (w <= 575) return 1;
    if (w <= 991) return 3;
    return 6;
  }

  function updateSlider() {
    perView = getSlidesPerView();
    maxIndex = Math.max(0, slideCount - perView);

    if (slideCount <= perView) {
      indexPosition = 0;
      track.style.transform = `translateX(0px)`;
      return;
    }

    const slideWidth = slides[0].offsetWidth;
    const moveX = indexPosition * slideWidth;
    track.style.transform = `translateX(-${moveX}px)`;
  }

  function goNext() {
    perView = getSlidesPerView();
    maxIndex = Math.max(0, slideCount - perView);

    indexPosition = (indexPosition >= maxIndex) ? 0 : indexPosition + 1;
    updateSlider();
  }

  function goPrev() {
    perView = getSlidesPerView();
    maxIndex = Math.max(0, slideCount - perView);

    indexPosition = (indexPosition <= 0) ? maxIndex : indexPosition - 1;
    updateSlider();
  }

  // Handle window resize
  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      perView = getSlidesPerView();
      maxIndex = Math.max(0, slideCount - perView);
      if (indexPosition > maxIndex) indexPosition = maxIndex;
      updateSlider();
    }, 80);
  }

  // === SWIPE SUPPORT ===
  let startX = 0;
  let endX = 0;
  let isSwiping = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    endX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    if (!isSwiping) return;
    const distance = endX - startX;

    // Minimum swipe distance to avoid accidental touches
    if (Math.abs(distance) > 50) {
      if (distance < 0) {
        goNext(); // swipe left → next
      } else {
        goPrev(); // swipe right → previous
      }
    }

    isSwiping = false;
  });

  // Event listeners
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);
  window.addEventListener('resize', onResize);
  window.addEventListener('load', updateSlider);

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateSlider, 60);
  });
})();
