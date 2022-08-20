//Дата и время
function showTime() {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" }; //форма даты
  const currentDate = date.toLocaleDateString("en-Br", options);

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s; // форма времени

  document.getElementById("clock").textContent = time; //время
  document.getElementById("date").textContent = currentDate; //дата

  getTimeOfDay();
  setTimeout(
    showTime,
    1000
  ); /*вызов функции внутри неё самой с интервалом в 1 секунду */
}
showTime();

//Приветствие

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let greetingText = "";
  if (6 <= hours && hours < 12) {
    greetingText = "Good morning";
  } else if (12 <= hours && hours < 18) {
    greetingText = "Good afternoon";
  } else if (18 <= hours && hours < 24) {
    greetingText = "Good evening";
  } else if (0 <= hours && hours < 6) {
    greetingText = "Good night";
  }
  document.getElementById("time_day").textContent = greetingText;
}
getTimeOfDay();

//сохранение имени и города
window.addEventListener("unload", () =>
  localStorage.setItem(
    "vals",
    [...document.querySelectorAll('input[type="text"]')].map((e, i) => e.value)
  )
);

let vals = localStorage.getItem("vals")
  ? localStorage.getItem("vals").split`,`
  : "";
let inp = document.querySelectorAll('input[type="text"]');
for (let i = 0; i < inp.length; i++) vals[i] ? (inp[i].value = vals[i]) : "";

