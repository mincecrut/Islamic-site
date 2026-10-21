/* =========================================================
   Нур — скрипты сайта
   Всё работает без фреймворков и без сборки.
   ========================================================= */

/* ---------- Данные: русские названия 114 сур ----------
   Арабские названия и количество аятов берутся из API.
   Порядок в массиве = номер суры (индекс + 1). */
const surahNamesRu = [
  "Аль-Фатиха", "Аль-Бакара", "Али Имран", "Ан-Ниса", "Аль-Маида",
  "Аль-Ан‘ам", "Аль-А‘раф", "Аль-Анфаль", "Ат-Тауба", "Юнус",
  "Худ", "Юсуф", "Ар-Ра‘д", "Ибрахим", "Аль-Хиджр",
  "Ан-Нахль", "Аль-Исра", "Аль-Кахф", "Марьям", "Та Ха",
  "Аль-Анбийа", "Аль-Хаджж", "Аль-Му’минун", "Ан-Нур", "Аль-Фуркан",
  "Аш-Шу‘ара", "Ан-Намль", "Аль-Касас", "Аль-‘Анкабут", "Ар-Рум",
  "Лукман", "Ас-Саджда", "Аль-Ахзаб", "Саба", "Фатыр",
  "Я Син", "Ас-Саффат", "Сад", "Аз-Зумар", "Гафир",
  "Фуссылят", "Аш-Шура", "Аз-Зухруф", "Ад-Духан", "Аль-Джасия",
  "Аль-Ахкаф", "Мухаммад", "Аль-Фатх", "Аль-Худжурат", "Каф",
  "Аз-Зарият", "Ат-Тур", "Ан-Наджм", "Аль-Камар", "Ар-Рахман",
  "Аль-Вакы‘а", "Аль-Хадид", "Аль-Муджадаля", "Аль-Хашр", "Аль-Мумтахана",
  "Ас-Сафф", "Аль-Джума", "Аль-Мунафикун", "Ат-Тагабун", "Ат-Таляк",
  "Ат-Тахрим", "Аль-Мульк", "Аль-Калам", "Аль-Хакка", "Аль-Ма‘ариж",
  "Нух", "Аль-Джинн", "Аль-Муззаммиль", "Аль-Муддассир", "Аль-Кыяма",
  "Аль-Инсан", "Аль-Мурсалят", "Ан-Наба", "Ан-Нази‘ат", "‘Абаса",
  "Ат-Таквир", "Аль-Инфитар", "Аль-Мутаффифин", "Аль-Иншикак", "Аль-Бурудж",
  "Ат-Тарик", "Аль-А‘ля", "Аль-Гашия", "Аль-Фаджр", "Аль-Баляд",
  "Аш-Шамс", "Аль-Лайль", "Ад-Духа", "Аш-Шарх", "Ат-Тин",
  "Аль-‘Алак", "Аль-Кадр", "Аль-Баййина", "Аз-Зальзаля", "Аль-‘Адият",
  "Аль-Кари‘а", "Ат-Такасур", "Аль-‘Аср", "Аль-Хумаза", "Аль-Филь",
  "Курайш", "Аль-Ма‘ун", "Аль-Каусар", "Аль-Кафирун", "Ан-Наср",
  "Аль-Масад", "Аль-Ихлас", "Аль-Фаляк", "Ан-Нас"
];

/* ---------- Данные: города для времени намаза ----------
   method — метод расчёта сервиса Aladhan:
   14 — ДУМ России, 13 — Диянет (Турция), 4 — Умм аль-Кура (Мекка), 3 — Всемирная лига мусульман. */
