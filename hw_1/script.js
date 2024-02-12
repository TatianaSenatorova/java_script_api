"use strict";

//Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

//На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
//Каждая строка таблицы должна содержать информацию о занятии, а именно:
//- название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

// Начальные данные (JSON):

const allActivitiesLocalStorageKey = "activities";
const UserActivitiesLocalStorageKey = "user_activities";

const initialActivities =
  '[{"id":1,"name":"Йога","time":"10:00 - 11:00","maxParticipants":15,"currentParticipants":15},{"id":2,"name":"Пилатес","time":"11:30 - 12:30","maxParticipants":10,"currentParticipants":5},{"id":3,"name":"Кроссфит","time":"13:00 - 14:00","maxParticipants":20,"currentParticipants":15},{"id":4,"name":"Танцы","time":"14:30 - 15:30","maxParticipants":12,"currentParticipants":10},{"id":5,"name":"Бокс","time":"16:00 - 17:00","maxParticipants":8,"currentParticipants":6}]';

if (!localStorage.getItem(allActivitiesLocalStorageKey)) {
  localStorage.setItem(allActivitiesLocalStorageKey, initialActivities);
}

const activities = JSON.parse(
  localStorage.getItem(allActivitiesLocalStorageKey)
);

const userActivities = [];

if (localStorage.getItem(UserActivitiesLocalStorageKey)) {
  const userInitialActivities = JSON.parse(
    localStorage.getItem(UserActivitiesLocalStorageKey)
  );
  userActivities.push(...userInitialActivities);
} else {
  localStorage.setItem(UserActivitiesLocalStorageKey, userActivities);
}

const activitiesListEl = document.querySelector(".activities-list");

addActivities();

activitiesListEl.addEventListener("click", ({ target }) => {
  if (target.matches(".button-add") && !target.matches(".non-active_button")) {
    const parentEl = target.closest(".activity");
    const parentId = target.closest(".activity").getAttribute("data-id");
    changePeopleAdd(parentEl);
    const indexActivityToChange = activities.indexOf(
      activities.find((item) => item.id === +parentId)
    );
    activities[indexActivityToChange].currentParticipants += 1;
    userActivities.push(parentId);
    changeButtonsAddState(parentEl);
    changeButtonsCancelState(parentEl);
    saveData(activities);
    saveUserData(userActivities);
  } else if (
    target.matches(".button-cancel") &&
    target.matches(".active-button")
  ) {
    const parentEl = target.closest(".activity");
    const parentId = target.closest(".activity").getAttribute("data-id");
    changePeopleRemove(parentEl);
    const indexActivityToChange = activities.indexOf(
      activities.find((item) => item.id === +parentId)
    );
    activities[indexActivityToChange].currentParticipants -= 1;
    const indexUserActivityToChange = userActivities.indexOf(
      userActivities.find((item) => item.id === +parentId)
    );

    userActivities.splice(indexUserActivityToChange, 1);

    changeButtonsAddState(parentEl);
    changeButtonsCancelState(parentEl);
    saveData(activities);
    saveUserData(userActivities);
  }
});

function addActivities() {
  activities.forEach((item) => {
    if (userActivities.includes(String(item.id))) {
      activitiesListEl.insertAdjacentHTML(
        "beforeend",
        `<tr class="activity" data-id=${item.id}>
          <td class="activity__title">${item.name}</td>
          <td class="activity__time">${item.time}</td>
          <td class="activity__max-people">${item.maxParticipants}</td>
          <td class="activity__current-people">${item.currentParticipants}</td>
          <td class="activity-button"><button class="button-add non-active_button" disabled>Записаться</button></td>
                  <td class="activity-button"><button class="button-cancel active-button">Отменить запись</button></td>
                  </tr>
         `
      );
    } else if (item.currentParticipants === item.maxParticipants) {
      activitiesListEl.insertAdjacentHTML(
        "beforeend",
        `<tr class="activity" data-id=${item.id}>
          <td class="activity__title">${item.name}</td>
          <td class="activity__time">${item.time}</td>
          <td class="activity__max-people">${item.maxParticipants}</td>
          <td class="activity__current-people">${item.currentParticipants}</td>
          <td class="activity-button"><button class="button-add non-active_button" disabled>Записаться</button></td>
                  <td class="activity-button"><button class="button-cancel" disabled>Отменить запись</button></td>
                  </tr>
         `
      );
    } else {
      activitiesListEl.insertAdjacentHTML(
        "beforeend",
        `<tr class="activity" data-id=${item.id}>
          <td class="activity__title">${item.name}</td>
          <td class="activity__time">${item.time}</td>
          <td class="activity__max-people">${item.maxParticipants}</td>
          <td class="activity__current-people">${item.currentParticipants}</td>
          <td class="activity-button"><button class="button-add">Записаться</button></td>
                  <td class="activity-button"><button class="button-cancel">Отменить запись</button></td>
                  </tr>
         `
      );
    }
  });
}

function changeButtonsAddState(parentEl) {
  const buttonToChange = parentEl.querySelector(".button-add");
  buttonToChange.classList.toggle("non-active_button");
  buttonToChange.disabled = !buttonToChange.disabled;
}

function changeButtonsCancelState(parentEl) {
  const buttonToChange = parentEl.querySelector(".button-cancel");
  buttonToChange.classList.toggle("active-button");
}

function changePeopleAdd(parentEl) {
  const currentPeopleNumberEl = parentEl.querySelector(
    ".activity__current-people"
  );
  const changePeopleNumber = +currentPeopleNumberEl.textContent + 1;
  currentPeopleNumberEl.textContent = changePeopleNumber;
}

function changePeopleRemove(parentEl) {
  const currentPeopleNumberEl = parentEl.querySelector(
    ".activity__current-people"
  );
  const changePeopleNumber = +currentPeopleNumberEl.textContent - 1;
  currentPeopleNumberEl.textContent = changePeopleNumber;
}

function saveData(activities) {
  localStorage.setItem(
    allActivitiesLocalStorageKey,
    JSON.stringify(activities)
  );
}

function saveUserData(userActivities) {
  localStorage.setItem(
    UserActivitiesLocalStorageKey,
    JSON.stringify(userActivities)
  );
}
