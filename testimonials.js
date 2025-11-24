// testimonials.js
// Handles:
// - reveal-on-scroll with IntersectionObserver
// - autoplay logo slider (no buttons), looping
// - testimonials slider with working prev/next (no autoplay), looping
// - swipe support for both sliders
// - dynamic year in footer

document.addEventListener('DOMContentLoaded', () => {
  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(e => obs.observe(e));
  } else {
    revealEls.forEach(e => e.setAttribute('data-visible','true'));
  }

  // dynamic year
  const yearEl = document.getElementById('thYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------------------------
     LOGO SLIDER (AUTOPLAY, NO BUTTONS)
     -------------------------- */
  (function () {
    const slider = document.getElementById('logoSlider');
    if (!slider) return;
    const slides = Array.from(slider.children);
    let pos = 0;
    const slideCount = slides.length;

    // duplicate slides to create smooth continuous loop
    // clone nodes to both ends for continuous feel
    slides.forEach(node => slider.appendChild(node.cloneNode(true)));
    slides.forEach(node => slider.insertBefore(node.cloneNode(true), slider.firstChild));

    let slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slides[0]).marginRight || 0);
    let offset = slideWidth * slideCount; // start at original slides
    slider.style.transform = `translateX(-${offset}px)`;

    function recalcWidth() {
      slideWidth = slider.querySelector('.logo-slide').offsetWidth + parseFloat(getComputedStyle(slider.querySelector('.logo-slide')).marginRight || 0);
      offset = slideWidth * slideCount;
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${offset}px)`;
      // force reflow
      slider.getBoundingClientRect();
      slider.style.transition = '';
    }

    // autoplay settings
    const speed = 0.1; // px per ms
    let lastTime = null;
    let running = true;

    function step(t) {
      if (!lastTime) lastTime = t;
      const dt = t - lastTime;
      lastTime = t;
      if (running) {
        offset += speed * dt;
        // when scrolled past 2 * slideCount * width, reset
        const totalWidth = slideWidth * slideCount * 3; // approximate
        if (offset >= slideWidth * slideCount * 2) {
          offset = slideWidth * slideCount;
        }
        slider.style.transform = `translateX(-${offset}px)`;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // pause on hover / touch
    slider.addEventListener('mouseenter', () => running = false);
    slider.addEventListener('mouseleave', () => { running = true; lastTime = null; });

    slider.addEventListener('touchstart', () => running = false, {passive:true});
    slider.addEventListener('touchend', () => { running = true; lastTime = null; });

    // recalc on resize
    window.addEventListener('resize', () => {
      clearTimeout(window._logoResize);
      window._logoResize = setTimeout(recalcWidth, 120);
    });
  })();


  /* --------------------------
     TESTIMONIALS SLIDER (MANUAL, PREV/NEXT, NO AUTOPLAY)
     -------------------------- */
  (function () {
    const track = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    if (!track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    const count = slides.length;
    let index = 0;

    // Setup wrapper width (each slide 100%), but allow track to show single slide view
    function update() {
      const w = track.parentElement.offsetWidth;
      slides.forEach(s => s.style.width = `${w}px`);
      // set transform to index
      track.style.transform = `translateX(-${index * w}px)`;
    }
    // initial
    update();
    window.addEventListener('resize', () => {
      clearTimeout(window._testResize);
      window._testResize = setTimeout(update, 90);
    });

    function goTo(i) {
      index = i;
      if (index < 0) index = count - 1;
      if (index >= count) index = 0;
      track.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)';
      update();
    }
    nextBtn.addEventListener('click', () => goTo(index + 1));
    prevBtn.addEventListener('click', () => goTo(index - 1));

    // keyboard support
    prevBtn.addEventListener('keyup', (e) => { if (e.key === 'Enter') prevBtn.click(); });
    nextBtn.addEventListener('keyup', (e) => { if (e.key === 'Enter') nextBtn.click(); });

    // swipe support for testimonials
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    track.addEventListener('touchstart', (ev) => {
      startX = ev.touches[0].clientX;
      dragging = true;
      track.style.transition = 'none';
    }, {passive:true});

    track.addEventListener('touchmove', (ev) => {
      if (!dragging) return;
      currentX = ev.touches[0].clientX;
      const dx = currentX - startX;
      const w = track.parentElement.offsetWidth;
      track.style.transform = `translateX(-${index * w - dx}px)`;
    }, {passive:true});

    track.addEventListener('touchend', (ev) => {
      dragging = false;
      const dx = currentX - startX;
      const w = track.parentElement.offsetWidth;
      if (Math.abs(dx) > Math.min(80, w * 0.18)) {
        if (dx < 0) goTo(index + 1); else goTo(index - 1);
      } else {
        // snap back
        track.style.transition = 'transform 260ms ease';
        update();
      }
      startX = currentX = 0;
    }, {passive:true});

    // initial attribute for accessibility
    track.setAttribute('aria-live', 'polite');
  })();

});
