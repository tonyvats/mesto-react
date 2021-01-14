class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    editProfileAvatar(data) {
        return fetch(`${this._url}${'users/me/avatar'}`, {
            method: "PATCH",
            headers: this._headers, 
            body: JSON.stringify({
                avatar: data.avatar
            })       
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getUserInfoFromServer() {
        return fetch(`${this._url}${'users/me'}`, {
            method: "GET",
            headers: this._headers        
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getAvatarFromServer() {
        return fetch(`${this._url}${'users/me/avatar'}`, {
            method: "GET",
            headers: this._headers        
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    setUserInfoOnServer(data) {
        return fetch(`${this._url}${'users/me'}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.nameInput,
                about: data.jobInput
            })       
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getCardsInformation() {
        return fetch(`${this._url}${'cards'}`, {
            method: "GET",
            headers: this._headers        
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    addCards(data) {
        return fetch(`${this._url}${'cards'}`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })       
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}${'cards/'}${cardId}`, {
            method: "DELETE",
            headers: this._headers,   
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }


    makeLikeCard(cardId) {
        return fetch(`${this._url}${'cards/likes/'}${cardId}`, {
            method: "PUT",
            headers: this._headers      
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    removeLikeCard(cardId) {
        return fetch(`${this._url}${'cards/likes/'}${cardId}`, {
            method: "DELETE",
            headers: this._headers      
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

}



const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        "Authorization": "6b4f0e7a-6b81-4fab-971b-4da07f00c7c0",
        'Content-Type': 'application/json'
    }
});

export default api;