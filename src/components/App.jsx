import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [children, setChildren] = useState(<></>);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
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
    setChildren(
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
    );
    setName("edit");
    setTitle("Редактировать профиль");
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function onAddPlace() {
    setChildren(
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
    );
    setName("add");
    setTitle("Новое место");
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function onEditAvatar() {
    setChildren(
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
    );
    setName("avatar");
    setTitle("Обновить аватар");
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
        children={children}
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default App;
