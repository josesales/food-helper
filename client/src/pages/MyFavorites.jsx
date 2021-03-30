import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchFavoriteRecipes, setRecipes } from '../redux/recipe/recipe-actions';
import RecipeItems from '../components/RecipeItems';
import { selectRecipes, selectTotal } from '../redux/recipe/recipe-selector';
import Loader from '../components/ui/Loader';
import Pagination from '../components/ui/Pagination';
import { createStructuredSelector } from 'reselect';
import pagination from '../util/pagination';
import { selectVisitedPage } from '../redux/pagination/pagination-selector';
import { addVisitedPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { selectCurrentUser } from '../redux/user/user-selector';

const recipesPagination = pagination(0);

const MyFavorites = ({ recipes, visitedPage, total, fetchFavoriteRecipes, setRecipes, setVisitedPage, addVisitedPage, currentUser }) => {

    recipesPagination.total = total;
    const [isLoading, setIsLoading] = useState(false);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        const getMyFavoritesFirstPage = async () => {
            await fetchFavoriteRecipes(recipesPagination.currentPage, true, currentUser._id);
        }

        getMyFavoritesFirstPage();

        return () => {
            setRecipes([]);
            setVisitedPage({});
        }
    }, []);


    //search in the reducer the respective items of the current page and and if they are not there search in the db
    const fetchMyFavoritesByPage = async currentPage => {

        recipesPagination.currentPage = currentPage;

        if (visitedPage[currentPage]) {
            //set the recipes of the global state with the recipes of the page that was already visited
            setRecipes(visitedPage[currentPage]);
        } else {
            await setIsLoading(true);
            await fetchFavoriteRecipes(currentPage, false, currentUser._id);
            await setIsLoading(false);
        }

    }

    useEffect(() => {
        addVisitedPage({ pageNumber: recipesPagination.currentPage, items: recipes });
    }, [recipes]);

    return (
        <div className="my-favorites">

            <div className="my-favorites__title">
                <h2 className="heading-primary">My Favorites</h2>
            </div>

            {
                isLoading ? <Loader /> : <RecipeItems />
            }

            <Pagination paginationObj={recipesPagination} fetchItems={fetchMyFavoritesByPage} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes,
    total: selectTotal,
    visitedPage: selectVisitedPage,
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    fetchFavoriteRecipes: (currentPage, getTotal, userId) => dispatch(fetchFavoriteRecipes(currentPage, getTotal, userId)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);