import React from "react";
import { Link, useHistory } from "react-router-dom";
import { selectIsActive } from "../redux/filter/filter-selector";
import { logout } from "../redux/user/user-actions";
import { selectCurrentUser, selectToken } from "../redux/user/user-selector";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilters } from "../redux/filter/filter-actions";

const NavigationItems = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const areFiltersActive = useSelector(selectIsActive);

  //Doing the cleanup here once when going from Home to MyRecipes for example the cleanup of the useEffect(() => {}, [])
  //runs only after MyRecipes returns the JSX
  const recipesAndPaginationCleanUp = () => {
    if (areFiltersActive) {
      dispatch(toggleFilters());
    }
  };

  return (
    <React.Fragment>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link
              className="navigation__link"
              to="/"
              onClick={recipesAndPaginationCleanUp}
            >
              Home
            </Link>
          </li>
          {!currentUser ? (
            <li className="navigation__item">
              <Link className="navigation__link" to="/login">
                Login
              </Link>
            </li>
          ) : (
            <li className="navigation__item">
              <a
                href="#"
                className="navigation__link"
                onClick={() => {
                  dispatch(logout(token));
                  history.push("/");
                }}
              >
                Logout
              </a>
            </li>
          )}

          {currentUser ? (
            <li className="navigation__item">
              <Link
                onClick={recipesAndPaginationCleanUp}
                className="navigation__link"
                to="/myRecipes"
              >
                My Recipes
              </Link>
            </li>
          ) : (
            ""
          )}

          {currentUser ? (
            <li className="navigation__item">
              <Link
                onClick={recipesAndPaginationCleanUp}
                className="navigation__link"
                to="/myFavorites"
              >
                My Favorites
              </Link>
            </li>
          ) : (
            ""
          )}

          {currentUser ? (
            <li className="navigation__item">
              <Link
                onClick={recipesAndPaginationCleanUp}
                className="navigation__link"
                to="/addEditRecipe"
              >
                Add Recipe
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default NavigationItems;
