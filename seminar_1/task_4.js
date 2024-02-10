"use strict";

// Необходимо создать страницу, в которой будут работать
// все три кнопки.
// - При нажатии на кнопку "Добавить элемент" на страницу
// добавляется новый квадратный элемент (<div>) с размерами
//     100x100 пикселей. Этот элемент должен иметь класс .box
//     и содержать текст, указывающий порядковый номер элемента
//     (1, 2, 3 и так далее).
//     - При нажатии на кнопку "Удалить элемент" удаляется
//     последний добавленный элемент, если таковой имеется.
//     - При нажатии на кнопку "Клонировать элемент" создается
//     копия последнего добавленного элемента и добавляется на
//     страницу. Если последнего добавленного элемента нет на
//     странице, необходимо вывести сообщение в alert, с надписью
//     о невозможности клонирования, так как клонировать нечего.

const addButtonEl = document.querySelector("#addButton");
const removeButtonEl = document.querySelector("#removeButton");
const cloneButtonEl = document.querySelector("#cloneButton");

const containerEl = document.querySelector("#container");

addButtonEl.addEventListener("click", addElement);
removeButtonEl.addEventListener("click", removeElement);
cloneButtonEl.addEventListener("click", cloneElement);

function addElement() {
  const nextNum = containerEl.children.length + 1;
  const newEl = document.createElement("div");
  newEl.classList.add("box");
  newEl.textContent = nextNum;
  containerEl.insertAdjacentElement("beforeend", newEl);
}

function removeElement() {
  //есть children, есть childNodes. Отличие есть: childNodes выводит все (и комментарии и тексты), children только теги вложенные
  //lastElementChild - возвращает последнего ребенка
  //lastChild - возвращает последнюю ноду
  containerEl.lastElementChild?.remove();
  //?. - оператор опциональной последовательности. Если перед ?. undefined, то отменяется последующее действие.
}

function cloneElement() {
  const cloneEl = containerEl.lastElementChild?.cloneNode(true);
  if (cloneEl) {
    containerEl.insertAdjacentElement("beforeend", cloneEl);
    const nextNum = containerEl.children.length + 1;
    cloneEl.textContent = nextNum;
  } else {
    alert("Клонировать нечего");
  }
}
