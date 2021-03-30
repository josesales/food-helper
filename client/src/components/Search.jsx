import React, { useEffect, useRef, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HelperButton from './HelperButton';
import SuggestionsDisplay from './SuggestionsDisplay';
import { setPersistRecipe } from '../redux/recipe/recipe-actions';
import { toSingular } from '../util/string';

//Id must match with the name of the collection and predeceased by '_'
const Search = ({ id, collectionName, buttonName, containerClass, inputClass, children, setPersistRecipe, isSelect, ...otherProps }) => {

    const searchContainerClass = containerClass ? containerClass : 'search-container';
    const searchInputClass = inputClass ? inputClass : 'search-container__input';
    const displaySuggestionsOrigin = searchContainerClass == 'search-container' ? 'search' : 'form';

    //convert to the singular to match the document name
    const documentName = toSingular(collectionName);

    const [input, setInput] = useState('');

    const items = useSelector(state => state[documentName][collectionName]);

    const [ItemsUi, setItemsUi] = useState(null);

    //for the search (ingredients, materials...)
    const [selectedItems, setSelectedItems] = useState([]);

    //for the dropdown(categories, dietType...)
    const [selectedItem, setSelectedItem] = useState(
        {
            _id: '',
            name: ''
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

    const handleOutsideSuggestionsClick = e => {
        //hides the suggestions if user clicks outside of the input and the suggestion container
        if (e.target.className != searchInputClass && e.target.className != 'suggestion-container' &&
            e.target.className != 'suggestion-container__list' && e.target.className != 'suggestion-container__list-item') {
            //outside of the divs
            setItemsUi(null);
        }
    };


    //for the search 
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
            setItemsUi(filteredItems.map((item) =>
                <li key={item._id}><h3 onClick={onListItemClick} itemId={item._id} className="suggestion-container__list-item">{item.name}</h3></li>));
        } else {
            //if the items get more than 10 then it sets the ItemsUi to null again
            setItemsUi(null);
        }

        //if there is no value then it removes previous suggestions
        if (!value) {
            setItemsUi(null);
        }
    }

    //for the search
    const onListItemClick = e => {

        const itemName = e.target.innerText;
        const itemId = e.target.attributes.itemId.value;

        setSelectedItems(prevItems => {
            //makes sure the an item is not added twice
            const filteredItems = prevItems.filter(item => item.name != itemName)
            return filteredItems.concat([{ _id: itemId, name: itemName }]);
        });
    }

    //for the dropdown
    const onListItemDropDownClick = e => {

        const itemName = e.target.innerText;
        const itemId = e.target.attributes.itemId.value;

        setSelectedItem({ _id: itemId, name: itemName });
        setItemsUi(null);
    }

    //Remove the selected suggestion from the local state
    const onRemoveItemClick = e => {

        if (e.target.attributes.suggestionId) {
            const suggestionId = e.target.attributes.suggestionId.nodeValue;
            setSelectedItems(prevItems => prevItems.filter(item => item._id != suggestionId));
        } else {
            const suggestionName = e.target.attributes.name.nodeValue;
            setSelectedItems(prevItems => prevItems.filter(item => item.name != suggestionName));
        }

    }

    //Add to the displayed suggestions
    const onAddButtonClick = e => {
        const inputText = e.target.attributes.name.nodeValue;
        if (inputText && inputText.trim()) {
            setInput(inputText);
            setSelectedItems(prevItems => {
                //makes sure the an item is not added twice
                const filteredItems = prevItems.filter(item => item.name != inputText)
                return filteredItems.concat([{ name: inputText }])
            });
        }
    }

    //for the dropdown
    const onSelectClick = e => {
        const value = e.target.value;
        setItemsUi(items.map((item, index) =>
            <li key={index}><h3 onClick={onListItemDropDownClick} itemId={item._id} className="suggestion-container__list-item">{item.name}</h3></li>));
    }

    //Keep the recipe reducer update according to the selected suggestions of materials and ingredients
    useEffect(() => {
        setPersistRecipe({ [collectionName]: selectedItems });
    }, [selectedItems]);

    //Keep the recipe reducer update according to the selected suggestions of category and diet type
    useEffect(() => {
        setPersistRecipe({ [documentName]: selectedItem });
    }, [selectedItem]);

    return (
        <React.Fragment>

            <SuggestionsDisplay origin={displaySuggestionsOrigin} selectedSuggestions={selectedItems} onRemoveSuggestionClick={onRemoveItemClick} />

            <div className={searchContainerClass}>
                {
                    isSelect ?
                        <input id={id} type="text" {...otherProps} value={selectedItem.name} onClick={onSelectClick}
                            className={searchInputClass + ' select'} readOnly autoComplete="off" /> :

                        <input id={id} type="text" {...otherProps} value={input} onChange={onInputChange}
                            className={searchInputClass} autoComplete="off" />
                }
                {
                    isSelect ?
                        <HelperButton inputText={input} name={buttonName} onButtonClick={onSelectClick} isSelect={true} /> :

                        <HelperButton inputText={input} name={buttonName} onButtonClick={onAddButtonClick} />
                }

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
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
});

export default connect(null, mapDispatchToProps)(Search);