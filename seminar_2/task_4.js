"use strict";

// Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям
// отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность
// для этого опросника, используя HTML, CSS и JavaScript.
// 1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен
// иметь несколько вариантов ответов.
// 2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
// 3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
// 4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все
// вопросы, и отобразить выбранные им варианты ответов.
// 5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить
// на все вопросы перед завершением опроса.
// 6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего
// пользовательского опыта.

const questionEls = document.querySelectorAll(".question");
const resultEl = document.querySelector(".result");
const errorEl = document.querySelector(".error-message");
const buttonSubmitEl = document.getElementById("submit");

buttonSubmitEl.addEventListener("click", function () {
  const resultArray = [];
  questionEls.forEach((questionEl) => {
    const inputValue = questionEl.querySelector("input:checked")?.value;
 
    if (inputValue === undefined) {
   
      questionEl.classList.add("error");
      
    } else {
      questionEl.classList.remove("error");
      resultArray.push(inputValue);
    }
  });
  console.log(resultArray.length, questionEls.length);

  if (resultArray.length === questionEls.length) {
    errorEl.textContent = "Ответил на все вопросы";
   
    resultEl.style.removeProperty("display");
    resultArray.forEach((answer, index) => {
      resultEl.insertAdjacentHTML(
        "beforeend",
        `
      <p id="result-q${index + 1}">Вопрос ${
          index + 1
        }: <span>${answer}</span></p>
      `
      );
    });
  
    buttonSubmitEl.disabled = true;
  } else {
    errorEl.textContent = "Не на все вопросы получены ответы";
  }
});
