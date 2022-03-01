import React from "react";

function PopupWithForm({ name, title, textButton, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form name={name} className="popup__form">
          {children}
          <button type="submit" className="popup__button">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
