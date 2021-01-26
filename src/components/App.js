import React from 'react';
import '../index.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import AddPlacePopup from '../components/AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from '../components/ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function App() {

    const [isEditAvatarPopupOpen, setIsOpenPopupAvatar] = React.useState(false);
    const [isEditProfilePopupOpen, setIsOpenPopupProfile] = React.useState(false);
    const [isAddPlacePopupOpen, setIsOpenPopupPlace] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [imageData, setImageData] = React.useState(null)
    
    const [cards, setCards] = React.useState([])
    const [currentUser,  setCurrentUser] = React.useState(""); 
        
    React.useEffect(() => {
        Promise.all([api.getUserInfoFromServer(), api.getCardsInformation()])
            .then(res => {
                console.log(res)
                setCurrentUser(res[0]);
                setCards(res[1]);
            })
            .catch((err) => console.error(err));
      }, []);

    function handleEditAvatarClick() {
        setIsOpenPopupAvatar(true);
    }
    
    function handleAddPlaceClick() {
        setIsOpenPopupPlace(true);
    }

    function handleEditProfileClick() {
        setIsOpenPopupProfile(true);
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          // Обновляем стейт
          setCards(newCards);
        })
        .catch((err) => console.error(err));
    } 

    function handleCardDelete(card) {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter(c => c._id !== card._id));
        })
        .catch((err) => console.error(err));
    }
    
    function handleUpdateUser(userData) {
        api.setUserInfoOnServer(userData.name, userData.about)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
                closeAllPopups()
        })
        .catch((err) => console.error(err))
    }

    function handleUpdateAvatar(userData) {
        api.editProfileAvatar(userData.avatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups()
        })
        .catch((err) => console.error(err))

    }

    function handleAddPlaceSubmit(cardData) {
        // console.log(cards);
        api.addCards(cardData.name, cardData.link)
            .then(card => {
                console.log(cards)
                setCards([card, ...cards]);
                closeAllPopups()
        })
        .catch((err) => console.error(err))
    }

    function handleCardClick(card) {        
        setSelectedCard(true);
        setImageData(card);
    }

    function closeAllPopups() {
        setIsOpenPopupAvatar(false);
        setIsOpenPopupProfile(false);
        setIsOpenPopupPlace(false);
        setSelectedCard(null);
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />    
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardList={cards}
                    onCardLike={handleCardLike}
                    onDeleteCard={handleCardDelete}
                />  
                <Footer />

                <EditProfilePopup 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateUser={handleUpdateUser}
                /> 

                <EditAvatarPopup 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups} 
                    onUpdateAvatar={handleUpdateAvatar}
                /> 

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={imageData}
                    isOpen={selectedCard}
                    onClose={closeAllPopups}
                />

                <div className="popup popup__submit">
                    <div className="popup__container">
                        <button type="button" className="popup__close-btn"></button> 
                        <div className="popup__content">
                            <h2 className="popup__title popup__title_submit">Вы уверены?</h2>
                            <form name="submit" className="popup__form popup__form_update">
                                <button type="submit" className="popup__save-btn popup__save-btn_confirm">Да</button> 
                            </form>
                        </div>
                    </div>
                </div>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
 