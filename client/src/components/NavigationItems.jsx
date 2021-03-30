import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { logout } from '../redux/user/user-actions';
import { selectCurrentUser, selectToken } from '../redux/user/user-selector';

const NavigationItems = ({ currentUser, token, logout }) => {

    const history = useHistory();
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
                                <Link className="navigation__link" to='/myRecipes'>
                                    My Recipes
                                </Link>
                            </li> : ''
                    }

                    {
                        currentUser ?
                            <li className="navigation__item">
                                <Link className="navigation__link" to='/myFavorites'>
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
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    logout: token => dispatch(logout(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);