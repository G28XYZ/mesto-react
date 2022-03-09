import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
  onConfirmDelete,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

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
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onConfirmDelete={onConfirmDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
