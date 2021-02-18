import React from 'react';
import logo from "../assets/logo-200x200.png";
import Navigation from './Navigation';
import Search from './Search';
import HelperButton from './HelperButton';

const Header = () => {

    const onSearchChange = () => { }

    const onHelperButtonClick = () => { }
    const addIngredientButton = <HelperButton name={`&#x0253C;`} onHelperButtonClick={onHelperButtonClick} />;

    return (

        <header className="header">

            <Navigation />

            <img src={logo} alt="Food Helper Logo" className="header__logo" />

            <Search placeholder={'Add an Ingredient &#34;'} onSearchChange={onSearchChange} button={addIngredientButton} />
        </header>
    );
}



export default Header;