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
        <header className="header">

            <Navigation />

            <Link className='header__logo' to='/'>
                <img src={logo} alt="Food Helper Logo" className="header__logo" />
            </Link>

            <Search placeholder={'Add an Ingredient'} onSearchChange={onSearchChange}
                buttonName={HTML_ENTITIES.add} onButtonClick={onAddButtonClick} />

            <ToggleSwitch name="Filters" isActive={areFiltersActive} onChange={newValue => setAreFiltersActive(newValue)} />

        </header>
    );
}

export default Header;