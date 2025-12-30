
document.addEventListener("DOMContentLoaded", function () {
  /** 1) 원형 프로세스 .animate-step 순차 애니메이션 */
  const steps = Array.from(document.querySelectorAll('.animate-step'));

  if (steps.length) {
    const observer1 = new IntersectionObserver(() => {
      // data-order 기준 정렬 후 순차 등장
      steps
        .sort((a, b) => a.dataset.order - b.dataset.order)
        .forEach((step, i) => {
          setTimeout(() => {
            step.classList.add('visible');
          }, i * 300);
        });

      // 한 번만 실행
      observer1.disconnect();
    }, { threshold: 0.3 });

    observer1.observe(steps[0]);
  }

  /** 2) 세로 작업방식 .step-item 애니메이션 */
  const stepItems = document.querySelectorAll(".step-item");

  if (stepItems.length) {
    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    stepItems.forEach(item => observer2.observe(item));
  }
});

