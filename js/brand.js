document.addEventListener("DOMContentLoaded", () => {
  const brandItems = document.querySelectorAll(".brand-logos li");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  brandItems.forEach(item => observer.observe(item));
});
