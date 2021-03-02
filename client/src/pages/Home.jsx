import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../redux/recipe/recipe-actions';
import RecipeItems from '../components/RecipeItems';

const Home = ({ fetchRecipes }) => {

    //Fetch recipes like componentDidMount style
    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="home">
            <RecipeItems />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchRecipes: () => dispatch(fetchRecipes())
})

export default connect(null, mapDispatchToProps)(Home);