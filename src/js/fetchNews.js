const url = "https://api.spaceflightnewsapi.net/v4/articles/?format=json";

function getUrl(params) {
  const paramString = Object.keys(params).reduce((prev, key) => {
    if (!params[key]) {
      return prev;
    }
    
    return prev + `&${key}=${params[key]}`
  }, "");

  return url + paramString;
}

export function fetchNews(params) {
  return fetch(getUrl(params))
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
