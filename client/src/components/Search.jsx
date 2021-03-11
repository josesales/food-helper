import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HelperButton from './HelperButton';

//Id must match with the name of the collection and predeceased by '_'
const Search = ({ id, collectionName, buttonName, containerClass, inputClass, children, ...otherProps }) => {

    const searchContainerClass = containerClass ? containerClass : 'search-container';
    const searchInputClass = inputClass ? inputClass : 'search-container__input';

    //remove the s to match with the document name
    const documentName = collectionName.slice(0, -1);

    const [input, setInput] = useState('');

    const items = useSelector(state => state[documentName][collectionName]);

    const [ItemsUi, setItemsUi] = useState(null);

    const onInputChange = e => {

        const value = e.target.value;
        setInput(value);
        filterAndDisplayItems(value);
    }

    //filter the items to show suggestions that are already in the db
    const filterAndDisplayItems = value => {

        const filteredItems = items.filter(item => item.name.toUpperCase().includes(value.toUpperCase()));

        //show the items only when it is filtered to less than 10 so the screen doesn't get very full
        if (filteredItems.length < 10) {
            setItemsUi(filteredItems.map((item, index) => <li onClick={onListItemClick} key={index}><h3>{item.name}</h3></li>));
        } else {
            //if the items get more than 10 then it sets the ItemsUi to null again
            setItemsUi(null);
        }

        //if there is no value then it removes previous suggestions
        if (!value) {
            setItemsUi(null);
        }
    }

    const onListItemClick = () => {
        console.log('testing')
    }

    const onButtonClick = e => {
        setInput(e.target.value);
    }

    return (
        <div className={searchContainerClass}>


            <input id={id} type="text" {...otherProps} value={input} onChange={onInputChange} className={searchInputClass} autoComplete="off" />

            <HelperButton name={buttonName} onButtonClick={onButtonClick} />

            {children}

            <div className="suggestion-container">

                <ul className="suggestion-container__list">
                    {ItemsUi ? ItemsUi : ''}
                </ul>

            </div>
        </div>
    );
}

// const mapStateToProps = createStructuredSelector({
//     recipe: selectCurrentRecipe
// });

export default Search;