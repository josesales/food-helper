import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../components/ImageUpload";
import EditSteps from "../components/EditSteps";
import Search from "../components/Search";
import InputField from "../components/ui/InputField";
import {
  selectPersistRecipe,
  selectImage,
} from "../redux/recipe/recipe-selector";
import HTML_ENTITIES from "../util/htmlEntities";
import TextArea from "../components/ui/TextArea";
import { fetchIngredients } from "../redux/ingredient/ingredient-actions";
import { fetchMaterials } from "../redux/material/material-actions";
import { fetchCategories } from "../redux/category/category-actions";
import { fetchDietTypes } from "../redux/diet-type/diet-type-actions";
import { postPatch, upload } from "../util/request-sender";
import { selectCurrentUser, selectToken } from "../redux/user/user-selector";
import { useLocation } from "react-router";
import { setImage } from "../redux/recipe/recipe-actions";
import { setCurrentUser } from "../redux/user/user-actions";
import { displayMessage } from "../redux/message/message-actions";
import DisplayMessage from "../components/ui/DisplayMessage";
import { useHistory } from "react-router-dom";

let shouldPersistIngredient = true;
let localImage = null;

const AddEditRecipe = () => {
  const persistRecipe = useSelector(selectPersistRecipe);
  const image = useSelector(selectImage);
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  let recipeDb =
    location &&
    location.state &&
    location.state.recipe &&
    location.state.recipe._id
      ? location.state.recipe
      : null;

  const { type, message } = useSelector((state) => state.message);

  if (recipeDb) {
    recipeDb = Object.assign({}, recipeDb);
  }

  //set image in case user is editing an existing recipe
  let imageDb = null;
  if (recipeDb && recipeDb.image) {
    imageDb = recipeDb.image;
  }

  const [recipe, setRecipe] = useState(
    recipeDb
      ? recipeDb
      : {
          name: "",
          videoUrl: "",
          steps: [],
          preparationTime: "",
          peoplePerServing: "",
          calories: "",
        }
  );

  //Recipe
  const onRecipeChange = (e) => {
    setRecipe({ ...recipe, [e.target.id]: e.target.value });
  };

  // New Step
  const [newStep, setNewStep] = useState("");

  const onAddNewStepClick = async () => {
    await setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.concat([newStep]),
    }));
    setNewStep("");
  };

  const onNewStepChange = (e) => {
    setNewStep(e.target.value);
  };

  //Step List
  const onStepsChange = async (e) => {
    const id = +e.target.id;
    const text = e.target.value;

    await setRecipe((recipe) => {
      recipe.steps[id] = text;
      return { ...recipe };
    });
  };

  const onDeleteStepClick = async (e) => {
    const id = +e.target.id;

    //Remove the selected element by its index
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      steps: prevRecipe.steps.filter((step, index) => index != id),
    }));
  };

  const onSaveRecipeClick = async () => {
    try {
      //In case user is editing a recipe the image will be already loaded by default
      //so the user does not need necessarily to choose a new one
      if ((!image || !image.type) && !recipeDb) {
        throw new Error("Image is mandatory");
      }

      const savedRecipe = await postPatch("/recipes", "POST", recipe, token);

      if (image) {
        await upload("/recipeImage", image, savedRecipe._id, token);
      }

      //clone the recipe to assign the image and avoid the Entity is too large error
      const recipeWithImage = Object.assign({}, recipe);
      recipeWithImage.image = imageDb;

      if (savedRecipe.videoUrl) {
        //set videoUrl with embedded url
        recipeWithImage.videoUrl = savedRecipe.videoUrl;
      }

      if (currentUser.recipes && currentUser.recipes.length > 0) {
        //update currentUser state with the changes in the recipe
        const userRecipes = currentUser.recipes.map((userRecipe) => {
          if (userRecipe._id === recipeWithImage._id) {
            if (image) {
              // set chosen image if there is one
              recipeWithImage.image = localImage;
            } else {
              // set current image from the db in case user does not choose a new one
              // recipeWithImage.image = imageDb;
            }
            return recipeWithImage;
          } else {
            return userRecipe;
          }
        });

        if (recipeWithImage._id) {
          //Update current user state with updated recipe
          dispatch(setCurrentUser({ ...currentUser, recipes: userRecipes }));
        } else {
          //Update current user state with new recipe
          recipeWithImage.image = localImage;
          let newUserRecipe = Object.assign({}, savedRecipe);
          newUserRecipe = Object.assign(newUserRecipe, recipeWithImage);

          if (userRecipes && userRecipes.length > 0) {
            //concat current recipes of the user with new one
            dispatch(
              setCurrentUser({
                ...currentUser,
                recipes: [].concat(userRecipes).concat([newUserRecipe]),
              })
            );
          } else {
            //in case it's the first recipe user created
            dispatch(
              setCurrentUser({
                ...currentUser,
                recipes: [].concat([newUserRecipe]),
              })
            );
          }
        }
      } else {
        dispatch(
          setCurrentUser({
            ...currentUser,
            recipes: [].concat(recipeWithImage),
          })
        );
      }

      window.scrollTo(0, 0);
      dispatch(
        displayMessage({
          type: "success",
          message: "Your Recipe has been saved.",
        })
      );
      history.push("/");
    } catch (error) {
      console.log("Error while saving the recipe: " + error.message);
      window.scrollTo(0, 0);
      dispatch(displayMessage({ type: "error", message: error.message }));
    }
  };

  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const materials = useSelector((state) => state.material.materials);
  const categories = useSelector((state) => state.category.categories);
  const dietTypes = useSelector((state) => state.dietType.dietTypes);

  // Get the collections for the search component
  useEffect(() => {
    shouldPersistIngredient = false;

    //check if the collection are already in the reducer so it doesn't go to the db every time the user access this page
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }

    if (materials.length === 0) {
      dispatch(fetchMaterials());
    }

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }

    if (dietTypes.length === 0) {
      dispatch(fetchDietTypes());
    }

    dispatch(setImage(null));
  }, []);

  //Keep recipe useState in sync with persistRecipe to get ingredients, materials...
  useEffect(() => {
    //use this flag once the ingredients don't get set to empty by the search in the header which sets the ingredients
    //on the persist recipe to empty during the first render of the AddEditRecipe page
    if (shouldPersistIngredient || !persistRecipe.ingredients) {
      setRecipe({ ...recipe, ...persistRecipe });
    } else {
      shouldPersistIngredient = true;
    }
  }, [persistRecipe]);

  useEffect(() => {
    localImage = image;
  }, [image]);

  return (
    <React.Fragment>
      {type && message ? (
        <DisplayMessage type={type} message={message} />
      ) : null}

      <div className="recipe-form">
        <div className="recipe-form__title title-margin">
          <h2 className="heading-primary">
            {recipe.name ? recipe.name : "New Recipe"}
          </h2>
        </div>

        <div className="center">
          <div className="container">
            <InputField>
              <input
                type="text"
                id="name"
                className="input-margin"
                placeholder="Name"
                required
                value={recipe.name}
                onChange={onRecipeChange}
                autoComplete="off"
              />
            </InputField>

            <InputField>
              <Search
                id="recipe-form_ingredients"
                placeholder={"Ingredients"}
                buttonName={HTML_ENTITIES.add}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                collectionName="ingredients"
                collectionDb={
                  recipeDb && recipeDb.ingredients ? recipeDb.ingredients : null
                }
              >
                <label
                  htmlFor="recipe-form_ingredients"
                  className="field__label"
                >
                  Ingredients
                </label>
              </Search>
            </InputField>

            <InputField>
              <Search
                id="recipe-form_materials"
                placeholder={"Materials"}
                buttonName={HTML_ENTITIES.add}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                collectionName="materials"
                collectionDb={
                  recipeDb && recipeDb.materials ? recipeDb.materials : null
                }
              >
                <label htmlFor="recipe-form_materials" className="field__label">
                  Materials
                </label>
              </Search>
            </InputField>

            <InputField>
              <input
                type="text"
                id="videoUrl"
                placeholder="Youtube Video Url"
                required
                value={recipe.videoUrl}
                onChange={onRecipeChange}
                className="input-margin"
                autoComplete="off"
              />
            </InputField>
          </div>

          <div className="image-container">
            <h2 className="heading-secondary text">Picture</h2>
            <ImageUpload image={imageDb ? imageDb : null} />
          </div>
        </div>

        <div className="center">
          <div className="container-2">
            <InputField>
              <Search
                isSelect={true}
                id="recipe-form_categories"
                placeholder={"Category"}
                buttonName={HTML_ENTITIES.search}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                collectionName="categories"
                documentDb={
                  recipeDb && recipeDb.category ? recipeDb.category : null
                }
              >
                <label
                  htmlFor="recipe-form_categories"
                  className="field__label"
                >
                  Category
                </label>
              </Search>
            </InputField>

            <InputField>
              <Search
                isSelect={true}
                id="recipe-form_diet-type"
                placeholder={"Diet Type"}
                buttonName={HTML_ENTITIES.search}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                collectionName="dietTypes"
                documentDb={
                  recipeDb && recipeDb.dietType ? recipeDb.dietType : null
                }
              >
                <label htmlFor="recipe-form_diet-type" className="field__label">
                  Diet Type
                </label>
              </Search>
            </InputField>

            <InputField>
              <input
                type="text"
                id="preparationTime"
                placeholder="Preparation Time"
                className="input-margin"
                required
                value={recipe.preparationTime}
                onChange={onRecipeChange}
                autoComplete="off"
              />
            </InputField>
          </div>

          <div className="container-3">
            <InputField>
              <input
                type="number"
                min="1"
                id="peoplePerServing"
                placeholder="People per Serving"
                value={recipe.peoplePerServing}
                onChange={onRecipeChange}
                className="input-margin"
                autoComplete="off"
              />
            </InputField>

            <InputField>
              <input
                type="number"
                min="1"
                id="calories"
                placeholder="Calories"
                value={recipe.calories}
                onChange={onRecipeChange}
                className="input-margin"
                autoComplete="off"
              />
            </InputField>
          </div>
        </div>

        <div className="center">
          <div className="step-container">
            <div className="step-container__text-area">
              <TextArea
                id="new-step"
                placeholder="New Step"
                value={newStep}
                onChange={onNewStepChange}
              />
            </div>
            <button
              className="step-container__button"
              onClick={onAddNewStepClick}
            >
              Add Step
            </button>
          </div>
        </div>

        <EditSteps
          steps={recipe.steps}
          onChange={onStepsChange}
          onDelete={onDeleteStepClick}
        />

        <div className="center">
          <div className="save-button-container input-margin">
            <button onClick={onSaveRecipeClick}>Save Recipe</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddEditRecipe;
