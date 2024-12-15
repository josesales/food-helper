import React from "react";
import RecipeItem from "./RecipeItem";

const RecipeItems = ({ recipes }) => {
  return (
    <div className="recipe-items">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeItems;
