import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HelperButton from "../HelperButton";
import { setCurrentRecipe } from "../../redux/recipe/recipe-actions";
import { toSingular } from "../../util/string";

//Id must match with the name of the collection and predeceased by '_'
const DropDown = ({
  id,
  collectionName,
  buttonName,
  containerClass,
  inputClass,
  children,
  ...otherProps
}) => {
  //convert to the singular to match the document name
  const documentName = toSingular(collectionName);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const items = useSelector((state) => state[documentName][collectionName]);

  const [ItemsUi, setItemsUi] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);

  const onInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    filterAndDisplayItems(value);
  };

  //filter the items to show suggestions that are already in the db
  const filterAndDisplayItems = (value) => {
    const filteredItems = items.filter((item) =>
      item.name.toUpperCase().trim().includes(value.toUpperCase().trim())
    );

    //show the items only when it is filtered to less than 10 so the screen doesn't get very full
    if (filteredItems.length < 10) {
      setItemsUi(
        filteredItems.map((item, index) => (
          <li onClick={onListItemClick} key={index}>
            <h3 className="suggestion-container__list-item">{item.name}</h3>
          </li>
        ))
      );
    } else {
      //if the items get more than 10 then it sets the ItemsUi to null again
      setItemsUi(null);
    }

    //if there is no value then it removes previous suggestions
    if (!value) {
      setItemsUi(null);
    }
  };

  const onListItemClick = (e) => {
    const itemText = e.target.innerText;

    setSelectedItems((prevItems) => {
      //makes sure the an item is not added twice
      const filteredItems = prevItems.filter((item) => item != itemText);
      return filteredItems.concat([itemText]);
    });
  };

  //Add to the displayed suggestions
  const onAddButtonClick = (e) => {
    const inputText = e.target.attributes.name.nodeValue;
    if (inputText && inputText.trim()) {
      setInput(inputText);
      setSelectedItems((prevItems) => {
        //makes sure the an item is not added twice
        const filteredItems = prevItems.filter((item) => item != inputText);
        return filteredItems.concat([inputText]);
      });
    }
  };

  //Keep the recipe reducer update according to the selected suggestions
  useEffect(() => {
    dispatch(setCurrentRecipe({ [collectionName]: selectedItems }));
  }, [selectedItems]);

  return (
    <React.Fragment>
      <div className="dropdown-container">
        <input
          id={id}
          type="text"
          {...otherProps}
          value={input}
          onChange={onInputChange}
          className="dropdown-container__select"
          autoComplete="off"
        />

        <HelperButton
          inputText={input}
          name={buttonName}
          onButtonClick={onAddButtonClick}
        />

        {children}
      </div>

      {ItemsUi ? (
        <div className="suggestion-container">
          <ul className="suggestion-container__list">{ItemsUi}</ul>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default DropDown;
