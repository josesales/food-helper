import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentRecipe } from "../redux/recipe/recipe-selector";

const RecipeSteps = () => {
  const { steps = {} } = useSelector(selectCurrentRecipe);

  const StepsUi = steps.map((step, index) => (
    <li key={index}>
      <p className="paragraph">{index + 1 + ". " + step}</p>
    </li>
  ));

  return (
    <div title="Steps for Preparation" className="recipe-steps">
      <ul className="recipe-steps__list" type="1">
        {StepsUi}
      </ul>
    </div>
  );
};

export default RecipeSteps;
