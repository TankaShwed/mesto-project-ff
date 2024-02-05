import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { makeCard, like, deleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";
import {enableValidation, clearValidation} from "./components/validation.js";

const content = document.querySelector(".content");
const placesContent = content.querySelector(".places__list");
const editButton = content.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
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

initialCards.forEach((item) => {
  placesContent.append(
    makeCard(item.name, item.link, like, deleteCard, openImageCard)
  );
});

//Edit Popup
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(validationConfig, formEditProfile);
  openModal(editPopup);
});

//close edit poup
closeEditPopup.addEventListener("click", function () {
  closeModal(editPopup);
});

//overlay
editPopup.addEventListener("click", closePopupByOverlay);

formEditProfile.addEventListener("submit", handleProfilEditFormSubmit);

function handleProfilEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

function openImageCard(link, name) {
  openModal(imagePopup);
  imagePopup.querySelector(".popup__image").src = link;
  imagePopup.querySelector(".popup__caption").textContent = name;
}

formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  placesContent.prepend(
    makeCard(
      cardNameInput.value,
      cardImageInput.value,
      like,
      deleteCard,
      openImageCard
    )
  );
  closeModal(addPopup);
  formAddCard.reset();
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
