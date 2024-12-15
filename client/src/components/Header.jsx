import React from "react";
import logo from "../assets/logo-200x200.png";
import Navigation from "./Navigation";
import Search from "./Search";
import ToggleSwitch from "./ToggleSwitch";
import { useHistory, useLocation } from "react-router-dom";
import HTML_ENTITIES from "../util/htmlEntities";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilters } from "../redux/filter/filter-actions";
import { selectIsActive } from "../redux/filter/filter-selector";

const Header = () => {
  const isActive = useSelector(selectIsActive);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const onFilterClick = () => {
    dispatch(toggleFilters());
  };

  const onChangeHandler = () => {
    if (location.pathname != "/") {
      if (isActive) {
        dispatch(toggleFilters());
      }

      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <header className="header">
        <Navigation />

        <div
          title="Search Recipes by Ingredients"
          className="header__search-container"
        >
          <Search
            id="header-container_ingredients"
            placeholder={"Write an Ingredient"}
            buttonName={HTML_ENTITIES.add}
            collectionName="ingredients"
            onChangeCallback={onChangeHandler}
          />
        </div>

        <ToggleSwitch name="Filters" onClickHandler={onFilterClick} />

        <img
          title="Home"
          src={logo}
          alt="Food Helper Logo"
          className="header__logo"
          onClick={() => {
            history.push("/");
          }}
        />
      </header>

      <div className="header-margin"></div>
    </React.Fragment>
  );
};

export default Header;
