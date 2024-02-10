"use strict";

// Задание 3.
// Необходимо создать страницу со списком статей.
//     Каждая статья состоит из id, заголовка, текста статьи.
//     id - будем брать из unix timestamp (число, кот говорит сколько милисекунд прошло с 1-го января 1970г).
//     Необходимо подготовить список статей в JSON-формате,
//     которые будут выводиться на странице при первом ее
// открытии.
//     Необходимо реализовать возможность удаления статьи.
//     Необходимо реализовать возможность добавления статьи.
//     Необходимо реализовать возможность изменения статьи,
//     ввод данных можно реализовать через prompt.
//     Статьи должны сохраняться в локальное хранилище
// браузера, и должны быть доступны после перезагрузки
// страницы.

//создаем константу, под которой у нас в localstorage будут храниться ключи
const localStorageKey = "articles"; //мы эту переменную будем использовать, чтобы положить данные, получить и тд.

const dB = {};

const initialArticles =
  '[{"id":1707475610412,"title":"header-1","text":"text-1"},{"id":1707475611233,"title":"header-2","text":"text-2"}]';

//проверяем, есть ли в localStorage данные под нашей переменной localStorageKey

if (!localStorage.getItem(localStorageKey)) {
  localStorage.setItem(localStorageKey, initialArticles);
}
const articles = JSON.parse(localStorage.getItem(localStorageKey));

const articlesListEl = document.querySelector(".list-article");

const buttonAddArticle = document.querySelector(".addArticle");

buttonAddArticle.addEventListener("click", () => {
  const title = prompt("Введите заголовок статьи");
  const text = prompt("Введите текст статьи");
  const newArticle = { id: Date.now(), title: title, text: text };
  addedArticle(newArticle);
  articles.push(newArticle);
  saveData(articles);
});

articles.forEach((item) => {
  addedArticle(item);
});

function addedArticle(item) {
  articlesListEl.insertAdjacentHTML(
    "beforeend",
    ` <div class="article" data-id=${item.id}>
        <div class="title">${item.title}</div>
        <div class="text">${item.text}</div>
         <button class="buttonDel">Удалить статью</button>
         <button class="buttonChange">Изменить статью</button> 
        </div>
        `
  );
}

//{target} - когда вот так передаем в функцию после слушателя события мы говорим, что не все принимаем, а только таргет - это деструктуризация. То есть мы говорим, что весь объект не нужен, а достань только target и передай его. у нас уже тогда не будет передана переменная event
articlesListEl.addEventListener("click", ({ target }) => {
  //matches в скобках указывается селектор
  if (target.matches(".buttonDel")) {
    const parentEl = target.closest(".article");

    //closest('.article') -  ищет элемент с таким селектором, начиная с текущего
    parentEl.remove();

    const indexArticle = articles.findIndex((item) => {
      return item.id === +parentEl.dataset.id;
    });

    articles.splice(indexArticle, 1);

    saveData(articles);
  } else if (target.matches(".buttonChange")) {
    const parentEl = target.closest(".article");
    const titleEl = parentEl.querySelector(".title");
    const textEl = parentEl.querySelector(".text");

    const title = titleEl.textContent;
    const text = textEl.textContent;
    const newTitle = prompt("Введите заголовок статьи", title);
    const newText = prompt("Введите текст статьи", text);
    titleEl.textContent = newTitle;
    textEl.textContent = newText;

    const resArticle = articles.find((item) => {
      return item.id === +parentEl.dataset.id;
    });
    resArticle.title = newTitle;
    resArticle.text = newText;
    saveData(articles);
  }
});

function saveData(array) {
  localStorage.setItem(localStorageKey, JSON.stringify(array));
}
