const cardTemplate = document.querySelector("#card-template").content;

export function makeCard(name, link, onLikeButton, imagePopup) {
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

export function like(like) {
  like.classList.toggle("card__like-button_is-active");
}

export function onDelButton(card) {
  card.remove();
}
