// ✅ main.js — 수정 버전 (복붙 가능)

document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.querySelector(".topbar");
  const nav = document.querySelector(".nav");
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("closeBtn");
  const emailSpan = document.getElementById("email");

  /* ⚙️ PC 드롭다운 */
  if (nav && topbar) {
    nav.addEventListener("mouseenter", () => topbar.classList.add("active"));
    topbar.addEventListener("mouseleave", () => topbar.classList.remove("active"));
  }

  /* 📧 이메일 자동 생성 */
  if (emailSpan) {
    const user = "yc.ko";
    const domain = "sebosystem.kr";
    emailSpan.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
  }

  /* 📱 모바일 메뉴 */
  if (hamburger && mobileNav && overlay) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.add("open");
      overlay.classList.add("show");
      document.body.classList.add("no-scroll", "is-open");
    });

    function closeMobileMenu() {
      mobileNav.classList.remove("open");
      overlay.classList.remove("show");
      document.body.classList.remove("no-scroll", "is-open");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
    overlay.addEventListener("click", closeMobileMenu);

    /* 모바일 아코디언 (부드럽게 열림) */
    const submenuParents = document.querySelectorAll(".mobile-nav .has-submenu");
    submenuParents.forEach((parent) => {
      const link = parent.querySelector("a");
      if (link) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const isOpen = parent.classList.contains("open");

          submenuParents.forEach((li) => {
            li.classList.remove("open");
            const submenu = li.querySelector(".submenu");
            if (submenu) submenu.style.maxHeight = null;
          });

          if (!isOpen) {
            parent.classList.add("open");
            const submenu = parent.querySelector(".submenu");
            if (submenu) submenu.style.maxHeight = submenu.scrollHeight + "px";
          }
        });
      }
    });
  }

  /* 🔼 맨 위로 버튼 (100% 작동) */
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "auto";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
      }
    });
  }
  
});
