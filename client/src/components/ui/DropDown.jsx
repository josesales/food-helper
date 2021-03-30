import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HelperButton from '../HelperButton';
import SuggestionsDisplay from '../SuggestionsDisplay';
import { setCurrentRecipe } from '../../redux/recipe/recipe-actions';
import { toSingular } from '../../util/string';

//Id must match with the name of the collection and predeceased by '_'
const DropDown = ({ id, collectionName, buttonName, containerClass, inputClass, children, setCurrentRecipe, ...otherProps }) => {

    // const searchContainerClass = containerClass ? containerClass : 'dropdown-container';
    // const searchInputClass = inputClass ? inputClass : 'dropdown-container__input';
    // const displaySuggestionsOrigin = searchContainerClass == 'dropdown-container' ? 'search' : 'form';

    //convert to the singular to match the document name
    const documentName = toSingular(collectionName);

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
        // if (e.target.className != searchInputClass && e.target.className != 'suggestion-container' &&
        //     e.target.className != 'suggestion-container__list' && e.target.className != 'suggestion-container__list-item') {
        //     //outside of the divs
        //     setItemsUi(null);
        // }
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

        setSelectedItems(prevItems => {
            //makes sure the an item is not added twice
            const filteredItems = prevItems.filter(item => item != itemText)
            return filteredItems.concat([itemText]);
        });

    }

    //Remove the selected suggestion from the local state
    const onRemoveItemClick = e => {
        const suggestion = e.target.attributes.suggestion.nodeValue;
        setSelectedItems(prevItems => prevItems.filter(item => item != suggestion));
    }

    //Add to the displayed suggestions
    const onAddButtonClick = e => {
        const inputText = e.target.attributes.name.nodeValue;
        if (inputText && inputText.trim()) {
            setInput(inputText);
            setSelectedItems(prevItems => {
                //makes sure the an item is not added twice
                const filteredItems = prevItems.filter(item => item != inputText)
                return filteredItems.concat([inputText])
            });
        }
    }

    //Keep the recipe reducer update according to the selected suggestions
    useEffect(() => {
        setCurrentRecipe({ [collectionName]: selectedItems });
    }, [selectedItems]);

    return (
        <React.Fragment>

            {/* <SuggestionsDisplay origin={displaySuggestionsOrigin} selectedSuggestions={selectedItems} onRemoveSuggestionClick={onRemoveItemClick} /> */}

            <div className="dropdown-container">

                <input id={id} type="text" {...otherProps} value={input} onChange={onInputChange} className="dropdown-container__select" autoComplete="off" />

                <HelperButton inputText={input} name={buttonName} onButtonClick={onAddButtonClick} />

                {children}
            </div>

            {
                ItemsUi ?
                    <div className="suggestion-container">

                        <ul className="suggestion-container__list">{ItemsUi}</ul>
                    </div> : ''
            }

        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentRecipe: () => dispatch(setCurrentRecipe()),
});

// const mapStateToProps = createStructuredSelector({
//     recipe: selectCurrentRecipe
// });

export default connect(null, mapDispatchToProps)(DropDown);