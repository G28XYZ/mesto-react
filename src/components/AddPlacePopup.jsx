import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const [card, setCard] = useState({});

  function handleChange(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards(card);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textButton="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
          onChange={handleChange}
        />
        <span className="popup__error popup__error-name"></span>
        <input
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          required
          className="popup__input popup__input_elem_link"
          onChange={handleChange}
        />
        <span className="popup__error popup__error-link"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
