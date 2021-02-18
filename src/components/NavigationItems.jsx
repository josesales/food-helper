import React from 'react';

const NavigationItems = () => (

    <React.Fragment>

        <nav className="navigation__nav">
            <ul className="navigation__list">
                <li className="navigation__item"><a href="#" className="navigation__link">Login</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link">Favorite Recipes</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link">Add Recipes</a></li>
                <li className="navigation__item"><a href="#" className="navigation__link">My Recipes</a></li>
            </ul>
        </nav>
    </React.Fragment>
)

export default NavigationItems;