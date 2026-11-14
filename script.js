document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ハンバーガーメニューの開閉
  // =========================
  const menuToggle = document.querySelector(".menu-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (menuToggle && globalNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "メニューを開く" : "メニューを閉じる"
      );

      globalNav.classList.toggle("is-open", !isOpen);
    });

    // メニュー内のリンクをクリックしたら閉じる
    globalNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
        globalNav.classList.remove("is-open");
      });
    });
  }

  // =========================
  // スライドショー
  // =========================
  const hero = document.querySelector(".hero");

  if (!hero) return;

  const slides = hero.querySelectorAll(".hero-slide");
  const indicators = hero.querySelectorAll(".slide-indicators button");
  const prevButton = hero.querySelector(".slide-arrow.prev");
  const nextButton = hero.querySelector(".slide-arrow.next");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let timer;

  // 表示するスライドを切り替える
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    indicators.forEach((button, i) => {
      button.classList.toggle("active", i === currentSlide);
      button.setAttribute(
        "aria-current",
        i === currentSlide ? "true" : "false"
      );
    });
  }

  // 自動切り替えを開始する
  function startSlideshow() {
    clearInterval(timer);

    timer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  // 前の画像へ
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showSlide(currentSlide - 1);
      startSlideshow();
    });
  }

  // 次の画像へ
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showSlide(currentSlide + 1);
      startSlideshow();
    });
  }

  // 丸印をクリックして画像を選ぶ
  indicators.forEach((button, i) => {
    button.addEventListener("click", () => {
      showSlide(i);
      startSlideshow();
    });
  });

  // 最初の画像を表示
  showSlide(0);
  startSlideshow();

});
