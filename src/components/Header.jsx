import { useContext } from "react";
import logo from "../images/mesto-logo.svg";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ loggedIn, onExitProfile }) {
  const location = useLocation();
  const path = location.pathname;
  const { email } = useContext(CurrentUserContext);

  const links = {
    "/sign-up": (
      <Link to="/sign-in" className="header__link">
        Вход
      </Link>
    ),
    "/sign-in": (
      <Link to="/sign-up" className="header__link">
        Регистрация
      </Link>
    ),
    "/": (
      <Link
        to="/sign-in"
        className="header__link header__link_blackout"
        onClick={onExitProfile}
      >
        Выйти
      </Link>
    ),
  };

  return (
    <header className="header">
      <img src={logo} alt="Логотип - место" className="header__logo" />
      <div className="header__auth">
        <p className="header__email">{loggedIn && email}</p>
        {links[path]}
      </div>
    </header>
  );
}

export default Header;
