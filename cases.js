// cases.js
document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for animations
    const animElems = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.setAttribute('data-visible','true');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animElems.forEach(el => observer.observe(el));

    // Dynamic year in footer
    const yearSpan = document.getElementById('case-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth'});
        });
    });
});

// cases.js
document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for animations
    const animElems = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.setAttribute('data-visible','true');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animElems.forEach(el => observer.observe(el));

    // Dynamic year in footer
    const yearSpan = document.getElementById('case-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth'});
        });
    });

    // CASE FILTERING
    const filterButtons = document.querySelectorAll('#caseFilters button');
    const caseItems = document.querySelectorAll('.case-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            caseItems.forEach(item => {
                if(filter === 'all' || item.getAttribute('data-category') === filter){
                    item.style.display = 'block';
                    setTimeout(() => item.setAttribute('data-visible','true'), 50);
                } else {
                    item.style.display = 'none';
                    item.removeAttribute('data-visible');
                }
            });
        });
    });
});
