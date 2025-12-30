document.addEventListener("DOMContentLoaded", () => {
  const htimelineItems = document.querySelectorAll(".htimeline-item");

  if (!htimelineItems.length) return; // 요소 없을 때 에러 방지

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // 한 번 활성화된 항목은 계속 유지하고 옵저버 해제
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // 화면에 30% 이상 보여야 트리거
      rootMargin: "0px 0px -10% 0px", // 살짝 여유줌
    }
  );

  htimelineItems.forEach((item) => observer.observe(item));
});
