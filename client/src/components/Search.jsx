import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HelperButton from "./HelperButton";
import SuggestionsDisplay from "./SuggestionsDisplay";
import { setPersistRecipe } from "../redux/recipe/recipe-actions";
import { toSingular } from "../util/string";
import { selectShowSelectedIngredients } from "../redux/ingredient/ingredient-selector";

//Id must match with the name of the collection and predeceased by '_'
const Search = ({
  id,
  documentName,
  collectionName,
  buttonName,
  containerClass,
  inputClass,
  children,
  isSelect,
  onChangeCallback,
  collectionDb,
  documentDb,
  ...otherProps
}) => {
  const showSelectedIngredients = useSelector(selectShowSelectedIngredients);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const searchContainerClass = containerClass
    ? containerClass
    : "search-container";
  const searchInputClass = inputClass ? inputClass : "search-container__input";
  const displaySuggestionsOrigin =
    searchContainerClass == "search-container" ? "search" : "form";

  //if documentName is not passed then it converts the collectionName to the singular
  const documentNameTemp =
    !documentName || !documentName.trim()
      ? toSingular(collectionName)
      : documentName;

  const [input, setInput] = useState("");

  const items = useSelector((state) => state[documentNameTemp][collectionName]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [displaySuggestionItems, setDisplaySuggestionItems] = useState(false);
  const [highlightedItemIndex, setHighlightedItemIndex] = useState(-1);

  //for the search (ingredients, materials...)
  const [selectedItems, setSelectedItems] = useState(
    collectionDb && collectionDb.length > 0 ? collectionDb : []
  );

  //for the dropdown(categories, dietType...)
  const [selectedItem, setSelectedItem] = useState(
    documentDb && documentDb._id
      ? documentDb
      : {
          _id: "",
          name: "",
        }
  );

  useEffect(() => {
    //Add the event so the function handleOutsideSuggestionsClick can be called whenever there is a click on the mouse
    document.addEventListener("mousedown", handleOutsideSuggestionsClick);

    //Remove the event listener when the component gets unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideSuggestionsClick);
    };
  }, []);

  const handleOutsideSuggestionsClick = (e) => {
    //hides the suggestions if user clicks outside of the input and the suggestion container
    if (
      e.target.className !== searchInputClass &&
      e.target.className !== "suggestion-container" &&
      e.target.className !== "suggestion-container__list" &&
      e.target.className !== "suggestion-container__list-item"
    ) {
      //outside of the divs
      setDisplaySuggestionItems(false);
    }
  };

  //for the search
  const onInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    filterAndDisplayItems(value);

    if (onChangeCallback) {
      onChangeCallback();
    }
  };

  //filter the items to show suggestions that are already in the db
  const filterAndDisplayItems = (value) => {
    const updatedFilteredItems = items.filter((item) =>
      item.name.toUpperCase().trim().includes(value.toUpperCase().trim())
    );

    //show the items only when it is filtered to less than 10 so the screen doesn't get very full
    if (updatedFilteredItems.length < 10) {
      setFilteredItems(updatedFilteredItems);
      setDisplaySuggestionItems(true);
    } else {
      //if the items get more than 10 then it sets the ItemsUi to null again
      setDisplaySuggestionItems(false);
    }

    //if there is no value then it removes previous suggestions
    if (!value) {
      setDisplaySuggestionItems(false);
    }
  };

  //for the search
  const onListItemClick = (e) => {
    const itemName = e.target.innerText;
    const itemId = e.target.attributes.itemId.value;

    setSelectedItems((prevItems) => {
      //makes sure the an item is not added twice
      const filteredItems = prevItems.filter((item) => item.name !== itemName);
      return filteredItems.concat([{ _id: itemId, name: itemName }]);
    });
    setDisplaySuggestionItems(false);
    inputRef.current.focus();
  };

  //for the dropdown
  const onListItemDropDownClick = (e) => {
    const itemName = e.target.innerText;
    const itemId = e.target.attributes.itemId.value;

    setSelectedItem({ _id: itemId, name: itemName });
    setDisplaySuggestionItems(false);
  };

  //Remove the selected suggestion from the local state
  const onRemoveItemClick = (e) => {
    if (e.target.attributes.suggestionId) {
      const suggestionId = e.target.attributes.suggestionId.nodeValue;
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item._id !== suggestionId)
      );
    } else {
      const suggestionName = e.target.attributes.name.nodeValue;
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item.name !== suggestionName)
      );
    }
  };

  //Add to the displayed suggestions
  const onAddButtonClick = (e) => {
    const inputText = e.target.defaultValue
      ? e.target.defaultValue
      : e.target.attributes.name.nodeValue;
    if (inputText && inputText.trim()) {
      setInput(inputText);
      setSelectedItems((prevItems) => {
        //makes sure the an item is not added twice
        const filteredItems = prevItems.filter(
          (item) => item.name !== inputText
        );
        return filteredItems.concat([{ name: inputText }]);
      });
    }
  };

  //for the dropdown
  const onSelectClick = (e) => {
    setDisplaySuggestionItems(true);
  };

  //Keep the recipe reducer update according to the selected suggestions of materials and ingredients
  useEffect(() => {
    dispatch(setPersistRecipe({ [collectionName]: selectedItems }));
    setInput("");
  }, [selectedItems]);

  //Keep the recipe reducer update according to the selected suggestions of category and diet type
  useEffect(() => {
    dispatch(setPersistRecipe({ [documentNameTemp]: selectedItem }));
  }, [selectedItem]);

  useEffect(() => {
    if (!showSelectedIngredients && !collectionDb) {
      setSelectedItems([]);
    }
  }, [showSelectedIngredients]);

  const onSearchKeydown = (e) => {
    if (displaySuggestionItems && filteredItems?.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          setHighlightedItemIndex((prevIndex) =>
            prevIndex < filteredItems.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "ArrowUp":
          setHighlightedItemIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredItems.length - 1
          );
          break;
        case "Enter":
          if (
            highlightedItemIndex >= 0 &&
            highlightedItemIndex < filteredItems.length
          ) {
            const highlightedItem = filteredItems[highlightedItemIndex];

            setSelectedItems((prevItems) => {
              return prevItems.concat([
                { _id: highlightedItem._id, name: highlightedItem.name },
              ]);
            });
            setFilteredItems([]);
            setHighlightedItemIndex(-1);
            setDisplaySuggestionItems(false);
            inputRef.current.focus();
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <React.Fragment>
      <SuggestionsDisplay
        origin={displaySuggestionsOrigin}
        selectedSuggestions={selectedItems}
        onRemoveSuggestionClick={onRemoveItemClick}
      />

      <div className={searchContainerClass}>
        {isSelect ? (
          <>
            <input
              id={id}
              type="text"
              {...otherProps}
              value={selectedItem.name}
              onClick={onSelectClick}
              className={searchInputClass + " select"}
              readOnly
              autoComplete="off"
            />
            <HelperButton
              inputText={input}
              name={buttonName}
              onButtonClick={onSelectClick}
              isSelect={true}
            />
          </>
        ) : (
          <>
            <input
              id={id}
              type="text"
              ref={inputRef}
              {...otherProps}
              value={input}
              onChange={onInputChange}
              onKeyDown={onSearchKeydown}
              className={searchInputClass}
              autoComplete="off"
            />
            <HelperButton
              inputText={input}
              name={buttonName}
              onButtonClick={onAddButtonClick}
            />
          </>
        )}
        {children}
      </div>

      {displaySuggestionItems ? (
        <div className="suggestion-container">
          <ul className="suggestion-container__list">
            {isSelect
              ? items.map((item, index) => (
                  <li key={index}>
                    <h3
                      onClick={onListItemDropDownClick}
                      itemId={item._id}
                      className="suggestion-container__list-item"
                    >
                      {item.name}
                    </h3>
                  </li>
                ))
              : filteredItems.map((item, index) => (
                  <li key={item._id}>
                    <h3
                      onClick={onListItemClick}
                      itemId={item._id}
                      className={`suggestion-container__list-item${
                        index === highlightedItemIndex ? "--selected" : ""
                      }`}
                    >
                      {item.name}
                    </h3>
                  </li>
                ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Search;
