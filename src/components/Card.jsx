function Card({ card, onCardClick }) {
  return (
    <article key={card._id} className="place">
      <img onClick={onCardClick} src={card.link} alt={card.name} className="place__image" />
      <button aria-label="Удалить" type="button" className="place__delete"></button>
      <div className="place__row">
        <h2 className="place__title">{card.name}</h2>
        <div>
          <button aria-label="Лайк" type="button" className="place__like"></button>
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
