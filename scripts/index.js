const content = document.querySelector(".content");
const placesContent = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");

function makeCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  delButton.addEventListener("click", function () {
    onDelButton(cardElement);
  });

  return cardElement;
}

function onDelButton(card) {
  card.remove();
}

initialCards.forEach((item) => {
  placesContent.append(makeCard(item.name, item.link));
});
