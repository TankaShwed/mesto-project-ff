import "./pages/index.css";
import {
  makeCard,
  like,
  deleteCard,
  openDeleteCard,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUser,
  getInitialCards,
  addNewCard,
  updateProfile,
  updateAvatar,
} from "./components/api.js";

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
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const formDeleteCardPopup = document.querySelector(
  ".popup_type_delete-card .popup__form"
);
const closeDeleteCardPopup = document.querySelector(
  ".popup_type_delete-card .popup__close"
);
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");
const closeUpdateAvatarPopup = document.querySelector(
  ".popup_type_update-avatar .popup__close"
);
const formUpdateAvatarPopup = document.querySelector(
  ".popup_type_update-avatar .popup__form"
);
const updateAvatarInput = document.querySelector(
  ".popup_type_update-avatar .popup__input_type_url"
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
  editPopup.querySelector(".popup__button").textContent = "Сохранение...";
  updateProfile(nameInput.value, jobInput.value).then(() => {
    closeModal(editPopup);
    editPopup.querySelector(".popup__button").textContent = "Сохранить";
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
    owner: {},
  };
  evt.preventDefault();
  placesContent.prepend(makeCard(card, like, openDeleteCard, openImageCard));

  formAddCard.querySelector(".popup__button").textContent = "Сохранение...";
  addNewCard(card).then(() => {
    closeModal(addPopup);
    formAddCard.reset();
    formAddCard.querySelector(".popup__button").textContent = "Сохранить";
  });
});

addButton.addEventListener("click", function () {
  formAddCard.reset();
  clearValidation(validationConfig, formAddCard);
  openModal(addPopup);
});

//close add popup overlay
addPopup.addEventListener("click", closePopupByOverlay);

closeAddPopup.addEventListener("click", function () {
  closeModal(addPopup);
});

//Image Popup overlay
imagePopup.addEventListener("click", closePopupByOverlay);

closeImagePopup.addEventListener("click", function () {
  closeModal(imagePopup);
});

//Delete card
deleteCardPopup.addEventListener("click", closePopupByOverlay);

closeDeleteCardPopup.addEventListener("click", function () {
  closeModal(deleteCardPopup);
});

formDeleteCardPopup.addEventListener("submit", function () {
  const id = deleteCardPopup.dataset.cardid;
  const card = document.querySelector("[data-cardid='" + id + "']");
  deleteCard(card, id)
  .then(() => {
    closeModal(deleteCardPopup);
  });
});

//Change avatar
imageProfile.addEventListener("click", function () {
  openModal(updateAvatarPopup);
});

closeUpdateAvatarPopup.addEventListener("click", function () {
  closeModal(updateAvatarPopup);
});

updateAvatarPopup.addEventListener("click", closePopupByOverlay);

formUpdateAvatarPopup.addEventListener("submit", function () {
  formUpdateAvatarPopup.querySelector(".popup__button").textContent =
    "Сохранение...";
  updateAvatar(updateAvatarInput.value)
    .then((res) => res.json())
    .then(() => {
      closeModal(updateAvatarPopup);
      updateAvatarPopup.querySelector(".popup__button").textContent =
        "Сохранить";
    });
});

//validation
enableValidation(validationConfig);

Promise.all([
  getUser(),
  getInitialCards(),
]).then(function (df) {
  const user = df[0];
  const cards = df[1];
  console.log(user, cards);
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  imageProfile.style.backgroundImage = "url('" + user.avatar + "')";
  cards.forEach((item) => {
    placesContent.append(
      makeCard(item, like, openDeleteCard, openImageCard, user._id)
    );
  });
});
