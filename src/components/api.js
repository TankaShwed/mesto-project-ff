const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
    "Content-Type": "application/json",
  },
};

function hendleAPIResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(hendleAPIResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(hendleAPIResponse);
};

export const addNewCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify(card),
  }).then(hendleAPIResponse);
};

export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(hendleAPIResponse);
};

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(hendleAPIResponse);
};

export const likeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
  }).then(hendleAPIResponse);
};

export const dislikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(hendleAPIResponse);
};

export const deleteMyCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(hendleAPIResponse);
};
