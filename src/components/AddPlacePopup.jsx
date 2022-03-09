import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const [card, setCard] = useState({ name: "", link: "" });
  const [error, setError] = useState({ name: "", link: "" });

  function handleChange(e) {
    setCard({ ...card, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards(card);
  }

  const toggleError = (msg) =>
    msg ? "popup__error popup__error_visible" : "popup__error";

  const isDisabled = () =>
    Object.keys(error).some((e) => error[e]) ||
    Object.keys(card).some((c) => !card[c]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      textButton="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={isDisabled()}
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
        <span className={toggleError(error.name)}>{error.name}</span>
        <input
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          required
          className="popup__input popup__input_elem_link"
          onChange={handleChange}
        />
        <span className={toggleError(error.link)}>{error.link}</span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
