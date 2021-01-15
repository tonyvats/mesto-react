import React from 'react';
import '../index.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';

function App() {

    const [isEditAvatarPopupOpen, setIsOpenPopupAvatar] = React.useState(false);
    const [isEditProfilePopupOpen, setIsOpenPopupProfile] = React.useState(false);
    const [isAddPlacePopupOpen, setIsOpenPopupPlace] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [imageData, setImageData] = React.useState(null)

    

    function handleEditAvatarClick() {
        setIsOpenPopupAvatar(true);
    }
    
    function handleAddPlaceClick() {
        setIsOpenPopupPlace(true);
    }

    function handleEditProfileClick() {
        setIsOpenPopupProfile(true);
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
            <Header />    
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />  
            <Footer />
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                title="Обновить аватар"
                popupName="avatar"
                formName="form_update"
            >
                <input 
                    className="popup__input popup__input_link-avatar popup__input_link" 
                    type="url" 
                    name="avatar" 
                    required 
                />   
            </PopupWithForm>

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                title="Редактировать профиль"
                popupName="edit"
                formName="form_edit"
            >
                <div className="popup__field">
                    <input 
                    type="text" 
                    id="empty-name-input"
                    name="nameInput" 
                    className="popup__input popup__input_name" 
                    required 
                    minLength="2" 
                    maxLength="40" />
                    <span id="empty-name-input-error"></span> 
                </div>
                <div className="popup__field">
                    <input 
                        type="text" 
                        id="empty-job-input" 
                        name="jobInput" 
                        className="popup__input popup__input_job" 
                        required minLength="2" 
                        maxLength="200" />
                    <span id="empty-job-input-error"></span>  
                </div>
            </PopupWithForm>

            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                title="Новое место"
                popupName="update"
                formName="form_update"
            >
                <div className="popup__field">
                    <input 
                    type="text" 
                    id="empty-title-input" 
                    name="name" 
                    placeholder="Название" 
                    className="popup__input popup__input_title" 
                    required 
                    minLength="2" 
                    maxLength="30" />
                    <span id="empty-title-input-error"></span> 
                </div>
                <div className="popup__field">
                    <input 
                    type="url" 
                    id="empty-link-input" 
                    name="link" 
                    placeholder="Ссылка на картинку" 
                    className="popup__input popup__input_link" 
                    required />   
                    <span id="empty-link-input-error"></span> 
                </div> 
            </PopupWithForm>

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
        </div>
    );
}

export default App;
 