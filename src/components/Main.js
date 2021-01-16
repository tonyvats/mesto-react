import React from 'react';
import api from '../utils/Api.js';
import Card from '../components/Card'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    
    const [userAvatar, setUserAvatar] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");

    const [cards, setCards] = React.useState([])


    React.useEffect(() => {
        Promise.all([api.getUserInfoFromServer()])
          .then(res => {
            setUserAvatar(res[0].avatar);
            setUserName(res[0].name);
            setUserDescription(res[0].about);
          })
          .catch((err) => console.error(err));
      }, []);
   
    React.useEffect(() => {
        Promise.all([api.getCardsInformation()])
          .then(res => {
            setCards(res[0]);
          })
          .catch((err) => console.error(err));
        }, []); 

    return (
        <main className="content">
            <section className="profile">
                 <div className="profile__avatar-container" onClick={onEditAvatar}>                    
                    <img className="profile__avatar-icon" src={userAvatar} alt="фото аватара" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <p className="profile__subtitle">{userDescription}</p>
                    <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-btn" onClick={onAddPlace} />
            </section>
            <section className="photo-grid">
                { 
                    cards.map((card) => (
                        <Card 
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        />))           
                }
            </section>
        </main>       
    );

}

export default Main;