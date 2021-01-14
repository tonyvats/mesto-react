import React from 'react';

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    } 

    return (
        <div className="photo-grid__item">
        <button type="button" className="photo-grid__delete-btn"></button>
        <img className="photo-grid__image" src={card.link} alt="фото" onClick={handleClick} />
            <div className="photo-grid__rectangle">
                <h2 className="photo-grid__title">{card.name}</h2>
                <div className="photo-grid__like-place">
                    <button type="button" className="photo-grid__like-btn"></button>
                    <span className="photo-grid__like-count">{card.likes.length}</span>
                </div>
            </div> 
        </div>
         
    );
}

export default Card;