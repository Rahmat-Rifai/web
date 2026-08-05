document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations (Fade-Up)
  // Ensures tiles and content glide in smoothly as they enter the viewport
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animating to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => observer.observe(el));

  // 2. Minimalist Interaction Handling
  // Avoids page reload on dummy links/buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Logic for specific button actions would route here
      console.log(`Action triggered: ${btn.textContent.trim()}`);
    });
  });
});
