import React from 'react';
import HelperButton from './HelperButton';

const Search = ({ placeholder, onSearchChange, buttonName, onButtonClick, containerClass, inputClass, children }) => {

    const searchContainerClass = containerClass ? containerClass : 'search-container';
    const searchInputClass = inputClass ? inputClass : 'search-container__input';

    return (
        <div className={searchContainerClass}>

            <input type="text" placeholder={placeholder} onChange={onSearchChange} className={searchInputClass} />
            <HelperButton name={buttonName} onButtonClick={onButtonClick} />

            {children}
        </div>
    );
}

export default Search;