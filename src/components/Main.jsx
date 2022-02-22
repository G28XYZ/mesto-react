import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  api
    .getUserInfo()
    .then(({ name, about, avatar }) => {
      setUserName(name);
      setUserDescription(about);
      setUserAvatar(avatar);
    })
    .catch((err) => console.log(`Ошибка получения данных пользователя: ${err}`));

  api
    .getCards()
    .then((cards) => setCards(cards))
    .catch((err) => console.log(`Ошибка получения данных карточек: ${err}`));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img src={userAvatar} alt="Аватар" className="profile__avatar" />
          </div>
          <div className="profile__heading">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="Редактировать"
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          onClick={onAddPlace}
          aria-label="Добавить"
          type="button"
          className="profile__add-button"
        ></button>
      </section>

      <section aria-label="Галерея фотографий" className="gallery">
        {cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