/*
let inp = document.querySelectorAll(".name"),
  vals = localStorage.getItem("val")
    ? localStorage.getItem("val").split`,`
    : "";

for (let i = 0; i < inp.length; i++) vals[i] ? (inp[i].value = vals[i]) : "";
window.addEventListener("beforeunload", () =>
  localStorage.setItem(
    "vals",
    [...inp].map((e) => e.value)
  )
);
*/
//смена фона
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function setBg() {
  let time = "";
  var d = new Date();
  //выбор папки
  if (6 <= d.getHours() && d.getHours() < 12) {
    time = "morning";
  } else if (12 <= d.getHours() && d.getHours() < 18) {
    time = "afternoon";
  } else if (18 <= d.getHours() && d.getHours() < 24) {
    time = "evening";
  } else if (0 <= d.getHours() && d.getHours() < 6) {
    time = "night";
  }
  let bg = getRandomNum(1, 20); //выбор номера
  let bgNum = bg.toString().padStart(2, "0");

  let img = new Image(); // Создаёт новое изображение
  // Устанавливает источник файла

  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${time}/${bgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`; //смена изображения
  };
}
//слайдер
setBg();
const slidePrev = document.querySelectorAll(".slide-prev");
const sliderNext = document.querySelectorAll(".slide-next");
let bgImgIndex = getRandomNum(1, 20);
const getSlideNext = () => {
  bgImgIndex = bgImgIndex === 19 ? 0 : bgImgIndex + 1;

  setBg();
};
const getSlidePrev = () => {
  bgImgIndex = bgImgIndex === 0 ? 19 : bgImgIndex - 1;

  setBg();
};

slidePrev.forEach((i) => i.addEventListener("click", getSlidePrev, true));
sliderNext.forEach((i) => i.addEventListener("click", getSlideNext, true));

//погода
//находим элементы
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

//вывод данных погоды на экран
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lange=en&APPID=5221ede1c1f8decc96c022c86753dd10&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
}
//смена погоды
city.addEventListener("change", () => {
  localStorage.setItem("city", city.value);
  getWeather();
});

//сохраняем город
document.addEventListener("DOMContentLoaded", getWeather);

//Цитаты
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const change_quote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * 85) + 1; //рандомный выбор из 85 цитат
  quote.textContent = data[randomNum].text; //вывод на экран
  author.textContent = data[randomNum].author;
}
getQuotes();
change_quote.addEventListener("click", getQuotes); //смена цитаты по клику

//плеер

import playList from "./playList.js";
console.log(playList);
const audio = new Audio();
let time = document.querySelector(".audioTime"); // Берём аудио дорожку
let play = document.querySelector(".play"); // Берём кнопку проигрывания
let prev = document.querySelector(".play-prev"); // Берём кнопку переключения предыдущего трека
let next = document.querySelector(".play-next"); // Берём кнопку переключение следующего трека
let isPlay = false;
let playNum = 0;
let playListContainer = document.querySelector(".play-list");
const track_title = document.querySelector('.track_title');// название трека который играет
let track_time = document.querySelector(".track_time")//время трека

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  //вкл и выкл одной кнопкой
  if (isPlay == false) {
    track_title.textContent = playList[playNum].title;//показываем название трека при плей
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
    track_title.textContent = playList[playNum].title;//показываем название трека при паузе и перелистывании
  }
}
play.addEventListener("click", playAudio);


//меняем кнопку плей при клике
function toggleBtn() {
  play.classList.toggle("pause");
}
play.addEventListener("click", toggleBtn);
//создаём список треков в html

playList.forEach((element) => {
  const li = document.createElement("li"); //создать на странице элемент li - один из пунктов списка воспроизведения

  li.classList.add("play-item"); //добавить этому элементу класс 'play-item'
  li.textContent = element.title; //добавить этому элементу текстовое содержимое - название трека
 
  playListContainer.append(li); //добавить созданный элемент li в уже существующий на странице элемент ul с классом 'play-list'
});

next.addEventListener("click", () => {
  //трек вперёд
  playNum = playNum === 11 ? 0 : playNum + 1;
  playAudio();
  audio.play();
  play.classList.add("pause");
  isPlay = true;
});
//трек назад
prev.addEventListener("click", () => {
  play.classList.add("pause");
  playNum = playNum === 0 ? 11 : playNum - 1; //треки по кругу
  playAudio();
  audio.play();
  isPlay = true; //для адекватной работы кнопки play/pause, если запуск треков начат с кнопки next
});

//плеер, всякие свистелки и всё такое

//Звук
// сразу выставляем уровень звука на средний
let volume = 0.5;
audio.volume = volume;
// показываем какой уровень выставлен
document.querySelector(".vol").innerHTML = audio.volume * 10;
// понижение звука
document.querySelector(".volume-down").addEventListener("click", () => {
  if (audio.volume !== 0) {
    volume -= 0.1;
    audio.volume = volume.toFixed(1); //убираем лишние цифры после точки
    document.querySelector(".vol").innerHTML = audio.volume * 10;
    audio.muted = false;
  }
});
document.querySelector(".volume-up").addEventListener("click", () => {
  if (audio.volume !== 1) {
    volume += 0.1;
    audio.volume = volume.toFixed(1);
    document.querySelector(".vol").innerHTML = audio.volume * 10;
    audio.muted = false;
  }
});

//прогресс бар и автовоспроизведение следующей песни
let audioPlay = setInterval(function () {
  
  // Получаем значение на какой секунде песня
  let audioTime = Math.round(audio.currentTime);
  // Получаем всё время песни
  let audioLength = Math.round(audio.duration);
  // Назначаем ширину элементу time
  time.style.width = (audioTime * 100) / audioLength + "%";
  //выводим время трека
  track_time.textContent = `${String(Math.floor(audio.currentTime / 60))}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')} / ${playList[playNum].duration}`;
  // Сравниваем, на какой секунде сейчас трек и всего сколько времени длится
  if (audioTime == audioLength && playNum < 11) {
    playNum++; // То Увеличиваем переменную
    playAudio(playNum); // Меняем трек
    audio.play(); //запуск песни
    isPlay = true; //для паузы с одного клика

    // Иначе проверяем тоже самое, но переменная treck больше или равна 11
  } else if (audioTime == audioLength && playNum >= 11) {
    playNum = 0; // То присваиваем treck ноль
    playAudio(playNum); //Меняем трек
    audio.play();
    isPlay = true;
  }
}, 10);



//настройки приложения

//-------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Кнопка по которой происходит клик
  let callBackButton = document.getElementById("callback-button");

  // Модальное окно, которое необходимо открыть
  let modal1 = document.getElementById("modal-1");

  // Кнопка "закрыть" внутри модального окна
  let closeButton = modal1.getElementsByClassName("modal__close-button")[0];

  // Тег body для запрета прокрутки
  let tagBody = document.getElementsByTagName("body");

  callBackButton.onclick = function (e) {
    e.preventDefault();
    modal1.classList.add("modal_active");
  };

  closeButton.onclick = function (e) {
    e.preventDefault();
    modal1.classList.remove("modal_active");
  };

  modal1.onmousedown = function (e) {
    let target = e.target;
    let modalContent = modal1.getElementsByClassName("modal__content")[0];
    if (target.closest("." + modalContent.className) === null) {
      this.classList.remove("modal_active");
    }
  };
});
/*-------------------------------*/
