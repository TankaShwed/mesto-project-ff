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
const formElementAddPopup = document.querySelector(
  ".popup_type_new-card .popup__form"
);
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

initialCards.forEach((item) => {
  placesContent.append(makeCard(item.name, item.link, like, imagePopup));
});

function closeModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
}

//Edit Popup
editButton.addEventListener("click", function () {
  editPopup.style.display = "flex";
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileDescription.innerHTML;
  openModal(editPopup);
});

//close edit poup
closeEditPopup.addEventListener("click", function () {
  closeModal(editPopup);
});

//close edit poup
editPopup.addEventListener("click", function () {
  closeModal(editPopup);
});

formElementEditPopup.addEventListener("submit", handleFormSubmit);

contentPopup.forEach((element) => {
  // перенести в модуль?
  element.addEventListener("click", function (evt) {
    evt.stopPropagation();
  });
});

//Add Popup
formElementAddPopup.addEventListener("submit", function (evt) {
  evt.preventDefault();
  placesContent.prepend(
    makeCard(cardNameInput.value, cardImageInput.value, like, imagePopup)
  );
  closeModal(addPopup);
  cardNameInput.value = "";
  cardImageInput.value = "";
});

addButton.addEventListener("click", function () {
  openModal(addPopup);
});

//open add popup
addPopup.addEventListener("click", function () {
  closeModal(addPopup);
});

//close add popup
closeAddPopup.addEventListener("click", function () {
  closeModal(addPopup);
});

//Image Popup
imagePopup.addEventListener("click", function () {
  closeModal(imagePopup);
});

//close image popup
closeImagePopup.addEventListener("click", function () {
  closeModal(imagePopup);
});

//ESC Close Popup
document.body.addEventListener("keydown", function (e) { //document body заменить ?
  if (e.code == "Escape") {
    closeModal(editPopup);
    closeModal(addPopup);
    closeModal(imagePopup);
  }
});


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.innerHTML = nameInput.value;
  profileDescription.innerHTML = jobInput.value;
  closeModal(editPopup);
}
