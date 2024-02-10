"use strict";
//Задание 1.
// // 1. Необходимо выводить на страницу текущую ширину
// // и высоту окна браузера, при изменении значений, вывод
// // также должен меняться.

const browserWidthEl = document.querySelector(".width");
const browserHeightEl = document.querySelector(".height");

printDesktopSize();

window.addEventListener("resize", printDesktopSize);

function printDesktopSize() {
  const width = window.outerWidth;
  const height = window.outerHeight;
  browserWidthEl.textContent = `Ширина окна браузера: ${width}`;
  browserHeightEl.textContent = `Высота окна браузера:  ${height}`;
}
