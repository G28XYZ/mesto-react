import logo from "../images/mesto-logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип - место" className="header__logo" />
    </header>
  );
}

export default Header;
