import {ACCESS_TOKEN, API_BASE_URL} from '../constants/AuthConstants';

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

const requestOKCheck = (options) => {
  const headers = new Headers({});

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response => {
      return response.ok;
    }
  );
};

export function getTopRatedMovies() {
  return request({
    url: API_BASE_URL + "/movie/top?size=200",
    method: 'GET'
  });
}

export function searchTopRatedMovies(title) {
  return request({
    url: API_BASE_URL + "/movie/top?size=200&search=" + title,
    method: 'GET'
  });
}

export function getRecommendedMovies() {
  return request({
    url: API_BASE_URL + "/movie/recommendation/me",
    method: 'GET'
  });
}

export function getGenreBasedMovies(genres) {
  const req = {
    genres: genres
  };

  return request({
    url: API_BASE_URL + "/movie/genres",
    body: JSON.stringify(req),
    method: 'POST'
  });
}

export function getMovieById(id) {
  return request({
    url: API_BASE_URL + "/movie/" + id,
    method: 'GET'
  });
}

export function getLikedMovies() {
  return request({
    url: API_BASE_URL + "/movie/liked",
    method: 'GET'
  });
}

export function likeMovieById(id) {
  return request({
    url: API_BASE_URL + "/movie/" + id + "/like",
    method: "POST"
  });
}

export function dislikeMovieById(id) {
  return request({
    url: API_BASE_URL + "/movie/" + id + "/dislike",
    method: "POST"
  });
}

export function checkLikedMovieById(id) {
  return request({
    url: API_BASE_URL + "/movie/" + id + "/liked",
    method: "GET"
  });
}

export function getDailyPopular() {
  return request({
    url: API_BASE_URL + "/movie/popular/day",
    method: 'GET'
  });
}


export function getWeeklyPopular() {
  return request({
    url: API_BASE_URL + "/movie/popular/weekly",
    method: 'GET'
  });
}


export function getMonthlyPopular() {
  return request({
    url: API_BASE_URL + "/movie/popular/monthly",
    method: 'GET'
  });
}


export function getAllTimePopular() {
  return request({
    url: API_BASE_URL + "/movie/popular/alltime",
    method: 'GET'
  });
}
