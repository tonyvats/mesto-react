import React from 'react';

function PopupWithForm({ isOpen, onClose, title, submitButton, popupName, formName, children  }) {
  return (
    <div className={`popup popup__${popupName} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
            <button type="button" className="popup__close-btn" onClick={onClose}></button> 
            <div className="popup__content">
                <h2 className="popup__title">{title}</h2>
                <form name="edit" method="POST" className={`popup__form popup__${formName}`} noValidate>
                    {children}
                    <button type="submit" className="popup__save-btn" onClick={submitButton}>Сохранить</button> 
                </form>
            </div>
        </div>
    </div>
  );
}

export default PopupWithForm;