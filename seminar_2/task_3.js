"use strict";

// У вас есть кнопка "Купить". Создайте скрипт, который при клике
// на эту кнопку меняет её текст на "Товар добавлен в корзину" в
// течение 2 секунд, а затем возвращает исходный текст "Купить".
//     В обработчике события клика также проверьте, является ли
// событие доверенным (event.isTrusted). Если событие является
// доверенным, выполните изменение текста кнопки и убедитесь,
//     что после 2 секунд текст возвращается в исходное состояние.

// isTrusted - свойство объекта Event, доступное только на чтение. Принимает значение true, если событие было инициировано действиями пользователя, и false, если событие было создано или изменено скриптом, либо с помощью dispatchEvent. Допустим, в коде ниже мы уберем проверку event.isTrusted. и напишем следующие код: const clickEvent = new Event('click'). buttonBuy.dispatchEvent(clickEvent)


const buttonBuy = document.querySelector(".button-buy");

console.log(buttonBuy);

buttonBuy.addEventListener("click", (event) => {
  if (event.isTrusted) {
    buttonBuy.textContent = "Товар добавлен в корзину";
    setTimeout(() => {
      buttonBuy.textContent = "Купить";
    }, 2000);
  }
});

// const clickEvent = new Event('click');buttonBuy.dispatchEvent(clickEvent);
//Можно ли обойти вот эту проверку isTrusted? в обычных нормальных браузерах нет. там все по-честному. но никто не запрещает взять и сменить браузер, сделать свой браузер. и этот isTrusted сделать всегда правдивым 

