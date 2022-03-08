import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = createRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
    onClose();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          required
          className="popup__input popup__input_elem_link"
          ref={avatar}
        />
        <span className="popup__error popup__error-link"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
