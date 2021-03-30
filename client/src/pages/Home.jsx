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

const recipesPagination = pagination(0);

const Home = ({ recipes, visitedPage, setVisitedPage, total, fetchRecipes, setRecipes, addVisitedPage }) => {

    recipesPagination.total = total;
    const [isLoading, setIsLoading] = useState(false);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        const getRecipesFirstPage = async () => {
            await fetchRecipes(recipesPagination.currentPage, true);
        }

        getRecipesFirstPage();

        return () => {
            setRecipes([]);
            setVisitedPage({});
        }
    }, []);


    //search in the reducer the respective items of the current page and and if they are not there search in the db
    const fetchRecipesByPage = async currentPage => {

        recipesPagination.currentPage = currentPage;

        if (visitedPage[currentPage]) {
            //set the recipes of the global state with the recipes of the page that was already visited
            setRecipes(visitedPage[currentPage]);
        } else {
            await setIsLoading(true);
            await fetchRecipes(currentPage);
            await setIsLoading(false);
        }

    }

    useEffect(() => {
        addVisitedPage({ pageNumber: recipesPagination.currentPage, items: recipes });
    }, [recipes]);

    return (
        <div className="home">

            {
                isLoading ? <Loader /> : <RecipeItems />
            }

            {
                recipesPagination ? <Pagination paginationObj={recipesPagination} fetchItems={fetchRecipesByPage} /> : ''
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes,
    total: selectTotal,
    visitedPage: selectVisitedPage
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal) => dispatch(fetchRecipes(currentPage, getTotal)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);