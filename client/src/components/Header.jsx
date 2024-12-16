import React from "react";
import logo from "../assets/logo-200x200.png";
import Navigation from "./Navigation";
import ToggleSwitch from "./ToggleSwitch";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilters } from "../redux/filter/filter-actions";
import { selectIsActive } from "../redux/filter/filter-selector";

const Header = () => {
  const isActive = useSelector(selectIsActive);
  const history = useHistory();
  const dispatch = useDispatch();

  const onFilterClick = () => {
    dispatch(toggleFilters());
  };

  return (
    <React.Fragment>
      <header className="header">
        <Navigation />
        <div className="header__right">
          <ToggleSwitch name="Filters" onClickHandler={onFilterClick} />
          <img
            title="Home"
            src={logo}
            alt="Food Helper Logo"
            className="header__right--logo"
            onClick={() => {
              if (isActive) {
                dispatch(toggleFilters());
              }
              history.push("/");
            }}
          />
        </div>
      </header>

      <div className="header-margin"></div>
    </React.Fragment>
  );
};

export default Header;
