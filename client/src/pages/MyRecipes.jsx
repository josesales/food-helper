import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, setMyRecipes } from '../redux/recipe/recipe-actions';
import RecipeItems from '../components/RecipeItems';
import { selectMyRecipes, selectTotal } from '../redux/recipe/recipe-selector';
import Loader from '../components/ui/Loader';
import Pagination from '../components/ui/Pagination';
import { createStructuredSelector } from 'reselect';
import pagination from '../util/pagination';
import { selectCurrentPage, selectVisitedPage } from '../redux/pagination/pagination-selector';
import { addVisitedPage, setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { selectCurrentUser } from '../redux/user/user-selector';
import { setShowSelectedIngredients } from '../redux/ingredient/ingredient-actions';

const recipesPagination = pagination(0);

const MyRecipes = ({ myRecipes, visitedPage, total, fetchRecipes, setMyRecipes, setVisitedPage,
    addVisitedPage, currentUser, setCurrentPage, currentPage, setShowSelectedIngredients }) => {

    recipesPagination.total = total;
    const [isComponentMounting, setIsComponentMounting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        const getMyRecipesFirstPage = async () => {
            await setIsComponentMounting(true);
            await fetchRecipes(0, true, currentUser._id);
            await setIsComponentMounting(false);
        }

        setShowSelectedIngredients(false);
        setVisitedPage({});
        setCurrentPage(0);
        getMyRecipesFirstPage();

    }, []);


    //search in the reducer the respective items of the current page and and if they are not there search in the db
    const fetchMyRecipesByPage = async currentPageProp => {

        setCurrentPage(currentPageProp);

        if (visitedPage[currentPageProp] && visitedPage[currentPageProp].length > 0) {
            //set myRecipes of the global state with the recipes of the page that was already visited
            setMyRecipes(visitedPage[currentPageProp]);
        } else {
            await setIsLoading(true);
            await fetchRecipes(currentPageProp, false, currentUser._id);
            await setIsLoading(false);
        }

    }

    useEffect(() => {
        addVisitedPage({ pageNumber: currentPage, items: myRecipes });
    }, [myRecipes]);

    return (
        <React.Fragment>
            {
                isComponentMounting ? <Loader /> :

                    <React.Fragment>
                        <div className="my-recipes">

                            <div className="my-recipes__title">
                                <h2 className="heading-primary">My Recipes</h2>
                            </div>

                            {
                                isLoading ? <Loader /> : <RecipeItems recipes={myRecipes} />
                            }

                        </div>

                        <Pagination paginationObj={recipesPagination} fetchItems={fetchMyRecipesByPage} />
                    </React.Fragment>
            }

        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    myRecipes: selectMyRecipes,
    total: selectTotal,
    visitedPage: selectVisitedPage,
    currentUser: selectCurrentUser,
    currentPage: selectCurrentPage,
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal, userId) => dispatch(fetchRecipes(currentPage, getTotal, userId)),
    setMyRecipes: recipes => dispatch(setMyRecipes(recipes)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    setShowSelectedIngredients: showSelectedIngredients => dispatch(setShowSelectedIngredients(showSelectedIngredients)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyRecipes);