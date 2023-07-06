import { fetchNews } from "./fetchNews";

const refs = {
  articles: document.querySelector(".js-articles"),
  btnSearch: document.querySelector(".js-btn-search"),
  btnLoad: document.querySelector(".js-btn-load"),
  btnClear: document.querySelector(".js-btn-clear"),
  searchMessage: document.querySelector(".js-message"),
  searchInput: document.querySelector(".js-search-input"),
  limitSelect: document.querySelector(".js-limit-select"),
};

const params = {
  limit: 3,
  // індекс, з якого починаємо відображення записів
  offset: 0,
  // параметр для пошуку, за замовчуванням пустий
  search: "",
};

function onLimitChange() {
  const selectedLimit = parseInt(refs.limitSelect.value, 10);

  params.limit = selectedLimit;
  params.offset = 0;
  showNews(false, true);
}

function onLoadMoreClick() {
  // збільшуємо індекс на кількість елементів, котрі вже були відображені
  params.offset += params.limit;

  showNews();
}

function showNews(isSearchResult = false, showNewResults = false) {
  // передаємо в якості параметру обʼєкт params, що вказує які наступні дані брати, чи є пошуковий запит
  fetchNews(params).then((data) => {
    let newsHTML = "";
    data.results.forEach((result) => {
      newsHTML += getArticleHTML(result.image_url, result.title, result.id);
    });

    // коли ми виконали пошук, нам необхідно відображати тільки нові результати, тому ми
    // повністю переписуємо вміст блоку main
    showNewResults
      ? (refs.articles.innerHTML = newsHTML)
      : refs.articles.insertAdjacentHTML("beforeend", newsHTML);

    // ховаємо кнопку, якщо немає можливості перейти на наступну сторінку
    toggleButton(refs.btnLoad, !!data.next);
    if (isSearchResult) {
      refs.searchMessage.innerHTML = `We found ${data.count} news`;
    }
  });
}

function toggleButton(button, isButtonShown) {
  button.style.display = isButtonShown ? "block" : "none";
}

function onSearchNews() {
  let searchQuery = refs.searchInput.value.trim();

  if (!searchQuery) {
    return;
  }

  params.search = searchQuery;
  params.offset = 0;

  showNews(true, true);
  toggleButton(refs.btnClear, true);
}

function clearSearchResults() {
  refs.searchInput.value = "";
  params.search = "";
  params.offset = 0;
  refs.searchMessage.remove(); 
  toggleButton(refs.btnClear, false);
  showNews(false, true);
}

function getArticleHTML(imgUrl, title, alt) {
  return `<div class="article">
    <img
      src="${imgUrl}"
      alt="${alt}"
      class="article__image"
    />
    <h3 class="article__title">
      ${title}
    </h3>
  </div>`;
}

showNews();

refs.btnLoad.addEventListener("click", onLoadMoreClick);
refs.btnSearch.addEventListener("click", onSearchNews);
refs.btnClear.addEventListener("click", clearSearchResults);
refs.limitSelect.addEventListener("change", onLimitChange);
