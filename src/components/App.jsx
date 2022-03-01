import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [textButton, seTextButton] = useState("");
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleCardClick(data) {
    setSelectedCard({ isOpen: true, ...data });
  }

  function onEditProfile() {
    setName("edit");
    setTitle("Редактировать профиль");
    seTextButton("Сохранить");
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function onAddPlace() {
    setName("add");
    setTitle("Новое место");
    seTextButton("Создать");
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function onEditAvatar() {
    setName("avatar");
    setTitle("Обновить аватар");
    seTextButton("Сохранить");
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={onEditProfile}
          onAddPlace={onAddPlace}
          onEditAvatar={onEditAvatar}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        name={name}
        title={title}
        textButton={textButton}
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
      >
        <div className="popup__input-container">
          <input
            placeholder="Имя"
            type="text"
            name="name"
            className="popup__input popup__input_elem_name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error popup__error-name"></span>
          <input
            placeholder="Работа"
            type="text"
            name="about"
            className="popup__input popup__input_elem_about"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error popup__error-about"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name={name}
        title={title}
        textButton={textButton}
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
      >
        <div className="popup__input-container">
          <input
            placeholder="Название"
            type="text"
            name="name"
            required
            className="popup__input popup__input_elem_name"
            minLength="2"
            maxLength="30"
          />
          <span className="popup__error popup__error-name"></span>
          <input
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            required
            className="popup__input popup__input_elem_link"
          />
          <span className="popup__error popup__error-link"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name={name}
        title={title}
        textButton={textButton}
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
      >
        <div className="popup__input-container">
          <input
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            required
            className="popup__input popup__input_elem_link"
          />
          <span className="popup__error popup__error-link"></span>
        </div>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
