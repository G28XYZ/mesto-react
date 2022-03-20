const InfoToolTip = ({ isOpen, success }) => {
  const messages = {
    false: {
      image: "../images/denied.png",
      message: "Что-то пошло не так! Попробуйте ещё раз.",
    },
    true: {
      image: "../images/success.png",
      message: "Вы успешно зарегистрировались!",
    },
  };

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <img className="popup__image" src={messages[success].image} />
        <h3 className="popup__title">{messages[success].message}</h3>
      </div>
    </div>
  );
};

export default InfoToolTip;
