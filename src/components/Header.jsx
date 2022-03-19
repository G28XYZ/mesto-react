import logo from "../images/mesto-logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ loggedIn, email }) {
  const location = useLocation();
  const path = location.pathname;

  const links = {
    "/sign-up": <Link to="/sign-in">Вход</Link>,
    "/sign-in": <Link to="/sign-up">Регистрация</Link>,
    "/": <Link to="/sign-in">Выйти</Link>,
  };

  return (
    <header className="header">
      <img src={logo} alt="Логотип - место" className="header__logo" />
      <div>
        {loggedIn && email}
        {links[path]}
      </div>
    </header>
  );
}

export default Header;
