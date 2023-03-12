const content = document.querySelector('.content');

//попап редактирования профиля
const profileName = content.querySelector('.profile__name');
const profileSign = content.querySelector('.profile__sign');
const profileEditBtn = content.querySelector('.profile__edit-btn');
const editButton = document.querySelector('.popup__edit-btn');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__item_type_name');
const inputSign = document.querySelector('.popup__item_type_sign');

//попап открытия фотографии
const popupCardPhoto = document.querySelector('.popup_photo_card');
const popupImageCard = document.querySelector('.popup__image-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const buttonClosePhoto = document.querySelector(".popup__close_photo");
const buttonCloseCard = document.querySelector('.popup__close_card');

//попап добавления карточки
const popupEditForms = document.querySelector(".popup__formcard");
const buttonOpenFormNewCard = document.querySelector(".profile__add-photo-btn");
const popupButtonOpenFormNewCard = document.querySelector(".popup_type_add-card");
const userNameInput = document.querySelector(".popup__item_type_name");
const jobInput = document.querySelector(".popup__item_type_sign");
const popupEditForm = document.querySelector(".popup__form");
const popupInputPlaceTitle = document.querySelector(".popup__item_palce_name");
const popupInputPlaceLink = document.querySelector(".popup__item_place_link");

const elementsTemplate = document.querySelector("#elements-add").content.querySelector(".elements__item");
const elementsList = document.querySelector(".elements__list");



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//функции редактирования профиля
function openEditForm() {
  inputName.value = profileName.textContent;
  inputSign.value = profileSign.textContent;
  popup.classList.add('popup_opened');
}

function closeEditForm() {
  popup.classList.remove('popup_opened');
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileSign.textContent = inputSign.value;

  closeEditForm();
}


/*функции карточек*/

// лайк карточке
const likeLike = (event) => {
  event.target.classList.toggle("elements__like_active");
};

//раскрыть в полный размер
function openCard(elem) {
  elem.classList.add("popup_opened");
};

//общая функция закрытия попап
function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

//закрыть полный размер карточки
function closeCard() {
  closePopup(popupCardPhoto);
};

//добавление новой карточки
function openFormAddNewCard() {
  openCard(popupButtonOpenFormNewCard);
};

function closeFormAddNewCard() {
  closePopup(popupButtonOpenFormNewCard);
};

//первоначальное наполнение карточками
const generateElementList = (cardData) => {
  const templateElements = elementsTemplate.cloneNode(true);
  const placeNewElements = templateElements.querySelector(".elements__place");
  const likeElementsLike = templateElements.querySelector(".elements__like");
  const elementsDelete = templateElements.querySelector(".elements__delete");
  const elementsImgCard = templateElements.querySelector(".elements__image");
  const placeElements = templateElements.querySelector(".elements__place");

  elementsImgCard.src = cardData.link;
  placeNewElements.textContent = cardData.name;

  //функция открытия фотографии
  function handleElementsCard() {
    popupImageCard.src = elementsImgCard.src;
    popupImageCard.alt = placeElements.textContent;
    popupTitleCard.textContent = placeElements.textContent;
    openCard(popupCardPhoto);
  }

  //листнеры карточек
  elementsImgCard.addEventListener("click", handleElementsCard);

  //функция удаления фотографии
  elementsDelete.addEventListener("click", handleDeleteCard);

  //функция лайка фотографии
  likeElementsLike.addEventListener("click", likeLike);
  return templateElements;
};



const handleDeleteCard = (event) => {
  event.target.closest(".elements__item").remove();
};

const renderElements = (cardData) => {
  console.log('good');
  elementsList.prepend(generateElementList(cardData));
};

//подтверждение добавления карточки
const submitAddNewCard = (event) => {
  event.preventDefault();
  // console.log(popupInputPlaceTitle);
  // console.log(popupInputPlaceLink);
  renderElements({
    name: popupInputPlaceTitle.value,
    link: popupInputPlaceLink.value,
  });
  event.target.reset();
  closePopup(popupButtonOpenFormNewCard);
};

initialCards.forEach((cardData) => {
  renderElements(cardData);
});


// function testClick(){
//   alert('зыкрыли карточку');
// }

//листнеры кнопки профиля
profileEditBtn.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', saveProfile);

//листнеры попап создания новой карточки
buttonOpenFormNewCard.addEventListener('click', openFormAddNewCard);
buttonCloseCard.addEventListener('click', closeFormAddNewCard);

//добавить новую карточку
popupEditForms.addEventListener('submit', submitAddNewCard);

//закрытие полноразмерного фото карточки
buttonClosePhoto.addEventListener('click', closeCard);
