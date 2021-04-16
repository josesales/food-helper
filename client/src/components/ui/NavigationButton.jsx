import React, { useEffect, useState } from 'react';
import { ReactComponent as Menu } from "../../assets/menu.svg";

const NavigationButton = () => {

    const [isMenuActive, setIsMenuActive] = useState(false);

    useEffect(() => {
        //Add the event so the function handleOutsideSuggestionsClick can be called whenever there is a click on the mouse
        document.addEventListener("mouseup", handleOutsideMenuClick);

        //Remove the event listener when the component gets unmounted
        return () => {
            document.removeEventListener("mouseup", handleOutsideMenuClick);
        };
    }, []);

    const handleOutsideMenuClick = e => {

        if (e.target.className && e.target.className != 'navigation__list' &&
            e.target.className != 'navigation__icon' && e.target.className != 'navigation__button-container'
            && !e.target.className.baseVal) {
            setIsMenuActive(false);
        }
    };

    return (
        <React.Fragment>
            <input type="checkbox" checked={isMenuActive} id="nav-toggle" className="navigation__checkbox" />
            <div className="navigation__button-container" onClick={() => {
                setIsMenuActive(!isMenuActive)
            }}>

                <Menu className="navigation__button" />
            </div>
        </React.Fragment>
    );
}
export default NavigationButton;