import React from 'react';

const Search = ({ placeholder, name, onSearchChange, button }) => {

    return (
        <div className="search-container">
            <input type="text" placeholder={placeholder} onChange={onSearchChange} className="search-container__input" />
            {button}
        </div>
    );
}

//plus
// &box&boxvh;
// &#x0253C;
// &#9532;

//left arrow
// &Lang;
// &#x027EA;
// &#10218;

//right arrow
// &Rang;
// &#x027EB;
// &#10219;

export default Search;