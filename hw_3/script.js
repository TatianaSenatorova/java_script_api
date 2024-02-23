"use strict";

// Урок 3. Сетевые запросы
// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.

const applicationKey = ""; //ваш ключ
const requestForRandomPhotos = `https://api.unsplash.com/photos/random?client_id=${applicationKey}`;

const photoEl = document.querySelector(".photo");
const imgBoxEl = document.querySelector(".photo__box");
const likesCounterEl = document.querySelector(".photo__likes-number");
const buttonLikeEl = document.querySelector(".button_like");
const buttonDislikeEl = document.querySelector(".button_dislike");
const previousPhotoBoxEl = document.querySelector(".previous");
const buttonPreviousEl = document.querySelector(".button_previous");

const allPhotosStorageKey = "photos";
const userLikesStorageKey = "userLikes";
const historyStorageKey = "history";

const photos = [];
const userLikes = [];
const history = [];

let countPrevPhoto = 0;

if (localStorage.getItem(allPhotosStorageKey)) {
  const initialPhotos = JSON.parse(localStorage.getItem(allPhotosStorageKey));
  photos.push(...initialPhotos);
}

if (localStorage.getItem(userLikesStorageKey)) {
  const initialUserLikes = JSON.parse(
    localStorage.getItem(userLikesStorageKey)
  );
  userLikes.push(...initialUserLikes);
}

if (localStorage.getItem(historyStorageKey)) {
  const initialHistory = JSON.parse(localStorage.getItem(historyStorageKey));
  history.push(...initialHistory);
}

fillPage();

photoEl.addEventListener("click", ({ target }) => {
  if (target.closest(".photo__box-like") && !buttonLikeEl.disabled) {
    changeButtonsLike();
    const photoToChangeLikes = getPhotoToChange(target);
    photoToChangeLikes.likes = +photoToChangeLikes.likes + 1;
    userLikes.push(photoToChangeLikes);
  } else if (target.matches(".button_dislike") && !buttonDislikeEl.disabled) {
    changeButtonsDislike();
    const photoToChangeLikes = getPhotoToChange(target);
    photoToChangeLikes.likes = +photoToChangeLikes.likes - 1;
    userLikes.splice(userLikes.indexOf(photoToChangeLikes), 1);
  }
  saveData();
});

previousPhotoBoxEl.addEventListener("click", ({ target }) => {
  if (target.matches(".button_previous")) {
    fillPreviousPhotos();
  }
});

async function fillPreviousPhotos() {
  const showPhotoItemIndex = photos.length - countPrevPhoto - 2;

  let photoData = await fetchImage(
    `https://api.unsplash.com/photos/${photos[showPhotoItemIndex].id}?client_id=${applicationKey}`
  );
  previousPhotoBoxEl.insertAdjacentHTML(
    "beforeend",
    `
  <img src="${photoData.urls.small}" alt="" class="photo__img">
  <p class="photo__author">${photoData.user.first_name} ${photoData.user.last_name}</p>
  `
  );
  const itemToChangeCountWatch = history.find(
    (item) => item.id === photoData.id
  );

  if (itemToChangeCountWatch !== undefined) {
    const indexItemCountChange = history.indexOf(itemToChangeCountWatch);
    history[indexItemCountChange].watch += 1;
  } else {
    history.push({ id: photoData.id, watch: 1 });
  }
  countPrevPhoto += 1;
  saveHistoryData();
  if (countPrevPhoto === photos.length - 1) {
    buttonPreviousEl.textContent = "У Вас больше нет фото в истории";
    buttonPreviousEl.disabled = true;
  }
}

function changeButtonsLike() {
  likesCounterEl.textContent = +likesCounterEl.textContent + 1;
  buttonLikeEl.disabled = true;
  buttonLikeEl.textContent = "Вы уже поставили лайк";
  buttonDislikeEl.disabled = false;
  buttonDislikeEl.textContent = "Удалить лайк";
}

function changeButtonsDislike() {
  likesCounterEl.textContent = +likesCounterEl.textContent - 1;
  buttonLikeEl.disabled = false;
  buttonLikeEl.textContent = "Поставьте лайк";
  buttonDislikeEl.disabled = true;
  buttonDislikeEl.textContent = "Вы не лайкнули";
}

function getPhotoToChange(target) {
  const photoId = target.closest(".photo").getAttribute("data-id");
  return photos.find((item) => item.id === photoId);
}

async function fetchImage(applicationKeyOrId) {
  try {
    const response = await fetch(applicationKeyOrId);
    if (!response.ok) {
      throw new Error("Сервер не отвечает");
    }
    const respData = await response.json();
    return respData;
  } catch (err) {
    alert(err);
  }
}

async function fillPage() {
  const photoData = await fetchImage(requestForRandomPhotos);
  photoEl.dataset.id = photoData.id;
  imgBoxEl.insertAdjacentHTML(
    "beforeend",
    `
  <img src="${photoData.urls.small}" alt="" class="photo__img">
  <p class="photo__author">${photoData.user.first_name} ${photoData.user.last_name}</p>
  `
  );
  if (userLikes.includes(photoData.id)) {
    changeButtonsLike();
    photoData.likes += 1;
  }
  likesCounterEl.textContent = photoData.likes;
  photos.push({ id: photoData.id, likes: photoData.likes });
  if (photos.length >= 2) {
    buttonPreviousEl.textContent = "Посмотреть предыдущее фото";
    buttonPreviousEl.disabled = false;
  }
  saveData();
}

function saveData() {
  localStorage.setItem(allPhotosStorageKey, JSON.stringify(photos));
  localStorage.setItem(userLikesStorageKey, JSON.stringify(userLikes));
}
function saveHistoryData() {
  localStorage.setItem(historyStorageKey, JSON.stringify(history));
}
