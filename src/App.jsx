function App() {
  return (
    <>
      <div class="page">
        <header class="header">
          <img src="'./images/mesto-logo.svg'" alt="Логотип - место" class="header__logo" />
        </header>

        <main class="content">
          <section class="profile">
            <div class="profile__info">
              <div class="profile__avatar-container">
                <img
                  src="<%=require('./images/avatar.jpg')%>"
                  alt="Аватар"
                  class="profile__avatar"
                />
              </div>
              <div class="profile__heading">
                <h1 class="profile__name">Жак-Ив Кусто</h1>
                <button
                  type="button"
                  aria-label="Редактировать"
                  class="profile__edit-button"
                ></button>
              </div>
              <p class="profile__job">Исследователь океана</p>
            </div>
            <button aria-label="Добавить" type="button" class="profile__add-button"></button>
          </section>

          <section aria-label="Галлерея фотографий" class="gallery"></section>
        </main>

        <footer class="footer">
          <p class="footer__copyright">&copy; 2020 Mesto Russia</p>
        </footer>
      </div>

      <template id="place-template">
        <article class="place">
          <img src="#" alt="Картинка" class="place__image" />
          <button aria-label="Удалить" type="button" class="place__delete"></button>
          <div class="place__row">
            <h2 class="place__title"></h2>
            <div>
              <button aria-label="Лайк" type="button" class="place__like"></button>
              <p class="place__like-count"></p>
            </div>
          </div>
        </article>
      </template>

      <div class="popup popup_type_edit">
        <div class="popup__container">
          <button aria-label="Закрыть" type="button" class="popup__close"></button>
          <h3 class="popup__title">Редактировать профиль</h3>
          <form name="form" class="popup__form">
            <div class="popup__input-container">
              <input
                placeholder="Имя"
                type="text"
                name="name"
                class="popup__input popup__input_elem_name"
                minlength="2"
                maxlength="40"
                required
              />
              <span class="popup__error popup__error-name"></span>
              <input
                placeholder="Работа"
                type="text"
                name="about"
                class="popup__input popup__input_elem_about"
                minlength="2"
                maxlength="200"
                required
              />
              <span class="popup__error popup__error-about"></span>
            </div>
            <button type="submit" name="button-edit" class="popup__button">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div class="popup popup_type_add">
        <div class="popup__container">
          <button aria-label="Закрыть" type="button" class="popup__close"></button>
          <h3 class="popup__title">Новое место</h3>
          <form name="form" class="popup__form">
            <div class="popup__input-container">
              <input
                placeholder="Название"
                type="text"
                name="name"
                required
                class="popup__input popup__input_elem_name"
                minlength="2"
                maxlength="30"
              />
              <span class="popup__error popup__error-name"></span>
              <input
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                required
                class="popup__input popup__input_elem_link"
              />
              <span class="popup__error popup__error-link"></span>
            </div>

            <button type="submit" name="button-add" class="popup__button">
              Создать
            </button>
          </form>
        </div>
      </div>

      <div class="popup popup_type_image">
        <div class="popup__container popup__container_type_image">
          <button aria-label="Закрыть" type="button" class="popup__close"></button>
          <img src="#" alt="Картинка" class="popup__image" />
          <p class="popup__subtitle"></p>
        </div>
      </div>

      <div class="popup popup_type_avatar">
        <div class="popup__container">
          <button aria-label="Закрыть" type="button" class="popup__close"></button>
          <h3 class="popup__title">Обновить аватар</h3>
          <form name="form" class="popup__form">
            <div class="popup__input-container">
              <input
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                required
                class="popup__input popup__input_elem_link"
              />
              <span class="popup__error popup__error-link"></span>
            </div>
            <button type="submit" name="button-save" class="popup__button">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div class="popup popup_type_delete">
        <div class="popup__container">
          <button aria-label="Закрыть" type="button" class="popup__close"></button>
          <h3 class="popup__title">Вы уверены?</h3>
          <form name="form" class="popup__form">
            <button type="submit" class="popup__button">
              Да
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
