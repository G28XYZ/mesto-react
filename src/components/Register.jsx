import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form">
        <div className="auth__input-container">
          <input className="auth__input" placeholder="Email"></input>
          <input className="auth__input" placeholder="Пароль"></input>
        </div>
        <button className="auth__submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегестрированны? Войти
      </Link>
    </div>
  );
}

export default Register;
