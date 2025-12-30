document.addEventListener("DOMContentLoaded", function () {
  // 일반 애니메이션
  const generalTargets = document.querySelectorAll(
    '.animate-left, .animate-right, .animate-tright, .animate-tleft, .animate-center, .animate-up'
  );
  const generalObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        generalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  generalTargets.forEach(target => generalObserver.observe(target));

  // 카드류 순차 애니메이션
  const sequentialTargets = document.querySelectorAll('.process-card, .feature-card, .plc-feature-card .trust-card');
  const sequentialObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        sequentialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sequentialTargets.forEach(target => sequentialObserver.observe(target));

  // 타임라인 순차 등장
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const timelineLines = document.querySelectorAll('.timeline-line-horizontal');
  const timelineObserver = new IntersectionObserver(entries => {
    let delay = 0;
    timelineSteps.forEach((step, i) => {
      if (step.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          step.classList.add('visible');
          if (timelineLines[i]) {
            timelineLines[i].classList.add('visible');
          }
        }, delay);
        delay += 300;
        timelineObserver.unobserve(step);
      }
    });
  }, { threshold: 0.2 });
  timelineSteps.forEach(step => timelineObserver.observe(step));

  // 갤러리 등장
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  galleryItems.forEach(item => galleryObserver.observe(item));
});
