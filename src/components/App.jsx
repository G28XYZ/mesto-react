import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { RenderLoadingContext } from "../contexts/RenderLoadingContext";

import api from "../utils/api";
import auth from "../utils/auth";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ErrorPopup from "./ErrorPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { defaultUser } from "../utils/constants";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [errorPopup, setErrorPopup] = useState({ isOpen: false });
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    message: "",
  });
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getCards()])
  //     .then(([user, cards]) => {
  //       setCurrentUser(user);
  //       setCards(cards);
  //     })
  //     .catch((err) =>
  //       setErrorPopup({
  //         isOpen: true,
  //         message: `Ошибка получения карточек/пользователя: ${err}`,
  //       })
  //     );
  // }, []);

  useEffect(() => handleTokenCheck());

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      auth.getUser(jwt).then((res) => console.log(res));
    }
  }

  function handleCardDelete(e) {
    e.preventDefault();
    const { id } = selectedCard;
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка удаления карточки: ${err}`,
        })
      );
    setIsDeletePopupOpen(false);
  }

  function handleConfirmDelete(id) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCard({ ...selectedCard, id });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка лайка карточки: ${err}`,
        })
      );
  }

  function closeAllPopups(msg = "") {
    if (msg === "error") {
      setErrorPopup({ ...errorPopup, isOpen: false });
      return;
    }
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleCardClick(event) {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      link: event.target.src,
      name: event.target.alt,
    });
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function onUpdateUser(user) {
    console.log("user");
    setLoading(true);
    api
      .patchProfile(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка изменения профиля: ${err}`,
        })
      )
      .finally(() => setLoading(false));
  }

  function onUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .patchAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка изменения аватар: ${err}`,
        })
      )
      .finally(() => setLoading(false));
  }

  function onUpdateCards(card) {
    setLoading(true);
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        setErrorPopup({
          isOpen: true,
          message: `Ошибка добавления карточки: ${err}`,
        })
      )
      .finally(() => setLoading(false));
  }

  const propsMain = {
    cards: cards,
    onEditProfile: onEditProfile,
    onAddPlace: onAddPlace,
    onEditAvatar: onEditAvatar,
    onCardClick: handleCardClick,
    onCardLike: handleCardLike,
    onConfirmDelete: handleConfirmDelete,
    loggedIn: loggedIn,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>
          <Header loggedIn={loggedIn} email={"alex@aalex"} />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
            <Route
              exact
              path="/"
              element={<ProtectedRoute Component={Main} {...propsMain} />}
            />
            <Route
              path="/sign-in"
              element={loggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/sign-up"
              element={loggedIn ? <Navigate to="/" /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      </div>

      <RenderLoadingContext.Provider value={loading}>
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={onUpdateUser}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onUpdateCards={onUpdateCards}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />
      </RenderLoadingContext.Provider>

      <ConfirmDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

      <ErrorPopup
        isOpen={errorPopup.isOpen}
        onClose={closeAllPopups}
        message={errorPopup.message}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
