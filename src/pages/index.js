import './index.css';
import { initialCards, validationConfig,
  profileName, profileSign, cardTemplate, popupCardPhoto, cardsContainer, popupEditProfile, buttonEditProfile,
  popupFormNewCard, buttonOpenFormNewCard } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

/**
 * Профиль
 **/

//данные профиля
const userInfo = new UserInfo({
  name: profileName,
  description: profileSign,
});

//попап профиля
const popupUserInfo = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupUserInfo.setEventListeners();

//открытиe редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  popupUserInfo.open();
  formValidators["form-profile"].resetValidation();
});

/**
 * Карточка
 **/

//создание карточки
const createCard = (data) => {
  const card = new Card(data, cardTemplate, () => {
    popupImage.open(data);
  });
  return card.generateCard();
};

//наполнение карточками
const cardsList = new Section(
  {
    renderer: (initialCards) => {
      cardsList.setItem(createCard(initialCards));
    },
  },
  cardsContainer
);
cardsList.rendererItems(initialCards);

//попап добавления новой карточки
const popupAddNewCard = new PopupWithForm(popupFormNewCard, {
  handlFormSubmit: ({ place, link }) => {
    cardsList.setItem(createCard({ name: place, link: link }));
  },
});

/**
 * Полноразмерное фото карточки
 **/

//попап полноразмерного фото карточки
const popupImage = new PopupWithImage(popupCardPhoto);
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  formValidators["form-card"].resetValidation();
  popupAddNewCard.open();
  // imageAddValidator.disableButton();
});
popupAddNewCard.setEventListeners();

/**
 * Валидация
 **/

const formValidators = {}

// включение валидации
const enableValidation = (validationConfig) => {
  //const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  const formList = Array.from(document.forms)
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
formValidators['form-profile'].resetValidation()
formValidators['form-card'].resetValidation()





// /*
//  * Профиль
//  */
// function openEditForm() {
//   inputName.value = profileName.textContent;
//   inputSign.value = profileSign.textContent;
//   profileValidator.resetSubmit();
//   profileValidator.resetValidation();
//   openPopup(popupEditProfile);
// }

// function closeEditForm() {
//   closePopup(popupEditProfile);
// }

// function saveProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileSign.textContent = inputSign.value;
//   closeEditForm();
// }

// /*
//  * Карточки
//  */

// function createCard(item) {
//   return new Card(item, cardTemplate, openPopupImage).generateCard();
//   // const card = new Card(item, cardTemplate, popupCardPhoto);
//   // const cardElement = card.generateCard();
//   // return cardElement;
// }

// //первоначальное наполнение карточками
// function collectCards(arr) {
//   arr.forEach(function (el) {
//     cardsContainer.prepend(createCard(el));
//   });
// }

// collectCards(initialCards);

// //добавление новой карточки
// const addCard = (cardData) => {
//   cardsContainer.prepend(createCard(cardData));//добавили  li ->  ul
//   initialCards.push(cardData);
// };

// //подтверждение добавления карточки
// const handleCardFormSubmit = (event) => {
//   event.preventDefault();
//   const newCard = {
//     name: popupInputPlaceTitle.value,
//     link: popupInputPlaceLink.value,
//   }
//   addCard(newCard)
//   event.target.reset();
//   closePopup(popupFormNewCard);
//   cardAddValidator.disableSubmitButton();
//   // addButtonInactive(formAddCard);
// };

// /*
//  * Попап
//  */

// //открытие и закрытие попапа новой карточки
// function openFormAddNewCard() {
//   formAddCard.reset();
//   openPopup(popupFormNewCard);
//   cardAddValidator.disableSubmitButton();
//   cardAddValidator.resetValidation();
// };

// function closeFormAddNewCard() {
//   closePopup(popupFormNewCard);
// };

// //открытие попапа
// function openPopup(el) {
//   el.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEsc);
//   setClosePopupByOverlayEventListener(el);
// }

// //открытие полного размера карточки
// function openPopupImage(name, link) {
//   popupImageCard.src = link;
//   popupImageCard.alt = name;
//   popupTitleCard.textContent = name;
//   openPopup(popupCardPhoto);
// }

// //закрыть полный размер карточки
// function closeCard() {
//   closePopup(popupCardPhoto);
// };

// //закрытие попапа кнопкой Esc
// function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// //закрытие попапа кликом мыши вне элемента
// function setClosePopupByOverlayEventListener(el) {
//   el.addEventListener("mousedown", handleClosePopupByOverlay);
// }

// function handleClosePopupByOverlay(event) {
//   if (event.target.classList.contains("popup_opened")) {
//     closePopup(event.target);
//   }
// }

// //закрытие попапа
// function closePopup(el) {
//   document.removeEventListener("keydown", closeByEsc);
//   el.removeEventListener("mousedown", handleClosePopupByOverlay);
//   el.classList.remove("popup_opened");
// }

// //лиснеры кнопки профиля
// buttonEditProfile.addEventListener('click', openEditForm);
// buttonCloseEditProfilePopup.addEventListener('click', closeEditForm);
// formEditProfile.addEventListener('submit', saveProfile);

// //лиснеры попап создания новой карточки
// buttonOpenFormNewCard.addEventListener('click', openFormAddNewCard);
// buttonCloseAddCardPopup.addEventListener('click', closeFormAddNewCard);

// //добавить новую карточку
// formAddCard.addEventListener('submit', handleCardFormSubmit);

// //закрытие полноразмерного фото карточки
// buttonClosePhoto.addEventListener('click', closeCard);

// const profileValidator = new FormValidator(validationConfig, popupEditProfile);
// profileValidator.enableValidation();
// const cardAddValidator = new FormValidator(validationConfig, popupFormNewCard);
// cardAddValidator.enableValidation();