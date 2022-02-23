import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([{ name, about, avatar }, cards]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка получения данных пользователя/карточек: ${err}`));
  });

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
