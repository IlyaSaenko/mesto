// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationClass = {
    formSelector: ".popup__container",
    inputSelector: ".popup__item",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  };
  
  const openInputError = (
    formElement,
    inputElement,
    errorMessage,
    initialData
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    addClassElem(inputElement, initialData.inputErrorClass);
    errorElement.textContent = errorMessage;
    addClassElem(errorElement, initialData.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, initialData) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    removeClassElem(inputElement, initialData.inputErrorClass);
    removeClassElem(errorElement, initialData.errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidition = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      openInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationClass
      );
    } else {
      hideInputError(formElement, inputElement, validationClass);
    }
  };
  
  const setEventListeners = (formElement, initialData) => {
    const inputList = Array.from(
      formElement.querySelectorAll(initialData.inputSelector)
    );
  
    const buttonElement = formElement.querySelector(
      initialData.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, validationClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidition(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, validationClass);
      });
    });
  };
  
  function enableValidation(initialData) {
    const formList = Array.from(
      document.querySelectorAll(initialData.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationClass);
    });
  }
  
  enableValidation(validationClass);
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  function toggleButtonState(inputList, buttonElement, initialData) {
    if (hasInvalidInput(inputList)) {
      addClassElem(buttonElement, initialData.inactiveButtonClass);
    } else {
      removeClassElem(buttonElement, initialData.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  function removeClassElem(el, classEl) {
    el.classList.remove(classEl);
  }
  function addClassElem(el, classEl) {
    el.classList.add(classEl);
  }