import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [cards, setCards] = useState([]);
  const { name, about, avatar, _id } = useContext(CurrentUserContext);

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === _id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка лайка карточки: ${err}`));
  }

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) =>
        console.log(`Ошибка получения данных пользователя/карточек: ${err}`)
      );
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img src={avatar} alt="Аватар" className="profile__avatar" />
          </div>
          <div className="profile__heading">
            <h1 className="profile__name">{name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="Редактировать"
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__job">{about}</p>
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
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onDeleteCard={handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
