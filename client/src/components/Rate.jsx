import React from 'react';
import HTML_ENTITIES from '../util/htmlEntities';

const Rate = ({ number }) => {

    const RatesUi = [];

    for (let i = 0; i < number; i++) {
        RatesUi.push(<span key={i}>{HTML_ENTITIES.star}</span>);
    }

    return (
        <div className="rate">
            {RatesUi}
        </div>
    );
}

export default Rate;