const cities = [
  { name: "Москва",          lat: 55.7558, lon: 37.6173, tz: "Europe/Moscow",        method: 14 },
  { name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351, tz: "Europe/Moscow",        method: 14 },
  { name: "Казань",          lat: 55.7887, lon: 49.1221, tz: "Europe/Moscow",        method: 14 },
  { name: "Уфа",             lat: 54.7388, lon: 55.9721, tz: "Asia/Yekaterinburg",   method: 14 },
  { name: "Грозный",         lat: 43.3180, lon: 45.6949, tz: "Europe/Moscow",        method: 14 },
  { name: "Махачкала",       lat: 42.9849, lon: 47.5047, tz: "Europe/Moscow",        method: 14 },
  { name: "Минск",           lat: 53.9006, lon: 27.5590, tz: "Europe/Minsk",         method: 3 },
  { name: "Астана",          lat: 51.1694, lon: 71.4491, tz: "Asia/Almaty",          method: 3 },
  { name: "Алматы",          lat: 43.2220, lon: 76.8512, tz: "Asia/Almaty",          method: 3 },
  { name: "Ташкент",         lat: 41.2995, lon: 69.2401, tz: "Asia/Tashkent",        method: 3 },
  { name: "Баку",            lat: 40.4093, lon: 49.8671, tz: "Asia/Baku",            method: 3 },
  { name: "Стамбул",         lat: 41.0082, lon: 28.9784, tz: "Europe/Istanbul",      method: 13 },
  { name: "Мекка",           lat: 21.3891, lon: 39.8579, tz: "Asia/Riyadh",          method: 4 }
];

/* Названия намазов: ключ в ответе сервиса → подпись на сайте */
const prayerNames = [
  { key: "Fajr",    label: "Фаджр (рассвет)" },
  { key: "Dhuhr",   label: "Зухр (полдень)" },
  { key: "Asr",     label: "Аср (после полудня)" },
  { key: "Maghrib", label: "Магриб (закат)" },
  { key: "Isha",    label: "Иша (ночь)" }
];

/* ---------- Вспомогательные функции для localStorage ----------
   Оборачиваем в try/catch: в приватном режиме браузер может запретить хранилище. */
function storageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* ничего страшного */ }
}

/* =========================================================
   1. Тема: светлая / тёмная с сохранением
   ========================================================= */
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  // В тёмной теме показываем солнце (переключить на светлую), в светлой — луну
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
  );
}

applyTheme(storageGet("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  storageSet("theme", next);
});

/* =========================================================
   2. Мобильное меню (бургер)
   ========================================================= */
const burger = document.getElementById("burger");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
}

burger.addEventListener("click", () => {
  setMenu(!nav.classList.contains("open"));
});

// Закрываем меню по клавише Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* =========================================================
   3. Плавная прокрутка к разделам
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
    setMenu(false); // после перехода закрываем мобильное меню
  });
});

/* =========================================================
   4. Коран: список сур, поиск, чтение аятов
   Тексты загружаются из открытого API AlQuran Cloud:
   арабский — издание quran-uthmani (Tanzil), перевод — ru.kuliev (Э. Кулиев).
   В коде нет ни одного аята — всё приходит с сервера.
   ========================================================= */
const QURAN_API = "https://api.alquran.cloud/v1";

const quranSection = document.getElementById("quran");
const surahListView = document.getElementById("surah-list-view");
const surahSearch = document.getElementById("surah-search");
const surahStatus = document.getElementById("surah-status");
const surahListEl = document.getElementById("surah-list");

const reader = document.getElementById("surah-reader");
const readerTitle = document.getElementById("reader-title");
const readerMeta = document.getElementById("reader-meta");
const readerBismillah = document.getElementById("reader-bismillah");
const ayahStatus = document.getElementById("ayah-status");
const ayahListEl = document.getElementById("ayah-list");
const backButton = document.getElementById("back-to-list");
const prevButton = document.getElementById("prev-surah");
const nextButton = document.getElementById("next-surah");

let surahs = [];                // список сур: { number, nameAr, nameRu, ayahs }
const surahCache = new Map();   // уже загруженные суры: номер → { ayahs, bismillah }
let currentSurah = null;        // номер открытой суры

/* ----- Вспомогательные функции ----- */

