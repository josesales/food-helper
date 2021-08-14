import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchRecipes, fetchRecipesByIngredients, setPersistRecipe, setRecipes } from '../redux/recipe/recipe-actions';
import RecipeItems from '../components/RecipeItems';
import { selectPersistRecipe, selectRecipes, selectTotal } from '../redux/recipe/recipe-selector';
import Loader from '../components/ui/Loader';
import Pagination from '../components/ui/Pagination';
import { createStructuredSelector } from 'reselect';
import pagination from '../util/pagination';
import { selectCurrentPage, selectVisitedPage } from '../redux/pagination/pagination-selector';
import { addVisitedPage, setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { fetchIngredients, setShowSelectedIngredients } from '../redux/ingredient/ingredient-actions';
import ToggleSwitch from '../components/ToggleSwitch';
import { toggleIsActive } from '../redux/filter/filter-actions';

export const recipesPagination = pagination(0);

let isSearchActive = false;

const Home = ({ recipes, visitedPage, setVisitedPage, total, fetchRecipes, fetchIngredients,
    setRecipes, addVisitedPage, persistRecipe, fetchRecipesByIngredients, setShowSelectedIngredients,
    setCurrentPage, currentPage }) => {

    const [isComponentMounting, setIsComponentMounting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    recipesPagination.total = total;

    const ingredients = useSelector(state => state.ingredient.ingredients);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        const getRecipesFirstPage = async () => {
            await setIsComponentMounting(true);
            await fetchRecipes(0, true);
            await setIsComponentMounting(false);
        }

        setShowSelectedIngredients(false);
        setVisitedPage({});
        setCurrentPage(0);

        getRecipesFirstPage();
        setShowSelectedIngredients(true);
        if (!ingredients || ingredients.length == 0) {
            fetchIngredients();
        }

        //set global store props below to their respective initial state when component umount 
        return () => {
            setShowSelectedIngredients(false);
        }
    }, []);


    //search in the reducer the respective items of the current page and and if they are not there search in the db
    const fetchRecipesByPage = async currentPageProp => {

        setCurrentPage(currentPageProp);
        if (visitedPage[currentPageProp] && visitedPage[currentPageProp].length > 0) {
            //set the recipes of the global state with the recipes of the page that was already visited
            setRecipes(visitedPage[currentPageProp]);
        } else {
            await setIsLoading(true);

            if (isSearchActive) {
                await fetchRecipesByIngredients(persistRecipe.ingredients, currentPageProp, true);
            } else {
                await fetchRecipes(currentPageProp);
            }
            await setIsLoading(false);
        }

    }

    useEffect(() => {
        addVisitedPage({ pageNumber: currentPage, items: recipes });
    }, [recipes]);

    //Search for recipes according to the filtered ingredients in the search component from the header
    useEffect(() => {
        const fetchRecipesByPage = async () => {

            setCurrentPage(0);

            if (persistRecipe && persistRecipe.ingredients && persistRecipe.ingredients.length > 0) {

                isSearchActive = true;
                fetchRecipesByIngredients(persistRecipe.ingredients, 0, true);
            } else {

                isSearchActive = false;
                fetchRecipes(0, true);
            }

            setVisitedPage({});
        }

        fetchRecipesByPage();

    }, [persistRecipe]);

    return (
        <React.Fragment>
            {
                isComponentMounting ? <Loader /> :
                    <React.Fragment>

                        <div className="home">

                            <div className="home__hidden-title">
                                <h2 className="heading-primary">Home</h2>
                            </div>

                            {
                                isLoading ? <Loader /> : <RecipeItems recipes={recipes} />
                            }
                        </div>

                        <Pagination paginationObj={recipesPagination} fetchItems={fetchRecipesByPage} />
                    </React.Fragment>
            }
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes,
    visitedPage: selectVisitedPage,
    persistRecipe: selectPersistRecipe,
    total: selectTotal,
    currentPage: selectCurrentPage,
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal) => dispatch(fetchRecipes(currentPage, getTotal)),
    fetchIngredients: () => dispatch(fetchIngredients()),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    fetchRecipesByIngredients: (ingredients, currentPage, getTotal) =>
        dispatch(fetchRecipesByIngredients(ingredients, currentPage, getTotal)),
    setShowSelectedIngredients: showSelectedIngredients => dispatch(setShowSelectedIngredients(showSelectedIngredients)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);