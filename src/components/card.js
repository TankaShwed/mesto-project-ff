import { openModal } from "./modal.js";

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
    fetch("https://nomoreparties.co/v1/wff-cohort-5/cards/likes/" + id, {
      method: "PUT",
      headers: {
        authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        likesCount.textContent = result.likes.length;
      });
  } else {
    fetch("https://nomoreparties.co/v1/wff-cohort-5/cards/likes/" + id, {
      method: "DELETE",
      headers: {
        authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        likesCount.textContent = result.likes.length;
      });
  }
}

export function deleteCard(card, id) {
  card.remove();
  fetch("https://nomoreparties.co/v1/wff-cohort-5/cards/" + id, {
    method: "DELETE",
    headers: {
      authorization: "dd2287e8-e249-46eb-befd-737a64b52f05",
    },
  });
}

export function openDeleteCard(id) {
  const popupDeleteCard = document.querySelector(".popup_type_delete");
  popupDeleteCard.setAttribute("data-cardid", id);
  openModal(popupDeleteCard);
}
