import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HelperButton from './HelperButton';
import SuggestionsDisplay from './SuggestionsDisplay';
import { setCurrentRecipe } from '../redux/recipe/recipe-actions';

//Id must match with the name of the collection and predeceased by '_'
const Search = ({ id, collectionName, buttonName, containerClass, inputClass, children, setCurrentRecipe, ...otherProps }) => {

    const searchContainerClass = containerClass ? containerClass : 'search-container';
    const searchInputClass = inputClass ? inputClass : 'search-container__input';

    //remove the s to match with the document name
    const documentName = collectionName.slice(0, -1);

    const [input, setInput] = useState('');

    const items = useSelector(state => state[documentName][collectionName]);

    const [ItemsUi, setItemsUi] = useState(null);

    const [selectedItems, setSelectedItems] = useState([]);


    useEffect(() => {
        //Add the event so the function handleOutsideSuggestionsClick can be called whenever there is a click on the mouse
        document.addEventListener("mousedown", handleOutsideSuggestionsClick);

        //Remove the event listener when the component gets unmounted
        return () => {
            document.removeEventListener("mousedown", handleOutsideSuggestionsClick);
        };
    }, []);

    const handleOutsideSuggestionsClick = e => {
        //hides the suggestions if user clicks outside of the input and the suggestion container
        if (e.target.className != searchInputClass && e.target.className != 'suggestion-container' &&
            e.target.className != 'suggestion-container__list' && e.target.className != 'suggestion-container__list-item') {
            //outside of the divs
            setItemsUi(null);
        }
    };



    const onInputChange = e => {

        const value = e.target.value;
        setInput(value);
        filterAndDisplayItems(value);
    }

    //filter the items to show suggestions that are already in the db
    const filterAndDisplayItems = value => {

        const filteredItems = items.filter(item => item.name.toUpperCase().trim().includes(value.toUpperCase().trim()));

        //show the items only when it is filtered to less than 10 so the screen doesn't get very full
        if (filteredItems.length < 10) {
            setItemsUi(filteredItems.map((item, index) =>
                <li onClick={onListItemClick} key={index}><h3 className="suggestion-container__list-item">{item.name}</h3></li>));
        } else {
            //if the items get more than 10 then it sets the ItemsUi to null again
            setItemsUi(null);
        }

        //if there is no value then it removes previous suggestions
        if (!value) {
            setItemsUi(null);
        }
    }

    const onListItemClick = e => {
        const itemText = e.target.innerText;
        setSelectedItems(prevItems => prevItems.concat([itemText]));

    }

    //Remove the selected suggestion from the local state
    const onRemoveItemClick = e => {
        const itemText = e.target.innerText;
        setSelectedItems(prevItems => prevItems.filter(item => item != itemText));
    }

    const onButtonClick = e => {
        setInput(e.target.value);
    }

    //Keep the recipe reducer update according to the selected suggestions
    useEffect(() => {
        setCurrentRecipe({ [collectionName]: selectedItems });
    }, [selectedItems]);

    return (
        <React.Fragment>

            <div className={searchContainerClass}>


                <input id={id} type="text" {...otherProps} value={input} onChange={onInputChange} className={searchInputClass} autoComplete="off" />

                <HelperButton name={buttonName} onButtonClick={onButtonClick} />

                {children}
            </div>

            {
                ItemsUi ?
                    <div className="suggestion-container">

                        <ul className="suggestion-container__list">{ItemsUi}</ul>
                    </div> : ''
            }


            <SuggestionsDisplay selectedSuggestions={selectedItems} onRemoveSuggestionClick={onRemoveItemClick} />


        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentRecipe: () => dispatch(setCurrentRecipe()),
});

// const mapStateToProps = createStructuredSelector({
//     recipe: selectCurrentRecipe
// });

export default connect(null, mapDispatchToProps)(Search);