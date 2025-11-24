// services.js
// Intersection Observer for reveal animations
document.addEventListener("DOMContentLoaded", () => {
    const animElems = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.setAttribute('data-visible','true');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    animElems.forEach(elem => observer.observe(elem));

    // Dynamic year in footer
    const yearSpan = document.getElementById('svc-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
        link.addEventListener('click', e=>{
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth'});
        });
    });
});
