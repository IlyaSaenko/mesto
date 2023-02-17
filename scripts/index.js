let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileSign = content.querySelector('.profile__sign');
let profileEditBtn = content.querySelector('.profile__edit-btn');

let editButton = document.querySelector('.popup__edit-btn');
let closeButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_name');
let popupSign = document.querySelector('.popup__input_sign');

function openEditForm() {
    popupName.value = profileName.textContent;
    popupSign.value = profileSign.textContent;
    popup.classList.add('popup_opened');
}

function closeEditForm() {
    popup.classList.remove('popup_opened');
}

function saveProfile (evt) {
    
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileSign.textContent = popupSign.value;
    popup.classList.remove('popup_opened');
}

profileEditBtn.addEventListener('click', openEditForm);
closeButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', saveProfile);
