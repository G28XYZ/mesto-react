import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [children, setChildren] = React.useState();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [name, setName] = React.useState();
  const [title, setTitle] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(data) {
    setSelectedCard(data);
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
        isOpen={isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <template id="place-template">
        <article className="place">
          <img src="#" alt="Картинка" className="place__image" />
          <button aria-label="Удалить" type="button" className="place__delete"></button>
          <div className="place__row">
            <h2 className="place__title"></h2>
            <div>
              <button aria-label="Лайк" type="button" className="place__like"></button>
              <p className="place__like-count"></p>
            </div>
          </div>
        </article>
      </template>

      <div className="popup popup_type_edit">
        <div className="popup__container">
          <button aria-label="Закрыть" type="button" className="popup__close"></button>
          <h3 className="popup__title">Редактировать профиль</h3>
          <form name="form" className="popup__form">
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
            <button type="submit" name="button-edit" className="popup__button">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_add">
        <div className="popup__container">
          <button aria-label="Закрыть" type="button" className="popup__close"></button>
          <h3 className="popup__title">Новое место</h3>
          <form name="form" className="popup__form">
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

            <button type="submit" name="button-add" className="popup__button">
              Создать
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_avatar">
        <div className="popup__container">
          <button aria-label="Закрыть" type="button" className="popup__close"></button>
          <h3 className="popup__title">Обновить аватар</h3>
          <form name="form" className="popup__form">
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
            <button type="submit" name="button-save" className="popup__button">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_delete">
        <div className="popup__container">
          <button aria-label="Закрыть" type="button" className="popup__close"></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <form name="form" className="popup__form">
            <button type="submit" className="popup__button">
              Да
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
