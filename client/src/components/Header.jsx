import React, { useState } from 'react';
import logo from "../assets/logo-200x200.png";
import Navigation from './Navigation';
import Search from './Search';
import ToggleSwitch from './ToggleSwitch';
import { Link } from 'react-router-dom';
import HTML_ENTITIES from '../util/htmlEntities';

const Header = () => {

    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const onSearchChange = () => { }

    const onAddButtonClick = () => { }

    // <HelperButton displayName={HTML_ENTITIES.add} onHelperButtonClick={onHelperButtonClick} />;

    return (
        <div className="header-container">
            <header className="header">

                <Navigation />

                <Link className='header__logo' to='/'>
                    <img src={logo} alt="Food Helper Logo" className="header__logo" />
                </Link>
                <div className="header__search-container">

                    <Search id="header-container_ingredients" placeholder={'Write an Ingredient'} onSearchChange={onSearchChange}
                        buttonName={HTML_ENTITIES.add} onButtonClick={onAddButtonClick} collectionName="ingredients" />
                </div>

                <ToggleSwitch name="Filters" isActive={areFiltersActive} onChange={newValue => setAreFiltersActive(newValue)} />

            </header>
        </div>
    );
}

export default Header;