// Убираем огласовки и знаки Корана, чтобы сравнивать арабские слова
function stripDiacritics(text) {
  return text.replace(/[\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");
}

// Приводим арабский текст к простому виду (для поиска и проверок)
function normalizeArabic(text) {
  return stripDiacritics(text).replace(/[\u0671\u0622\u0623\u0625]/g, "\u0627");
}

// Приводим русский текст к простому виду: без регистра, дефисов, пробелов и апострофов
function normalizeRussian(text) {
  return text.toLowerCase().replace(/ё/g, "е").replace(/[\s\-‘’'`ʻ]/g, "");
}

// Склонение: 1 аят, 2 аята, 5 аятов
function ayahWord(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "аят";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "аята";
  return "аятов";
}

// У арабских названий в API есть слово «сура» в начале — убираем его
function cleanArabicName(name) {
  const words = name.trim().split(/\s+/);
  if (words.length > 1 && stripDiacritics(words[0]) === "سورة") words.shift();
  return words.join(" ");
}

function scrollToQuran() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  quranSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

/* ----- Загрузка данных с таймаутом ----- */
async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const json = await response.json();
    if (json.code !== 200 || !json.data) throw new Error("Неверный ответ сервера");
    return json;
  } finally {
    clearTimeout(timer);
  }
}

/* ----- Индикатор загрузки и сообщения ----- */
function showLoader(box, text) {
  box.className = "loader-box";
  box.innerHTML = '<span class="spinner" aria-hidden="true"></span><span></span>';
  box.lastChild.textContent = text;
}

function showMessage(box, text) {
  box.className = "loader-box";
  box.textContent = text;
}

function clearStatus(box) {
  box.className = "loader-box";
  box.textContent = "";
}

function showError(box, text, retry) {
  box.className = "loader-box error";
  box.textContent = text + " ";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-outline";
  button.textContent = "Повторить";
  button.addEventListener("click", retry);
  box.appendChild(button);
}

/* ----- Список сур ----- */
async function loadSurahList() {
  showLoader(surahStatus, "Загружаем список сур…");
  try {
    const json = await fetchJson(QURAN_API + "/surah");
    surahs = json.data.map((s) => ({
      number: s.number,
      nameAr: cleanArabicName(s.name),
      nameRu: surahNamesRu[s.number - 1] || s.englishName,
      ayahs: s.numberOfAyahs
    }));
    clearStatus(surahStatus);
    filterSurahs();
  } catch (error) {
    showError(surahStatus, "Не удалось загрузить список сур. Проверьте подключение к интернету.", loadSurahList);
  }
}

function renderSurahList(list) {
  surahListEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach((surah) => {
    const li = document.createElement("li");
    li.className = "surah-item";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.number = String(surah.number);

    const num = document.createElement("span");
    num.className = "surah-num";
    num.textContent = surah.number;

    const names = document.createElement("span");
    names.className = "surah-names";
    const ru = document.createElement("span");
    ru.className = "surah-ru";
    ru.textContent = surah.nameRu;
    const count = document.createElement("span");
    count.className = "surah-count";
    count.textContent = surah.ayahs + " " + ayahWord(surah.ayahs);
    names.append(ru, count);

    const ar = document.createElement("span");
    ar.className = "surah-ar";
    ar.lang = "ar";
    ar.dir = "rtl";
    ar.textContent = surah.nameAr;

    button.append(num, names, ar);
    li.appendChild(button);
    fragment.appendChild(li);
  });

  surahListEl.appendChild(fragment);
}

// Поиск по номеру, русскому или арабскому названию
function filterSurahs() {
  const query = surahSearch.value.trim();
  let result = surahs;

  if (query) {
    if (/^\d+$/.test(query)) {
      result = surahs.filter((s) => s.number === Number(query));
    } else {
      const ruQuery = normalizeRussian(query);
      const arQuery = normalizeArabic(query).replace(/\s/g, "");
      result = surahs.filter((s) =>
        normalizeRussian(s.nameRu).includes(ruQuery) ||
        normalizeArabic(s.nameAr).replace(/\s/g, "").includes(arQuery)
      );
    }
  }

  renderSurahList(result);
  if (surahs.length && result.length === 0) {
    showMessage(surahStatus, "Сура не найдена. Попробуйте другое название или номер от 1 до 114.");
  } else if (surahs.length) {
    clearStatus(surahStatus);
  }
}

surahSearch.addEventListener("input", filterSurahs);

// Клик по суре в списке (делегирование событий)
surahListEl.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-number]");
  if (button) openSurah(Number(button.dataset.number));
});

/* ----- Загрузка текста суры ----- */

