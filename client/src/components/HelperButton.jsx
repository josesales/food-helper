import React from 'react';

const HelperButton = ({ name, onButtonClick }) => (

    <button onClick={onButtonClick} className="helper-button-container">{name}</button>
)

export default HelperButton;