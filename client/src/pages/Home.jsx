import React from "react";
import { useSelector } from "react-redux";
import Recipes from "../components/Recipes";
import Search from "../components/Search";
import HTML_ENTITIES from "../util/htmlEntities";
import DisplayMessage from "../components/ui/DisplayMessage";

const Home = () => {
  const { type, message } = useSelector((state) => state.message);

  return (
    <div className="home">
      {type && message ? (
        <DisplayMessage type={type} message={message} />
      ) : null}
      <div
        title="Search Recipes by Ingredients"
        className="home__search-container"
      >
        <Search
          id="header-container_ingredients"
          placeholder={"Write an Ingredient"}
          buttonName={HTML_ENTITIES.add}
          collectionName="ingredients"
        />
      </div>
      <Recipes />
    </div>
  );
};

export default Home;
