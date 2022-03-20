import successImage from "../images/success.png";
import deniedImage from "../images/denied.png";

const InfoToolTip = ({ isOpen, success, onClose }) => {
  const messages = {
    false: {
      image: deniedImage,
      message: "Что-то пошло не так! Попробуйте ещё раз.",
    },
    true: {
      image: successImage,
      message: "Вы успешно зарегистрировались!",
    },
  };

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container" style={{ textAlign: "center" }}>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <img
          className="popup__icon"
          src={messages[success].image}
          style={{ paddingTop: 24, paddingBottom: 32 }}
        />
        <h3 className="popup__title">{messages[success].message}</h3>
      </div>
    </div>
  );
};

export default InfoToolTip;
