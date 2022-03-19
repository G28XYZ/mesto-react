import logo from "../images/mesto-logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ loggedIn, email }) {
  const location = useLocation();
  const path = location.pathname;

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
      <Link to="/sign-in" className="header__link header__link_blackout">
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
