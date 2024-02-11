// Функция принимает массив полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    // проходим по этому массиву, если поле не валидно, колбэк вернёт true, обход массива прекратится
    // и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}

const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    let message = inputElement.validationMessage;
    if (inputElement.validity.valueMissing) {
      message = "Вы пропустили это поле.";
    } else if (inputElement.validity.patternMismatch) {
      message =
        "Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.";
    } else if (inputElement.validity.typeMismatch) {
      message = "Введите адрес сайта.";
    }
    showInputError(config, formElement, inputElement, message);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

export function setEventListeners(config, formElement) {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  ); // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });
}

//включение валидации всех форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
}

export function clearValidation(config, form) {
  const inputMas = Array.from(form.querySelectorAll(config.inputSelector));
  inputMas.forEach((element) => {
    hideInputError(config, form, element);
  });
  toggleButtonState(
    config,
    inputMas,
    form.querySelector(config.submitButtonSelector)
  );
}

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
export function toggleButtonState(config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    // Если есть хотя бы один невалидный инпут
    buttonElement.classList.add(config.inactiveButtonClass); // сделай кнопку неактивной
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass); // иначе сделай кнопку активной
    buttonElement.removeAttribute("disabled");
  }
}
