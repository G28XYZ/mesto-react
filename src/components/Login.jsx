function Login() {
  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form">
        <div className="auth__input-container">
          <input
            type="email"
            placeholder="Email"
            className="auth__input"
          ></input>
          <input
            type="password"
            placeholder="Пароль"
            className="auth__input"
          ></input>
        </div>
        <button className="auth__submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;
