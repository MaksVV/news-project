const url = "https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=30";
export function fetchNews() {
    return fetch(url).then(response => response.json())
    .catch(error => console.log(error))
}

