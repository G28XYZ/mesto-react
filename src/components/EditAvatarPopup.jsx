import { createRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = createRef();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  function handleChange() {
    setError(avatar.current.validationMessage);
  }

  const toggleError = (msg) => `popup__error ${msg && " popup__error_visible"}`;

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isDisabled={error}
    >
      <div className="popup__input-container">
        <input
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          required
          onChange={handleChange}
          className="popup__input popup__input_elem_link"
          ref={avatar}
        />
        <span className={toggleError(error)}>{error}</span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
