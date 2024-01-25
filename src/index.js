import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { makeCard, like, onDelButton } from "./components/card.js";
// import  {handleFormSubmit} from "./components/modal.js";

const content = document.querySelector(".content");
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
const formElementAddPopup = document.querySelector(".popup_type_new-card .popup__form");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardImageInput = document.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
//add popup
const addButton = content.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const closeAddPopup = document.querySelector(".popup_type_new-card .popup__close");
//image popup
const closeImagePopup = document.querySelector(".popup_type_image .popup__close");


initialCards.forEach((item) => {
  placesContent.append(makeCard(item.name, item.link, like, imagePopup));
});

//edit popup
editButton.addEventListener("click", function () {
  editPopup.style.display = "flex";
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileDescription.innerHTML;
  editPopup.classList.remove("popup_is-animated");
  editPopup.classList.add("popup_is-opened");
});

formElementEditPopup.addEventListener("submit", handleFormSubmit);

closeEditPopup.addEventListener("click", function () {
  editPopup.classList.add("popup_is-animated");
  editPopup.classList.remove("popup_is-opened");
});

editPopup.addEventListener("click", function () {
  editPopup.classList.add("popup_is-animated");
  editPopup.classList.remove("popup_is-opened");
});

contentPopup.forEach((element) => {  // перенести в модуль?
  element.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });
});

formElementAddPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  placesContent.prepend(
    makeCard(cardNameInput.value, cardImageInput.value, like, imagePopup)
  );
  addPopup.classList.add("popup_is-animated");
  addPopup.classList.remove("popup_is-opened");
  cardNameInput.value = "";
  cardImageInput.value = "";
});

//add popup
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

document.body.addEventListener("keydown", function (e) { //document body заменить ?
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
closeImagePopup.addEventListener("click", function () {
  imagePopup.classList.add("popup_is-animated");
  imagePopup.classList.remove("popup_is-opened");
});

imagePopup.addEventListener("click", function () {
  imagePopup.classList.add("popup_is-animated");
  imagePopup.classList.remove("popup_is-opened");
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.innerHTML = nameInput.value;
    profileDescription.innerHTML = jobInput.value;
    editPopup.classList.add("popup_is-animated");
    editPopup.classList.remove("popup_is-opened");
  }

function openModal(){
  imagePopup.classList.add("popup_is-animated");
  imagePopup.classList.remove("popup_is-opened");
}