export function initAos() {
  const isMobile = window.innerWidth < 768;

  document.querySelectorAll('[data-aos]').forEach((el) => {
    if (isMobile) {
      const aos = el.dataset.aos;

      if (aos === 'fade-left' || aos === 'fade-right' || aos === 'zoom-in' || aos === 'flip-left') {
        el.dataset.aos = 'fade-up';
      }
    }
  });

  AOS.init({
    duration: 1000,
    delay: 100,
    offset: 30,
    once: true,
  });
}
