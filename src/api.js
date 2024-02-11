const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
    "Content-Type": "application/json",
  },
};

export const editProfileSave = () => {
  //??name
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).then(() => {
    closeModal(editPopup);
    editPopup.querySelector(".popup__button").textContent = "Сохранить";
  });
};

// fetch("https://nomoreparties.co/v1/wff-cohort-5/users/me", {
//   method: "PATCH",
//   headers: {
//     authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: nameInput.value,
//     about: jobInput.value,
//   }),
// }).then(() => {
//   closeModal(editPopup);
//   editPopup.querySelector(".popup__button").textContent = "Сохранить";
// });
