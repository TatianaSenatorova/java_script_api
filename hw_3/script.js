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

const applicationKey = "nhmiJOXlNEj7sNCc-IhRbDgp_89Gs_owPDtJycLkHSg";
const photoEl = document.querySelector(".photo");
const imgBoxEl = document.querySelector(".photo__box");
const likesCounterEl = document.querySelector(".photo__likes-number");
const buttonLikeEl = document.querySelector(".button_like");
const allPhotosStorageKey = "photos";
const userLikesStorageKey = "userLikes";

const photos = [];
const userLikes = [];

if (localStorage.getItem(allPhotosStorageKey)) {
  const initialPhotos = JSON.parse(localStorage.getItem(allPhotosStorageKey));
  photos.push(...initialPhotos);
}

if (localStorage.getItem(userLikesStorageKey)) {
  const initialUserLikes = JSON.parse(localStorage.getItem(userLikesStorageKey));
  userLikes.push(...initialUserLikes);
}

photoEl.addEventListener("click", ({ target }) => {
  if (target.closest(".photo__box-like") && !buttonLikeEl.disabled) {
    const numLikesThisPhoto = (+likesCounterEl.textContent) + 1;
    likesCounterEl.textContent = numLikesThisPhoto;
    buttonLikeEl.disabled = true;
    buttonLikeEl.textContent = "Вы уже поставили лайк";
  } else if (target.closest(".photo__box-dislike")) {
  }
});

fillPage();

async function fetchImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${applicationKey}`
    );
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
  const photoData = await fetchImage();
  imgBoxEl.insertAdjacentHTML(
    "beforeend",
    `
  <img src="${photoData.urls.small}" alt="" class="photo__img">
  <p class="photo__author">${photoData.user.first_name} ${photoData.user.last_name}</p>
  `
  );
  likesCounterEl.textContent = photoData.likes;
  saveDownloadedPhoto(photoData);
}

function saveDownloadedPhoto(photoData) {
  photos.push({ id: photoData.id, likes: photoData.likes });
  saveData(photos);
}

function saveData(photos) {
  localStorage.setItem(allPhotosStorageKey, JSON.stringify(photos));
}
