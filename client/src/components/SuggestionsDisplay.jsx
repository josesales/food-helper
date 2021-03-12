import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HelperButton from './HelperButton';

//Id must match with the name of the collection and predeceased by '_'
const SuggestionsDisplay = ({ selectedSuggestions, onRemoveSuggestionClick }) => {

    // const [suggestions, setSuggestions] = useState(selectedSuggestions);

    const suggestionsUi = selectedSuggestions.map(suggestion => <label onClick={onRemoveSuggestionClick}>{suggestion}</label>);
    return (
        <div className="suggestion-display">
            {suggestionsUi ? suggestionsUi : ''}
        </div>
    );
}

// const mapStateToProps = createStructuredSelector({
//     recipe: selectCurrentRecipe
// });

export default SuggestionsDisplay;