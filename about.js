window.addEventListener('DOMContentLoaded', () => {

  /* === REVEAL TIMELINE BLOCK === */
  document.querySelectorAll('.timeline-step').forEach(step => {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          step.classList.add('show');
          obs.unobserve(step);
        }
      });
    }, { threshold: 0.25 }).observe(step);
  });

  /* === REVEAL TEXT === */
  document.querySelectorAll('.text-animate').forEach(txt => {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          txt.style.opacity = 1;
          txt.style.transform = 'translateY(0)';
          obs.unobserve(txt);
        }
      });
    }, { threshold: 0.3 }).observe(txt);
  });

  /* === TILT EFFECT (yang perlu diedit) === */
  const imgs = document.querySelectorAll('.step-img');

  // 👉  Tambahkan class supaya CSS glare‑pelangi dikenali
  imgs.forEach(img => img.classList.add('rainbow-tilt'));

  // Inisialisasi VanillaTilt
  VanillaTilt.init(imgs, {
    max: 12,
    speed: 350,
    scale: 1.02,
    glare: true,
    'max-glare': 0.22
  });
});
