export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.addEventListener("keydown", closeByEsc);
}

export function closeModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}

export function closePopupByOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.currentTarget);
  }
}

//ESC Close Popup
function closeByEsc(e) {
  if (e.code == "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
