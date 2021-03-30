import React from 'react';

const HelperButton = ({ name, onButtonClick, inputText, isSelect }) => (

    <button name={inputText} onClick={onButtonClick} className={isSelect ? "helper-button-select" : "helper-button-container"}>
        {name}
    </button>
)

export default HelperButton;