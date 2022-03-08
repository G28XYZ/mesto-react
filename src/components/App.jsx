import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [textButton, seTextButton] = useState("");
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
    setName("edit");
    setTitle("Редактировать профиль");
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
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function onUpdateUser(user) {
    api
      .patchProfile(user)
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(`Ошибка изменения профиля: ${err}`));
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
        title={title}
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={onUpdateUser}
      />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
