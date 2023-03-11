let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSign = content.querySelector('.profile__sign');
let profileEditBtn = content.querySelector('.profile__edit-btn');

let editButton = document.querySelector('.popup__edit-btn');
let closeButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__item_type_name');
let inputSign = document.querySelector('.popup__item_type_sign');



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

profileEditBtn.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', saveProfile);


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

// initialCards.forEach((element) => {

//     let newCard = template.querySelector('.element').cloneNode(true);
//     let cardTitle = newCard.querySelector('.element__place');
//     let cardImg = newCard.querySelector('.element__image');
//     let elList = document.querySelector('.elements__list');

//     cardTitle.textContent = element.name;
//     cardImg.src = element.link;
//     cardImg.alt = element.name;

//     elList.append(newCard);
// });

// лайк карточки
// let likeButton = document.querySelector('.element__like-btn');
// likeButton.addEventListener('click', function () {
//     likeButton.classList.toggle('element__like_active');
// });

// удаление
// let removeButton = document.querySelector('.element__delete-btn');
// removeButton.addEventListener('click', function () {
//     let cardDelete = removeButton.closest('.element');
//     cardDelete.remove();
// });

const elementsTemplate = document.querySelector("#elements-add").content.querySelector(".elements__item");
const elementsList = document.querySelector(".elements__list");

// лайк
const likeLike = (event) => {
  event.target.classList.toggle("elements__like_active");
};

// добавление карточек
const generateElementList = (cardData) => {
  const templateElements = elementsTemplate.cloneNode(true);
  const placeNewElements = templateElements.querySelector(".elements__place");
  const likeElementsLike = templateElements.querySelector(".elements__like");
  const elementsDelete = templateElements.querySelector(".elements__delete");
  const elementsImgCard = templateElements.querySelector(".elements__image");
  const placeElements = templateElements.querySelector(".elements__place");

  elementsImgCard.src = cardData.link;
  placeNewElements.textContent = cardData.name;


  // function handleElementsCard() {
  //   popupImageCard.src = elementsImgCard.src;
  //   popupImageCard.alt = titleElements.textContent;
  //   popupPlaceCard.textContent = placeElements.textContent;
  //   openPopup(popupCardPhoto);
  // }

  // elementsImgCard.addEventListener("click", handleElementsCard);
  elementsDelete.addEventListener("click", handleDeleteCard);
  likeElementsLike.addEventListener("click", likeLike);

  return templateElements;
};

const handleDeleteCard = (event) => {
  event.target.closest(".elements__item").remove();
};

const renderElements = (cardData) => {
  console.log(elementsList);
  elementsList.prepend(generateElementList(cardData));
};

initialCards.forEach((cardData) => {
  renderElements(cardData);
});



