import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { makeCard, like, deleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const content = document.querySelector(".content");
const placesContent = content.querySelector(".places__list");
const editButton = content.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const imageProfile = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const closeEditPopup = document.querySelector(".popup__close");
const formAddCard = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageInput = document.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const addButton = content.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddPopup = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const closeImagePopup = document.querySelector(
  ".popup_type_image .popup__close"
);

//config
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Edit Profile
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(validationConfig, formEditProfile);
  openModal(editPopup);
});

closeEditPopup.addEventListener("click", function () {
  closeModal(editPopup);
});

editPopup.addEventListener("click", closePopupByOverlay);

formEditProfile.addEventListener("submit", handleProfilEditFormSubmit);

//edit profile save
function handleProfilEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);

  fetch("https://nomoreparties.co/v1/wff-cohort-5/users/me", {
    method: "PATCH",
    headers: {
      authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  });
}

function openImageCard(link, name) {
  openModal(imagePopup);
  imagePopup.querySelector(".popup__image").src = link;
  imagePopup.querySelector(".popup__caption").textContent = name;
}

//Add New Card
formAddCard.addEventListener("submit", function (evt) {
  const card = {
    name: cardNameInput.value,
    link: cardImageInput.value,
    likes: [],
    owner: {}
  }
  evt.preventDefault();
  placesContent.prepend(
    makeCard(
      card,
      like,
      deleteCard,
      openImageCard
    )
  );
  closeModal(addPopup);
  formAddCard.reset();

  fetch("https://nomoreparties.co/v1/wff-cohort-5/cards", {
    method: "POST",
    headers: {
      authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
});

addButton.addEventListener("click", function () {
  formAddCard.reset();
  clearValidation(validationConfig, formAddCard);
  openModal(addPopup);
});

//close add popup overlay
addPopup.addEventListener("click", closePopupByOverlay);

//close add popup
closeAddPopup.addEventListener("click", function () {
  closeModal(addPopup);
});

//Image Popup overlay
imagePopup.addEventListener("click", closePopupByOverlay);

//close image popup
closeImagePopup.addEventListener("click", function () {
  closeModal(imagePopup);
});

//validation
enableValidation(validationConfig);

// import { getInitialCards } from "./api.js";

Promise.all([
  fetch("https://nomoreparties.co/v1/wff-cohort-5/users/me", {
    headers: {
      authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
    },
  }).then((res) => res.json()),
  fetch("https://nomoreparties.co/v1/wff-cohort-5/cards", {
    headers: {
      authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
    },
  }).then((res) => res.json()),
]).then(function (df) {
  const user = df[0];
  const cards = df[1];
  console.log(user,cards);
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  imageProfile.style.backgroundImage = "url('" + user.avatar + "')";
  cards.forEach((item) => {
    placesContent.append(
      makeCard(item, like, deleteCard, openImageCard, user._id)
    );
  });
});
