import React from 'react';

const NavigationButton = () => (

    <React.Fragment>

        <input type="checkbox" id="nav-toggle" className="navigation__checkbox" />

        <label htmlFor="nav-toggle" className="navigation__button">
            <span className="navigation__icon"></span>
        </label>
    </React.Fragment>
)

export default NavigationButton;