// В API первый аят многих сур начинается с басмалы. Отделяем её от аята,
// чтобы показать отдельной строкой (в 1-й суре басмала — это 1-й аят, в 9-й её нет).
function extractBismillah(number, ayahs) {
  if (number === 1 || number === 9) return "";

  // Русский перевод: на случай, если басмала попала и в начало перевода
  ayahs[0].ru = ayahs[0].ru.replace(/^Во имя Аллаха,?\s+Милостивого,?\s+Милосердного[!.]?\s*/i, "");

  const words = ayahs[0].ar.split(" ");
  const start = words.slice(0, 4).join(" ");
  if (words.length > 4 && normalizeArabic(start) === "بسم الله الرحمن الرحيم") {
    ayahs[0].ar = words.slice(4).join(" ");
    return start;
  }
  return "";
}

async function loadSurahText(number) {
  if (surahCache.has(number)) return surahCache.get(number);

  // Арабский текст и перевод — два запроса одновременно
  const [arabic, russian] = await Promise.all([
    fetchJson(QURAN_API + "/surah/" + number + "/quran-uthmani"),
    fetchJson(QURAN_API + "/surah/" + number + "/ru.kuliev")
  ]);

  const arAyahs = arabic.data.ayahs;
  const ruAyahs = russian.data.ayahs;
  if (!arAyahs.length || arAyahs.length !== ruAyahs.length) {
    throw new Error("Количество аятов в текстах не совпадает");
  }

  const ayahs = arAyahs.map((a, i) => ({
    number: a.numberInSurah,
    ar: a.text,
    ru: ruAyahs[i].text
  }));

  const data = { ayahs, bismillah: extractBismillah(number, ayahs) };
  surahCache.set(number, data);
  return data;
}

/* ----- Чтение суры ----- */
function renderAyahs(data) {
  ayahListEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  data.ayahs.forEach((ayah) => {
    const li = document.createElement("li");
    li.className = "ayah";

    const num = document.createElement("span");
    num.className = "ayah-num";
    num.textContent = ayah.number;

    // Арабский текст: Amiri, справа налево
    const ar = document.createElement("p");
    ar.className = "arabic";
    ar.lang = "ar";
    ar.dir = "rtl";
    ar.textContent = ayah.ar;

    // Русский перевод
    const ru = document.createElement("p");
    ru.className = "translation";
    ru.textContent = ayah.ru;

    li.append(num, ar, ru);
    fragment.appendChild(li);
  });

  ayahListEl.appendChild(fragment);
}

// Подписи кнопок «предыдущая / следующая сура»
function updateSurahNav(number) {
  const prev = surahs[number - 2];
  const next = surahs[number];
  prevButton.disabled = !prev;
  nextButton.disabled = !next;
  prevButton.textContent = prev ? "Предыдущая: " + prev.nameRu : "Предыдущая сура";
  nextButton.textContent = next ? "Следующая: " + next.nameRu : "Следующая сура";
}

async function openSurah(number) {
  const surah = surahs[number - 1];
  if (!surah) return;
  currentSurah = number;

  // Переключаем вид: список → чтение
  surahListView.hidden = true;
  reader.hidden = false;

  readerTitle.textContent = "Сура " + surah.number + ". " + surah.nameRu + " ";
  const titleAr = document.createElement("span");
  titleAr.className = "surah-ar";
  titleAr.lang = "ar";
  titleAr.dir = "rtl";
  titleAr.textContent = surah.nameAr;
  readerTitle.appendChild(titleAr);
  readerMeta.textContent = surah.ayahs + " " + ayahWord(surah.ayahs);

  readerBismillah.hidden = true;
  ayahListEl.innerHTML = "";
  updateSurahNav(number);
  showLoader(ayahStatus, "Загружаем аяты…");
  scrollToQuran();
  readerTitle.focus({ preventScroll: true });

  try {
    const data = await loadSurahText(number);
    if (currentSurah !== number) return; // пользователь уже перешёл на другую суру

    clearStatus(ayahStatus);
    if (data.bismillah) {
      readerBismillah.textContent = data.bismillah;
      readerBismillah.hidden = false;
    }
    renderAyahs(data);
  } catch (error) {
    if (currentSurah !== number) return;
    showError(ayahStatus, "Не удалось загрузить аяты. Проверьте подключение к интернету.", () => openSurah(number));
  }
}

