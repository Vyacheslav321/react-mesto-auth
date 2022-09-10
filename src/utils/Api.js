class Api {
  constructor({ defaultUrl, headers }) {
    this._defaultUrl = defaultUrl;
    this._headers = headers;
  }

  _checkResOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получение информаци о карточках и пользователе
  getCards() {
    return fetch(`${this._defaultUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResOk);
  }

  getUserInfo() {
    return fetch(`${this._defaultUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResOk);
  }

  // ЛАЙКИ
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._defaultUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then(this._checkResOk);
  }

  //  Добавление/Удаление карточки пользователя
  createUserCard(cardItem) {
    return fetch(`${this._defaultUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardItem.name,
        link: cardItem.link,
      }),
    }).then(this._checkResOk);
  }

  deleteUserCard(idCard) {
    return fetch(`${this._defaultUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResOk);
  }
  // Редактирование инфо о пользователе
  setUserInfo(name, about) {
    return fetch(`${this._defaultUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResOk);
  }
  // Редактирование аватара пользователя
  setAvatar(userData) {
    return fetch(`${this._defaultUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData,
      }),
    }).then(this._checkResOk);
  }
}

const api = new Api({
  defaultUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "a60c123e-be9f-453f-be98-1b1679621350",
    "Content-Type": "application/json"
  }
});

export default api;