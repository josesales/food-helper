import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, setRecipes } from '../redux/recipe/recipe-actions';
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

const MyRecipes = ({ recipes, visitedPage, total, fetchRecipes, setRecipes, setVisitedPage, addVisitedPage, currentUser }) => {

    recipesPagination.total = total;
    const [isLoading, setIsLoading] = useState(false);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        const getMyRecipesFirstPage = async () => {
            await fetchRecipes(recipesPagination.currentPage, true, currentUser._id);
        }

        getMyRecipesFirstPage();

        return () => {
            setRecipes([]);
            setVisitedPage({});
        }
    }, []);


    //search in the reducer the respective items of the current page and and if they are not there search in the db
    const fetchMyRecipesByPage = async currentPage => {

        recipesPagination.currentPage = currentPage;

        if (visitedPage[currentPage]) {
            //set the recipes of the global state with the recipes of the page that was already visited
            setRecipes(visitedPage[currentPage]);
        } else {
            await setIsLoading(true);
            await fetchRecipes(currentPage, false, currentUser._id);
            await setIsLoading(false);
        }

    }

    useEffect(() => {
        addVisitedPage({ pageNumber: recipesPagination.currentPage, items: recipes });
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
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal, userId) => dispatch(fetchRecipes(currentPage, getTotal, userId)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);