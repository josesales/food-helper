import React from 'react';

const HelperButton = ({ name, icon, onHelperButtonClick }) => (

    <div className="helper-button-container">

        <button onClick={onHelperButtonClick}>{name}</button>
    </div>
)

export default HelperButton;