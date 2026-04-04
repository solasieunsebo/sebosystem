document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector("#consult-timeline .timeline-horizontal");
  const steps = document.querySelectorAll("#consult-timeline .step");
  if (!timeline || steps.length === 0) return;

  let mobilePlayed = false; // 📱 모바일 1회 제한 플래그
  let shineLoopTimer = null; // 💫 카드 반짝임 루프 타이머

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // 💻 PC: 영역 들어올 때마다 재생
          if (window.innerWidth > 768) {
            timeline.classList.add("active");
            animateLines();
            animateCardShine();
          }

          // 📱 모바일: 한 번만 재생
          if (window.innerWidth <= 768 && !mobilePlayed) {
            timeline.classList.add("active");
            animateLines();
            animateCardShine();
            mobilePlayed = true;
          }
        } else {
          // 💻 PC일 때만 벗어나면 초기화
          if (window.innerWidth > 768) {
            timeline.classList.remove("active");
          }
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
  );

  steps.forEach((step) => observer.observe(step));

  /* ===========================
     ⚡ 2. 라인 순차 흐름 + 배경 반응
  ============================ */
  function animateLines() {
    const lines = document.querySelectorAll("#consult-timeline .h-line");
    const section = document.querySelector("#consult-timeline");

    section.classList.remove("glow-on");
    void section.offsetWidth;
    section.classList.add("glow-on");

    lines.forEach((line, i) => {
      line.style.setProperty("--shine-delay", `${i * 0.4}s`);
      line.classList.remove("shine");
      void line.offsetWidth;
      line.classList.add("shine");
    });
  }

  /* ===========================
     💫 3. 카드 반짝임 루프 (전체 동기화)
  ============================ */
  function animateCardShine() {
    const steps = document.querySelectorAll("#consult-timeline .step");

    // 기존 루프 중단
    if (shineLoopTimer) {
      clearTimeout(shineLoopTimer);
      shineLoopTimer = null;
    }

    function loop() {
      steps.forEach((step, i) => {
        step.classList.remove("shine-on");
        void step.offsetWidth; // reflow

        setTimeout(() => {
          step.classList.add("shine-on");
        }, i * 400);

        // 애니메이션 끝나면 초기화
        setTimeout(() => step.classList.remove("shine-on"), 1600);
      });

      // 다음 사이클 예약
      shineLoopTimer = setTimeout(loop, steps.length * 400 + 2000);
    }

    loop();
  }

  /* ===========================
     🌌 4. 파티클 배경
  ============================ */
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const PARTICLE_COUNT = 25;
  const SPEED = 0.3;
  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      });
    }
  }

  initParticles();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    for (let p of particles) {
      ctx.beginPath();
      const brightness = 0.3 + Math.sin(Date.now() / 600 + p.x) * 0.15;
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
      gradient.addColorStop(0, `rgba(252,100,0,${brightness})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -50) p.x = canvas.width + 50;
      if (p.x > canvas.width + 50) p.x = -50;
      if (p.y < -50) p.y = canvas.height + 50;
      if (p.y > canvas.height + 50) p.y = -50;
    }

    requestAnimationFrame(draw);
  }

  draw();
});
