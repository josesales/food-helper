import React from 'react';
import HTML_ENTITIES from '../../util/htmlEntities';

const Rate = ({ number }) => {

    const SpanArray = [];

    for (let i = 0; i < number; i++) {
        SpanArray.push(<span>{HTML_ENTITIES.star}</span>);
    }

    return (
        <div className="rate">
            {SpanArray}
        </div>
    );
}

export default Rate;