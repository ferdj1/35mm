import {ACCESS_TOKEN, API_BASE_URL} from "../constants/AuthConstants";

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};

export function getGenres() {
  return request({
    url: API_BASE_URL + "/genres",
    method: 'GET'
  });
}

export function getFavoriteGenres() {
  return request({
    url: API_BASE_URL + "/genres/favorites",
    method: 'GET'
  });
}


export function updateFavoriteGenres(genres) {
  const req = {
    genres: genres
  };

  return request({
    url: API_BASE_URL + "/genres/favorites",
    body: JSON.stringify(req),
    method: 'POST'
  });
}
