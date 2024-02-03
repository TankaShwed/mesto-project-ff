import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { makeCard, like, deleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closePopupByOverlay,
} from "./components/modal.js";

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

initialCards.forEach((item) => {
  placesContent.append(
    makeCard(item.name, item.link, like, deleteCard, openImageCard)
  );
});

//Edit Popup
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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
// Функция принимает массив полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {  // проходим по этому массиву // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}

//// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {  // Если есть хотя бы один невалидный инпут
    buttonElement.classList.add('button_inactive');  // сделай кнопку неактивной
  } else {
    buttonElement.classList.remove('button_inactive');  // иначе сделай кнопку активной
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const selector = `.${inputElement.id}-error`;
  console.log(selector)
  const errorElement = formElement.querySelector(selector);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);  // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
    // const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    // fieldsetList.forEach((fieldSet) => {
    //   setEventListeners(fieldSet);
    // });
  });
};

enableValidation();