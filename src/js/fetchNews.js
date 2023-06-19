const BASE_URL = "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=30";

export function fetchNews(url = BASE_URL) {
    return fetch(url).then(response => response.json())
    .catch(error => console.log(error))
}


  // const limit = 30;
  // const url = `${BASE_URL}/?format=json${searchQuery}&limit=${limit}`;
