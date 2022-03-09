import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ onClose, isOpen, onCardDelete }) {
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      textButton="Да"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onCardDelete}
    />
  );
}

export default ConfirmDeletePopup;
