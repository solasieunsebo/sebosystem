document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".quote-form");
  const agreeCheckbox = document.getElementById("agree");
  const modal = document.getElementById("popup-modal");
  const closeModal = document.getElementById("close-modal");

  // 팝업 닫기 함수
  function hideModal() {
    modal.style.display = "none";
  }

  // 폼 전송 시 체크 여부 확인 + Formspree 처리
  form.addEventListener("submit", async function (e) {
    if (!agreeCheckbox.checked) {
      e.preventDefault();
      modal.style.display = "flex";
      return;
    }

    // ✅ Formspree 전송
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        window.location.href = "thankyou.html";
      } else {
        alert("전송 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("네트워크 오류가 발생했습니다.");
    }
  });

  // 확인 버튼 클릭 시 팝업 닫기
  closeModal.addEventListener("click", hideModal);

  // ESC 키로 팝업 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      hideModal();
    }
  });

  // 모달 바깥 클릭 시 닫기
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });
});
