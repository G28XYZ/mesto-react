function Main() {
  function handleEditAvatarClick() {
    const popup = document.querySelector(".popup_type_avatar");
    popup.classList.add("popup_opened");
  }
  function handleEditProfileClick() {
    const popup = document.querySelector(".popup_type_edit");
    popup.classList.add("popup_opened");
  }
  const handleAddPlaceClick = () => {
    const popup = document.querySelector(".popup_type_add");
    popup.classList.add("popup_opened");
  };

  return (
    <main class="content">
      <section class="profile">
        <div class="profile__info">
          <div class="profile__avatar-container" onClick={handleEditAvatarClick}>
            <img src="<%=require('./images/avatar.jpg')%>" alt="Аватар" class="profile__avatar" />
          </div>
          <div class="profile__heading">
            <h1 class="profile__name">Жак-Ив Кусто</h1>
            <button
              onClick={handleEditProfileClick}
              type="button"
              aria-label="Редактировать"
              class="profile__edit-button"
            ></button>
          </div>
          <p class="profile__job">Исследователь океана</p>
        </div>
        <button
          onClick={handleAddPlaceClick}
          aria-label="Добавить"
          type="button"
          class="profile__add-button"
        ></button>
      </section>

      <section aria-label="Галерея фотографий" class="gallery"></section>
    </main>
  );
}

export default Main;
