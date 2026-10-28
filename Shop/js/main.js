// js/index.js
// history.scrollRestoration = "manual";
const banner = document.querySelector(".black-banner");
const closeBtn = document.querySelector(".black-banner__close");

closeBtn?.addEventListener("click", () => {
  banner.remove();
});

const header = document.querySelector(".header");
const burgerBtn = document.querySelector(".header__burger");
const menuLinks = document.querySelectorAll(".header__menu .menu__link");

burgerBtn?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("header--open");
  burgerBtn.classList.toggle("burger--open");
  burgerBtn.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("page__body--no-scroll");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("header--open");
    burgerBtn.classList.remove("burger--open");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("page__body--no-scroll");
  });
});
const reviewsSwiper = new Swiper(".reviews__slider-wrapper", {
  slidesPerView: 3,
  spaceBetween: 20,

  navigation: {
    nextEl: ".reviews__nav-btn--next",
    prevEl: ".reviews__nav-btn--prev",
  },

  breakpoints: {
    228: { slidesPerView: 1, spaceBetween: 20 },
    528: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
  },
});