function closeReader() {
  const number = currentSurah;
  currentSurah = null;
  reader.hidden = true;
  surahListView.hidden = false;

  // Возвращаем фокус на суру, которую только что читали
  const button = surahListEl.querySelector('[data-number="' + number + '"]');
  if (button) button.focus();
  else scrollToQuran();
}

backButton.addEventListener("click", closeReader);
prevButton.addEventListener("click", () => openSurah(currentSurah - 1));
nextButton.addEventListener("click", () => openSurah(currentSurah + 1));

loadSurahList();

/* =========================================================
   5. Текущая дата и время
   ========================================================= */
const dateEl = document.getElementById("current-date");
const timeEl = document.getElementById("current-time");

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});
const timeFormat = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit", minute: "2-digit", second: "2-digit"
});

function updateClock() {
  const now = new Date();
  dateEl.textContent = dateFormat.format(now);
  timeEl.textContent = timeFormat.format(now);
}

updateClock();
setInterval(updateClock, 1000);

/* =========================================================
   6. Время намаза: выбор города и загрузка расписания
   ========================================================= */
const citySelect = document.getElementById("city-select");
const prayerBody = document.getElementById("prayer-body");
const prayerStatus = document.getElementById("prayer-status");
const prayerCaption = document.getElementById("prayer-caption");

// Заполняем список городов
cities.forEach((city, i) => {
  const option = document.createElement("option");
  option.value = String(i);
  option.textContent = city.name;
  citySelect.appendChild(option);
});

// Восстанавливаем последний выбранный город
const savedCity = Number(storageGet("city"));
if (Number.isInteger(savedCity) && cities[savedCity]) {
  citySelect.value = String(savedCity);
}

// Текущая дата в часовом поясе города в формате ДД-ММ-ГГГГ (так просит сервис)
function dateInZone(tz) {
  return new Date()
    .toLocaleDateString("en-GB", { timeZone: tz })
    .replace(/\//g, "-");
}

// Текущее время в городе в минутах от начала суток
function minutesNowInZone(tz) {
  const parts = new Date().toLocaleTimeString("en-GB", {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

// "05:12" → 312
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Рисуем таблицу и подсвечиваем ближайший намаз
function renderPrayerTable(timings, tz) {
  const nowMin = minutesNowInZone(tz);
  const times = prayerNames.map((p) => timings[p.key].slice(0, 5)); // убираем возможную приписку "(MSK)"

  // Ближайший намаз — первый, время которого ещё не наступило; если все прошли — Фаджр
  let nextIndex = times.findIndex((t) => toMinutes(t) > nowMin);
  if (nextIndex === -1) nextIndex = 0;

  prayerBody.innerHTML = "";
  prayerNames.forEach((p, i) => {
    const row = document.createElement("tr");
    if (i === nextIndex) row.className = "next";

    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = p.label;

    const td = document.createElement("td");
    td.textContent = times[i];

    row.append(th, td);
    prayerBody.appendChild(row);
  });
}

async function loadPrayerTimes() {
  const city = cities[Number(citySelect.value)];
  storageSet("city", citySelect.value);
  prayerStatus.textContent = "Загружаем время намаза…";
  prayerCaption.textContent = "Время намаза: " + city.name;

  const url =
    "https://api.aladhan.com/v1/timings/" + dateInZone(city.tz) +
    "?latitude=" + city.lat +
    "&longitude=" + city.lon +
    "&method=" + city.method +
    "&timezonestring=" + encodeURIComponent(city.tz);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP " + response.status);
    const json = await response.json();

    renderPrayerTable(json.data.timings, city.tz);
    prayerStatus.textContent = "Расписание для города: " + city.name + ", " + dateInZone(city.tz).replace(/-/g, ".") + ".";
  } catch (error) {
    prayerBody.innerHTML = "";
    prayerStatus.textContent =
      "Не удалось загрузить время намаза. Проверьте подключение к интернету и выберите город ещё раз.";
  }
}

citySelect.addEventListener("change", loadPrayerTimes);
loadPrayerTimes();

/* =========================================================
   8. Год в подвале
   ========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();
