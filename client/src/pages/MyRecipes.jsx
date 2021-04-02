import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchRecipes, setRecipes } from '../redux/recipe/recipe-actions';
import RecipeItems from '../components/RecipeItems';
import { selectPersistRecipe, selectRecipes, selectTotal } from '../redux/recipe/recipe-selector';
import Loader from '../components/ui/Loader';
import Pagination from '../components/ui/Pagination';
import { createStructuredSelector } from 'reselect';
import pagination from '../util/pagination';
import { selectCurrentPage, selectVisitedPage } from '../redux/pagination/pagination-selector';
import { addVisitedPage, setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { selectCurrentUser } from '../redux/user/user-selector';
import { selectShowSelectedIngredients } from '../redux/ingredient/ingredient-selector';
import { setShowSelectedIngredients } from '../redux/ingredient/ingredient-actions';

const recipesPagination = pagination(0);

const MyRecipes = ({ recipes, visitedPage, total, fetchRecipes, setRecipes, setVisitedPage,
    addVisitedPage, currentUser, setCurrentPage, currentPage, setShowSelectedIngredients }) => {

    recipesPagination.total = total;
    const [isLoading, setIsLoading] = useState(false);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        const getMyRecipesFirstPage = async () => {
            await fetchRecipes(0, true, currentUser._id);
        }

        setShowSelectedIngredients(false);
        setVisitedPage({});
        setCurrentPage(0);
        getMyRecipesFirstPage();

        // return () => {
        //     setRecipes([]);
        //     setVisitedPage({});
        //     setCurrentPage(0);
        // }

    }, []);


    //search in the reducer the respective items of the current page and and if they are not there search in the db
    const fetchMyRecipesByPage = async currentPageProp => {

        setCurrentPage(currentPageProp);

        if (visitedPage[currentPageProp]) {
            //set the recipes of the global state with the recipes of the page that was already visited
            setRecipes(visitedPage[currentPageProp]);
        } else {
            await setIsLoading(true);
            await fetchRecipes(currentPageProp, false, currentUser._id);
            await setIsLoading(false);
        }

    }

    useEffect(() => {
        addVisitedPage({ pageNumber: currentPage, items: recipes });
    }, [recipes]);

    return (
        <div className="my-recipes">

            <div className="my-recipes__title">
                <h2 className="heading-primary">My Recipes</h2>
            </div>

            {
                isLoading ? <Loader /> : <RecipeItems />
            }

            <Pagination paginationObj={recipesPagination} fetchItems={fetchMyRecipesByPage} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes,
    total: selectTotal,
    visitedPage: selectVisitedPage,
    currentUser: selectCurrentUser,
    currentPage: selectCurrentPage,
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal, userId) => dispatch(fetchRecipes(currentPage, getTotal, userId)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    setShowSelectedIngredients: showSelectedIngredients => dispatch(setShowSelectedIngredients(showSelectedIngredients)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);