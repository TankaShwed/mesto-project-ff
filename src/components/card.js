import { openModal } from "./modal.js";
import { likeCard, dislikeCard, deleteMyCard } from "./api.js";

export function makeCard(
  data,
  onLikeButton,
  callbackDeleteCard,
  callbackOpenCard,
  profileID
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardPicture = cardElement.querySelector(".card__image");
  const likesCount = cardElement.querySelector(".card__likeCount");

  cardElement.querySelector(".card__title").textContent = data.name;
  cardPicture.src = data.link;
  cardPicture.alt = data.name;
  cardElement.setAttribute("data-cardid", data._id);
  likesCount.textContent = data.likes.length; //количество лайков
  const likeit = data.likes.some((item) => {
    return item._id == profileID;
  });

  if (likeit) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (data.owner._id !== profileID) {
    delButton.style.display = "none";
  }

  delButton.addEventListener("click", function () {
    callbackDeleteCard(data._id);
  });

  cardPicture.addEventListener("click", function () {
    callbackOpenCard(data.link, data.name);
  });

  likeButton.addEventListener("click", function () {
    onLikeButton(likeButton, data._id, likesCount);
  });

  return cardElement;
}

export function like(like, id, likesCount) {
  like.classList.toggle("card__like-button_is-active");
  if (like.classList.contains("card__like-button_is-active")) {
    likeCard(id)
      .then((result) => {
        likesCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    dislikeCard(id)
      .then((result) => {
        likesCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

export function deleteCard(card, id) {
  card.remove();
  return deleteMyCard(id);
}

export function openDeleteCard(id) {
  const popupDeleteCard = document.querySelector(".popup_type_delete-card");
  popupDeleteCard.setAttribute("data-cardid", id);
  openModal(popupDeleteCard);
}
