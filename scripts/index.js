import { initialCards, validationConfig } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const content = document.querySelector('.content');
//попап редактирования профиля
const profileName = content.querySelector('.profile__name');
const profileSign = content.querySelector('.profile__sign');
const buttonEditProfile = content.querySelector('.profile__edit-btn');
const buttonCloseEditProfilePopup = document.querySelector('.popup__close_profile');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const formEditProfile = document.querySelector('.popup__form_profile');
const inputName = document.querySelector('.popup__item_type_name');
const inputSign = document.querySelector('.popup__item_type_sign');

//попап открытия фотографии
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupImageCard = document.querySelector('.popup__image-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const buttonClosePhoto = document.querySelector(".popup__close_photo");
const buttonCloseAddCardPopup = document.querySelector('.popup__close_card');

//попап добавления карточки
const formAddCard = document.querySelector(".popup__form_card");
const buttonOpenFormNewCard = document.querySelector(".profile__add-photo-btn");
const popupButtonOpenFormNewCard = document.querySelector(".popup_type_add-card");
const popupInputPlaceTitle = document.querySelector(".popup__item_palce_name");
const popupInputPlaceLink = document.querySelector(".popup__item_place_link");
const cardTemplate = document.querySelector("#elements-add").content.querySelector(".elements__item");
const cardsContainer = document.querySelector(".elements__list");

/*
 * Профиль
 */
function openEditForm() {
  inputName.value = profileName.textContent;
  inputSign.value = profileSign.textContent;
  profileValidator.resetSubmit();
  openPopup(popupEditProfile);
}

function closeEditForm() {
  closePopup(popupEditProfile);
  profileValidator.resetValidation();
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSign.textContent = inputSign.value;

  closeEditForm();
}

//функция деактивации кнопки
// function addButtonInactive(form) {
//   const popupButtonSave = form.querySelector(".popup__submit");
//   popupButtonSave.classList.add("popup__submit_inactive");
//   popupButtonSave.disabled = true;
// }

/*
 * Карточки
 */

function createCard(item) {
  return new Card(item, cardTemplate, openPopupImage).generateCard();
  // const card = new Card(item, cardTemplate, popupCardPhoto);
  // const cardElement = card.generateCard();
  // return cardElement;
}

//первоначальное наполнение карточками
function collectCards(arr) {
  arr.forEach(function (el) {
    cardsContainer.prepend(createCard(el));
  });
}

collectCards(initialCards);

//добавление новой карточки
const addCard = (cardData) => {
  cardsContainer.prepend(createCard(cardData));//добавили  li ->  ul
  initialCards.push(cardData);
};

//подтверждение добавления карточки
const handleCardFormSubmit = (event) => {
  event.preventDefault();
  const newCard = {
    name: popupInputPlaceTitle.value,
    link: popupInputPlaceLink.value,
  }
  addCard(newCard)
  event.target.reset();
  closePopup(popupButtonOpenFormNewCard);
  cardAddValidator.disableSubmitButton();
  // addButtonInactive(formAddCard);
};

/*
 * Попап
 */

//открытие и закрытие попапа новой карточки
function openFormAddNewCard() {
  popupInputPlaceTitle.value = "";
  popupInputPlaceLink.value = "";
  openPopup(popupButtonOpenFormNewCard);

  cardAddValidator.resetValidation();
};

function closeFormAddNewCard() {
  closePopup(popupButtonOpenFormNewCard);
};

//открытие попапа
function openPopup(el) {
  if (el === popupButtonOpenFormNewCard) {
    cardAddValidator.disableSubmitButton();
    //addButtonInactive(formAddCard);
  } else if (el === popupEditProfile) {
    profileValidator.resetValidation();
  }
  el.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  setClosePopupByOverlayEventListener(el);
}

//открытие полного размера карточки
function openPopupImage(name, link) {
  popupImageCard.src = link;
  popupImageCard.alt = name;
  popupTitleCard.textContent = name;
  openPopup(popupCardPhoto);
}

//закрыть полный размер карточки
function closeCard() {
  closePopup(popupCardPhoto);
};

//закрытие попапа кнопкой Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//закрытие попапа кликом мыши вне элемента
function setClosePopupByOverlayEventListener(el) {
  el.addEventListener("mousedown", handleClosePopupByOverlay);
}

function handleClosePopupByOverlay(event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
}

//закрытие попапа
function closePopup(el) {
  document.removeEventListener("keydown", closeByEsc);
  el.removeEventListener("mousedown", handleClosePopupByOverlay);
  el.classList.remove("popup_opened");
}

//лиснеры кнопки профиля
buttonEditProfile.addEventListener('click', openEditForm);
buttonCloseEditProfilePopup.addEventListener('click', closeEditForm);
formEditProfile.addEventListener('submit', saveProfile);

//лиснеры попап создания новой карточки
buttonOpenFormNewCard.addEventListener('click', openFormAddNewCard);
buttonCloseAddCardPopup.addEventListener('click', closeFormAddNewCard);

//добавить новую карточку
formAddCard.addEventListener('submit', handleCardFormSubmit);

//закрытие полноразмерного фото карточки
buttonClosePhoto.addEventListener('click', closeCard);

const profileValidator = new FormValidator(validationConfig, popupEditProfile);
profileValidator.enableValidation();
const cardAddValidator = new FormValidator(validationConfig, popupButtonOpenFormNewCard);
cardAddValidator.enableValidation();