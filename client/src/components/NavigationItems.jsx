import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { setPersistRecipe, setRecipes } from '../redux/recipe/recipe-actions';
import { selectPersistRecipe } from '../redux/recipe/recipe-selector';
import { logout } from '../redux/user/user-actions';
import { selectCurrentUser, selectToken } from '../redux/user/user-selector';

const NavigationItems = ({ currentUser, token, logout, setRecipes, setPersistRecipe, setVisitedPage, setCurrentPage }) => {

    const history = useHistory();

    //Doing the cleanup here once when going from Home to MyRecipes for example the cleanup of the useEffect(() => {}, [])
    //runs only after MyRecipes returns the JSX
    const recipesAndPaginationCleanUp = () => {
        setRecipes([]);
        setPersistRecipe(null);
        setVisitedPage({});
        setCurrentPage(0);
    }

    return (

        <React.Fragment>
            <nav className="navigation__nav">
                <ul className="navigation__list">

                    {
                        !currentUser ?
                            <li className="navigation__item">
                                <Link className="navigation__link" to='/login'>
                                    Login
                            </Link>
                            </li> : <li className="navigation__item"><a href="#" className="navigation__link"
                                onClick={() => {
                                    logout(token);
                                    history.push('/');
                                }}>Logout</a></li>
                    }

                    {
                        currentUser ?
                            <li className="navigation__item">
                                <Link onClick={recipesAndPaginationCleanUp} className="navigation__link" to='/myRecipes'>
                                    My Recipes
                                </Link>
                            </li> : ''
                    }

                    {
                        currentUser ?
                            <li className="navigation__item">
                                <Link onClick={recipesAndPaginationCleanUp} className="navigation__link" to='/myFavorites'>
                                    My Favorites
                                </Link>
                            </li> : ''
                    }

                    {
                        currentUser ?
                            <li className="navigation__item">
                                <Link className="navigation__link" to='/addEditRecipe'>
                                    Add Recipe
                                </Link>
                            </li> : ''
                    }
                </ul>
            </nav>
        </React.Fragment>
    )
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    persistRecipe: selectPersistRecipe,
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    logout: token => dispatch(logout(token)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);