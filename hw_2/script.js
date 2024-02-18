"use strict";

// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const sliders = [
  {
    id: 1,
    src: "./img/IMG_2089_1_11zon.webp",
    desc: "italian style house",
  },
  {
    id: "2",
    src: "./img/IMG_2098_2_11zon.webp",
    desc: "georgian bank",
  },
  {
    id: 3,
    src: "./img/IMG_2321_3_11zon.webp",
    desc: "fountain",
  },
  {
    id: 4,
    src: "./img/IMG_2406_4_11zon.webp",
    desc: "georgian old house",
  },
  {
    id: 5,
    src: "./img/IMG_2415_5_11zon.webp",
    desc: "drawing cat on the wall",
  },
];

const sliderContainerEl = document.querySelector(".slider-container");
const slideWindowEl = document.querySelector(".slider__window");
const sliderRowEl = document.querySelector(".slider__row");
const navigationEl = document.querySelector(".navigation");
let sliderWidth = slideWindowEl.offsetWidth;
let sliderRowElWidth = sliderWidth * sliders.length;
let currentCountSlide = 0;

document.addEventListener("DOMContentLoaded", () => {
  fillSlider();
  currentCountSlide = 1;
});

window.addEventListener("resize", changeSlideSize);

sliderContainerEl.addEventListener("click", ({ target }) => {
  console.log(target);
  if (target.closest(".slider__box-arrow-right")) {
    showNextSlide(getCurrentCard());
  } else if (target.closest(".slider__box-arrow-left")) {
    showPreviousSlide(getCurrentCard());
  } else if (target.closest(".navigation__item")) {
    showChoosenSlide(target, getCurrentCard());
  }
});

function fillSlider() {
  for (let i = 0; i < sliders.length; i++) {
    if (i === 0) {
      sliderRowEl.insertAdjacentHTML(
        "beforeend",
        `      
            <img class="slider__img" data-id=${sliders[i].id} src=${sliders[i].src} alt=${sliders[i].desc}>
        `
      );
      navigationEl.insertAdjacentHTML(
        "beforeend",
        `
          <div class="navigation__item active-indicator" data-nav=${i + 1}>
          </div>
        `
      );
    } else {
      sliderRowEl.insertAdjacentHTML(
        "beforeend",
        `      
          <img class="slider__img" data-id=${sliders[i].id} src=${sliders[i].src} alt=${sliders[i].desc}>
      `
      );
      navigationEl.insertAdjacentHTML(
        "beforeend",
        `
        <div class="navigation__item" data-nav=${i + 1}>
        </div>
      `
      );
    }
  }
}

const imgEls = sliderRowEl.querySelectorAll(".slider__img");

function changeSlideSize() {
  sliderWidth = slideWindowEl.offsetWidth;
  imgEls.forEach((item) => {
    item.style.width = `${sliderWidth}`;
  });
}

function getCurrentCard() {
  const currentPaginationEl = navigationEl.querySelector(
    `[data-nav='${currentCountSlide}']`
  );
  currentPaginationEl.classList.remove("active-indicator");
  return currentPaginationEl;
}

function showNextSlide(currentPaginationEl) {
  if (currentCountSlide === sliders.length) {
    currentCountSlide = 1;
    navigationEl
      .querySelector(`[data-nav='${currentCountSlide}']`)
      .classList.add("active-indicator");
    sliderRowEl.style.transform = `translateX(0px)`;
  } else {
    sliderRowEl.style.transform = `translateX(-${
      sliderWidth * currentCountSlide
    }px)`;
    currentPaginationEl.nextElementSibling.classList.add("active-indicator");
    currentCountSlide++;
  }
}

function showPreviousSlide(currentPaginationEl) {
  if (currentCountSlide === 1) {
    currentCountSlide = sliders.length;
    navigationEl
      .querySelector(`[data-nav='${currentCountSlide}']`)
      .classList.add("active-indicator");
  
  } else {
    currentPaginationEl.previousElementSibling.classList.add(
      "active-indicator"
    );
    currentCountSlide--;
  }
  sliderRowEl.style.transform = `translateX(${
    -sliderWidth * (currentCountSlide - 1)
  }px)`;
}

function showChoosenSlide(target) {
  target.classList.add("active-indicator");
  currentCountSlide = (+target.getAttribute('data-nav'));
  sliderRowEl.style.transform = `translateX(${
    -sliderWidth * (currentCountSlide - 1)
  }px)`;
}
