import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) =>
        console.log(`Ошибка получение данных о пользователе: ${err}`)
      );
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleCardClick(event) {
    console.log(event.target.src);
    setSelectedCard({
      isOpen: true,
      link: event.target.src,
      name: event.target.alt,
    });
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    onUpdateUser(currentUser);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function onUpdateUser(user) {
    api
      .patchProfile(user)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Ошибка изменения профиля: ${err}`));
  }

  function onUpdateAvatar({ avatar }) {
    api
      .patchAvatar(avatar)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(`Ошибка изменения аватар: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={onUpdateUser}
      />

      <PopupWithForm
        name="add"
        title="Новое место"
        textButton="Создать"
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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
