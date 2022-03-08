import React, { useContext, useMemo } from "react";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";

const PopupWithForm = React.memo(
  ({
    name,
    title,
    textButton = "Сохранить",
    isOpen,
    onClose,
    children,
    onSubmit,
  }) => {
    const loading = useContext(RenderLoadingContext);
    textButton = useMemo(() => (loading ? "Сохранение..." : textButton), [
      loading,
    ]);

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
          <form name={name} className="popup__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__button">
              {textButton}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default PopupWithForm;
