import { useContext, useState, useEffect } from "react";
import logo from "../images/mesto-logo.svg";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ loggedIn, onExitProfile }) {
  const location = useLocation();
  const path = location.pathname;
  const { email } = useContext(CurrentUserContext);
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      setNavActive(false);
    }
  }, [loggedIn]);

  const toggleNav = () => {
    console.log("open nav");
    setNavActive(!navActive);
  };

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
      <div
        className={`header__container ${
          loggedIn && "header__container_logged"
        }`}
      >
        <div className="header__title">
          <img src={logo} alt="Логотип - место" className="header__logo" />
          {loggedIn && (
            <button
              className={`header__button ${
                navActive && "header__button_active"
              }`}
              onClick={toggleNav}
            ></button>
          )}
        </div>
        <div className={`header__auth ${navActive && "header__auth_active"}`}>
          <p className="header__email">{loggedIn && email}</p>
          {links[path]}
        </div>
      </div>
    </header>
  );
}

export default Header;
