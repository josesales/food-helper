import React from 'react';
import HelperButton from './HelperButton';

const Search = ({ placeholder, onSearchChange, buttonName, onButtonClick }) => {

    return (
        <div className="search-container">

            <input type="text" placeholder={placeholder} onChange={onSearchChange} className="search-container__input" />

            <HelperButton name={buttonName} onButtonClick={onButtonClick} />
        </div>
    );
}

export default Search;