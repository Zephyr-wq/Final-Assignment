  const tabs = document.querySelectorAll('.tab-link');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active states
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Activate clicked tab
      this.classList.add('active');
      document.getElementById(this.dataset.tab).classList.add('active');
    });
  })

  // Bootstrap carousel setup
document.addEventListener("DOMContentLoaded", () => {
  const heroCarousel = document.querySelector("#heroCarousel");

  const carousel = new bootstrap.Carousel(heroCarousel, {
    pause: 'hover',  // Pause when hovered
    wrap: true        // Loop back to first slide
  });
});
