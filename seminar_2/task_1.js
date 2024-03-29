"use strict";

// Вам необходимо создать навигационное меню для веб-сайта, в
// котором меняется активный пункт при клике без фактического
// перехода на другие страницы. Меню должно обладать следующими
// характеристиками:
//     1. Подсветка активного пункта: При клике на пункт меню он
// должен становиться активным, и для активного пункта должен
// применяться определенный стиль (например, изменение цвета
// фона). Если выбрать другой пункт, предыдущий должен
// перестать быть активным.
// 2. Эффекты наведения: При наведении курсора на пункты меню
// должны применяться эффекты (например, изменение цвета
// текста или фона) для подсказки пользователю, что пункт меню
// является интерактивным.

const menuEl = document.querySelector(".menu");
const menuEls = document.querySelectorAll(".menu__link");

//делегирование: мы вместо того, чтобы вешать событие на каждый элемент навигации, вешаем слушателя события на их общего родителя.

//почему когда мы вешаем событие на меню общее, а кликаем на элемент навигации, событие воспринимает меню: потому что событие всплывает. У нас все события по умолчанию обрабатываются на всплытии. если у нас все нужные нам элементы лежат в одном родителе, то их родитель сможет обработать клик по любому из них. А понять, по какому конкретно элементу был клик, мы можем использовав target. target -  это целевой элемент, куда конкретно был произведен клик.
menuEl.addEventListener("click", ({ target }) => {
  if (target.matches(".menu__link")) {
    console.log(target);
    changeStateMenuItem(target);
  }
});

function changeStateMenuItem(target) {
    //Array.from(menuEls) - можно так перевести в массив из node list, а можно с помощью rest оператора
  const itemToChange = [...menuEls].find((item) =>
    item.matches(".active")
  );
  itemToChange.classList.remove("active");
  //почему здесь оптимальнее использовать find? потому что forEach пробежится по всем элементам до конца, а find закончится как только найдет нужный элемент
  target.classList.add("active");
}

