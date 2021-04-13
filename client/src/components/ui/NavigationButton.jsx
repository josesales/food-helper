import React, { useEffect, useState } from 'react';
import { ReactComponent as Menu } from "../../assets/menu.svg";

const NavigationButton = () => {

    const [isMenuActive, setMenuActive] = useState(false);

    useEffect(() => {
        //Add the event so the function handleOutsideSuggestionsClick can be called whenever there is a click on the mouse
        document.addEventListener("mouseup", handleOutsideMenuClick);

        //Remove the event listener when the component gets unmounted
        return () => {
            document.removeEventListener("mouseup", handleOutsideMenuClick);
        };
    }, []);

    const handleOutsideMenuClick = e => {

        if (e.target.className && e.target.className != 'navigation__list' && !e.target.className.baseVal &&
            e.target.className != 'navigation__icon') {
            setMenuActive(false);
        }
    };

    return (

        <React.Fragment>
            <Menu onClick={() => {
                return setMenuActive(!isMenuActive)
            }} className='navigation__button' />

            <input type="checkbox" checked={isMenuActive} id="nav-toggle" className="navigation__checkbox" />

            <label htmlFor="nav-toggle" className="navigation__button">
                <span className="navigation__icon" onClick={() => {
                    return setMenuActive(!isMenuActive)
                }}></span>
            </label>
        </React.Fragment>
    );
}
export default NavigationButton;