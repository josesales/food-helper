import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HTML_ENTITIES from '../util/htmlEntities';
import HelperButton from './HelperButton';

//Id must match with the name of the collection and predeceased by '_'
const SuggestionsDisplay = ({ origin, selectedSuggestions, onRemoveSuggestionClick }) => {

    const container = `suggestion-display-${origin}`;

    const suggestionsUi = selectedSuggestions.map((suggestion, index) =>

        <div key={index} className={container + "__item"}>
            <label className={container + "__item--text"} name={suggestion.name} suggestionId={suggestion._id}
                onClick={onRemoveSuggestionClick}>
                {suggestion.name}
            </label>
            <label className={container + "__item--remove"} name={suggestion.name} suggestionId={suggestion._id}
                onClick={onRemoveSuggestionClick}>
                {HTML_ENTITIES.remove}
            </label>
        </div>
    );
    return (
        <React.Fragment>

            {suggestionsUi ?
                <div className={container}>
                    {suggestionsUi}
                </div> : ''
            }
        </React.Fragment>
    );
}

{/* <div className="suggestion-display">
            {suggestionsUi ? suggestionsUi : ''}
        </div> */}
export default SuggestionsDisplay;