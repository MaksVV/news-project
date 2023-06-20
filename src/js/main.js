// import { fetchNews } from "./fetchNews";
const url = `https://api.spaceflightnewsapi.net/v4/articles/?format=json&title_contains=${searchQuery}&limit=30`;
  
let main = document.querySelector(".js-main");
let btnLoad = document.querySelector(".js-btn-load");
let btnSearch = document.querySelector(".js-btn-search");
let btnClear = document.querySelector(".js-btn-clear");
let searchInput = document.querySelector(".js-search-input");
let loadMoreUrl = "";
let searchQuery = "";

function fetchNews() {
  return fetch(url).then(response => response.json())
  .catch(error => console.log(error))
}

function onLoadMoreClick() {
  fetchNews(loadMoreUrl).then((data) => {
    let newsHTML = "";
    data.results.forEach((result) => {
      newsHTML += getArticleHTML(result.image_url, result.title, result.id);
    });
    main.insertAdjacentHTML("beforeend", newsHTML);
    setLoadMoreUrl(data.next);
  });
}

function showNews() {
  fetchNews().then((data) => {
    let newsHTML = "";
    data.results.forEach((result) => {
      newsHTML += getArticleHTML(result.image_url, result.title, result.id);
    });
    main.innerHTML = newsHTML;
    setLoadMoreUrl(data.next);
  });
}

function setLoadMoreUrl(next) {
  loadMoreUrl = next;
  btnLoad.style.display = next ? "block" : "none";
}

//
function searchNews() {

  if (keyword === "") {
    searchQuery = "";
    showNews();
    return;
  }

  searchQuery = searchInput.value.trim();;
  showNews();
}

function clearSearchResults() {
  searchInput.value = "";
  searchQuery = "";
  showNews();
}
//

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

btnLoad.addEventListener("click", onLoadMoreClick);
btnSearch.addEventListener("click", searchNews);
btnClear.addEventListener("click", clearSearchResults);
