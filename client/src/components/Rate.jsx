import React from 'react';
import HTML_ENTITIES from '../util/htmlEntities';

const Rate = ({ number }) => {

    const RatesUi = [];

    if (number <= 0) {
        RatesUi.push(<span key={0} className="no__rate" >{HTML_ENTITIES.star}</span>);
    } else {

        for (let i = 0; i < number; i++) {
            RatesUi.push(<span key={i}>{HTML_ENTITIES.star}</span>);
        }
    }


    return (
        <div className="rate">
            {RatesUi}
        </div>
    );
}

export default Rate;