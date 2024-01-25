import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";

const content = document.querySelector(".content");
const cardTemplate = document.querySelector("#card-template").content;
const placesContent = content.querySelector(".places__list");
const editButton = content.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElementEditPopup = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const closeEditPopup = document.querySelector(".popup__close");
const contentPopup = document.querySelectorAll(".popup__content");
const formElementAddPopup = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageInput = document.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");

function makeCard(name, link, onLikeButton) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardPicture = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = name;
  cardPicture.src = link;
  cardPicture.alt = name;

  delButton.addEventListener("click", function (evt) {
    onDelButton(cardElement);
    evt.stopPropagation();
  });

  cardPicture.addEventListener("click", function () {
    imagePopup.classList.add("popup_is-opened");
    imagePopup.classList.remove("popup_is-animated");
    imagePopup.querySelector(".popup__image").src = link;
    imagePopup.querySelector(".popup__image").alt = name;
    imagePopup.querySelector(".popup__caption").innerHTML = name;
  });

  likeButton.addEventListener("click", function () {
    onLikeButton(likeButton);
  });

  return cardElement;
}

function like(like) {
  like.classList.toggle("card__like-button_is-active");
}

function onDelButton(card) {
  card.remove();
}

initialCards.forEach((item) => {
  placesContent.append(makeCard(item.name, item.link, like));
});

//edit popup
editButton.addEventListener("click", function () {
  editPopup.style.display = "flex";
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileDescription.innerHTML;
  editPopup.classList.remove("popup_is-animated");
  editPopup.classList.add("popup_is-opened");
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.innerHTML = nameInput.value;
  profileDescription.innerHTML = jobInput.value;
  editPopup.classList.add("popup_is-animated");
  editPopup.classList.remove("popup_is-opened");
}

formElementEditPopup.addEventListener("submit", handleFormSubmit);

closeEditPopup.addEventListener("click", function () {
  editPopup.classList.add("popup_is-animated");
  editPopup.classList.remove("popup_is-opened");
});

editPopup.addEventListener("click", function () {
  editPopup.classList.add("popup_is-animated");
  editPopup.classList.remove("popup_is-opened");
});

contentPopup.forEach((element) => {
  element.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });
});

formElementAddPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  placesContent.prepend(
    makeCard(cardNameInput.value, cardImageInput.value, like)
  );
  addPopup.classList.add("popup_is-animated");
  addPopup.classList.remove("popup_is-opened");
  cardNameInput.value = "";
  cardImageInput.value = "";
});

//add popup
const addButton = content.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddPopup = document.querySelector(
  ".popup_type_new-card .popup__close"
);
addButton.addEventListener("click", function () {
  addPopup.classList.add("popup_is-opened");
  addPopup.classList.remove("popup_is-animated");
});

closeAddPopup.addEventListener("click", function () {
  addPopup.classList.add("popup_is-animated");
  addPopup.classList.remove("popup_is-opened");
});

addPopup.addEventListener("click", function () {
  addPopup.classList.add("popup_is-animated");
  addPopup.classList.remove("popup_is-opened");
});

document.body.addEventListener("keydown", function (e) {
  if (e.code == "Escape") {
    editPopup.classList.add("popup_is-animated");
    editPopup.classList.remove("popup_is-opened");
    addPopup.classList.add("popup_is-animated");
    addPopup.classList.remove("popup_is-opened");
    imagePopup.classList.add("popup_is-animated");
    imagePopup.classList.remove("popup_is-opened");
  }
});

//image popup
const closeImagePopup = document.querySelector(
  ".popup_type_image .popup__close"
);
closeImagePopup.addEventListener("click", function () {
  imagePopup.classList.add("popup_is-animated");
  imagePopup.classList.remove("popup_is-opened");
});

imagePopup.addEventListener("click", function () {
  imagePopup.classList.add("popup_is-animated");
  imagePopup.classList.remove("popup_is-opened");
});
