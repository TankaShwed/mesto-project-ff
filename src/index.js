import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";

const content = document.querySelector(".content");
const cardTemplate = document.querySelector("#card-template").content;
const placesContent = content.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");

function makeCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  delButton.addEventListener("click", function () {
    onDelButton(cardElement);
  });

  cardElement.addEventListener("click", function () {
    imagePopup.style.display = "flex";
    imagePopup.querySelector(".popup__image").src = link;
    imagePopup.querySelector(".popup__image").alt = name;
  });

  return cardElement;
}

function onDelButton(card) {
  card.remove();
}

initialCards.forEach((item) => {
  placesContent.append(makeCard(item.name, item.link));
});

//edit Button
const editButton = content.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
editButton.addEventListener("click", function () {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  editPopup.style.display = "flex";
  document.querySelector(".popup__input_type_name").placeholder =
    profileName.innerHTML;
  document.querySelector(".popup__input_type_description").placeholder =
    profileDescription.innerHTML;
});

const closeEditPopup = document.querySelector(".popup__close");
closeEditPopup.addEventListener("click", function () {
  editPopup.style.display = "none";
});

editPopup.addEventListener("click", function () {
  editPopup.style.display = "none";
});

const contentPopup = document.querySelectorAll(".popup__content");
contentPopup.forEach((element) => {
  element.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });
});

//add Button
const addButton = content.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddPopup = document.querySelector(
  ".popup_type_new-card .popup__close"
);
addButton.addEventListener("click", function () {
  addPopup.style.display = "flex";
});

closeAddPopup.addEventListener("click", function () {
  addPopup.style.display = "none";
});

addPopup.addEventListener("click", function () {
  addPopup.style.display = "none";
});

document.body.addEventListener("keydown", function (e) {
  if (e.code == "Escape") {
    editPopup.style.display = "none";
    addPopup.style.display = "none";
    imagePopup.style.display = "none";
  }
});

const closeImagePopup = document.querySelector(
  ".popup_type_image .popup__close"
);
closeImagePopup.addEventListener("click", function () {
  imagePopup.style.display = "none";
});

imagePopup.addEventListener("click", function () {
  imagePopup.style.display = "none";
});
