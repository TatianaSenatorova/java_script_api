"use strict";

// Создайте простое модальное окно, которое появляется при клике
// на кнопку "Открыть модальное окно" и закрывается при клике на
// кнопку "Закрыть". Модальное окно должно содержать заголовок
// "Модальное окно" и кнопку для закрытия. Модальное окно должно
// плавно появляться и исчезать при открытии и закрытии.

const buttonOpenEl = document.querySelector(".open_popup");
const modalWindowEl = document.querySelector(".popup");
const buttonCloseEl = document.querySelector(".button-close");

buttonOpenEl.addEventListener("click", () => {
  modalWindowEl.classList.add("d-none");
});

buttonCloseEl.addEventListener("click", () => {
  modalWindowEl.classList.remove("d-none");
});
