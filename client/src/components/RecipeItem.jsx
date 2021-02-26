import Rate from './ui/Rate';

const RecipeItem = ({ recipe }) => {


    const IngredientsLi = recipe.ingredients.map(ingredient => <li>{ingredient}</li>);

    // style={`background-image:url(${recipe.image})`}
    return (
        <div className="recipe-item">

            <input type="checkbox" id={'details-checkbox_' + recipe._id} className="details-checkbox" />

            <div className="recipe-item__container recipe-item__container--front">

                <h2>{recipe.name}</h2>

                <Rate number={5} />

                <label className="recipe-item__container--button" htmlFor={'details-checkbox_' + recipe._id}>
                    Details
                </label>
            </div>

            <div className="recipe-item__container recipe-item__container--back">
                <div class="recipe-item__details">
                    <ul>
                        {IngredientsLi}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default RecipeItem;