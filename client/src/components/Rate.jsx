import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setCurrentReview } from '../redux/review/review-actions';
import HTML_ENTITIES from '../util/htmlEntities';

let areStarsSet = false;
let clickedStarId = -1;

const Rate = ({ number, currentUser, setCurrentReview }) => {

    const RatesUi = [];
    const starsInitialState = [];

    //set the initial state of the starts according to the number
    for (let i = 0; i < 5; i++) {
        if (number && number > i) {
            starsInitialState.push(HTML_ENTITIES.star);
        } else {
            starsInitialState.push(HTML_ENTITIES.borderStar);
        }
    }

    const [stars, setStars] = useState(starsInitialState);

    //there should be no currentReview, areStarsSet and clickedStarId on the component when it gets mounted
    //to avoid the scenario the user gives a rate, refresh the page and the previous rate is still there
    useEffect(() => {
        setCurrentReview(null);
        areStarsSet = false;
        clickedStarId = -1;
    }, [])

    //highlight the starts when user hovers the mouse on them
    const setStarsHandler = starId => {

        setStars(prevStars => {
            return prevStars.map((star, index) => {
                //the star the user hovers on and also the previous ones should be highlighted
                if (index <= starId) {
                    return HTML_ENTITIES.star
                } else {
                    return HTML_ENTITIES.borderStar
                }
            });
        });
    }

    const onMouseDownHandler = ({ target }) => {
        let id = target.id;
        id = id.split('-');
        id = id[id.length - 1];
        areStarsSet = false;
        setStarsHandler(id);
    }

    const onClickHandler = ({ target }) => {
        let id = target.id;
        id = id.split('-');
        id = id[id.length - 1];
        areStarsSet = true;
        clickedStarId = id;
        setStarsHandler(id);

        setCurrentReview({ rate: +id + 1 });
    }

    //Make it possible a logged user to give rate the recipe
    if (currentUser) {
        for (let i = 0; i < 5; i++) {

            let Span = null;
            Span = <span onMouseOver={onMouseDownHandler} onClick={onClickHandler}
                id={"give-rate-" + i} className="give-rate" key={i}>{stars[i]}</span>;

            RatesUi.push(Span);
        }
    } else {

        if (number <= 0) {
            RatesUi.push(<span key={0} className="no-rate" >{HTML_ENTITIES.star}</span>);
        } else {

            for (let i = 0; i < number; i++) {
                RatesUi.push(<span key={i}>{HTML_ENTITIES.star}</span>);
            }
        }
    }

    return (
        <div className="rate" onMouseLeave={() => {
            setStarsHandler(clickedStarId);
        }}>
            {RatesUi}
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentReview: review => dispatch(setCurrentReview(review))
});

export default connect(null, mapDispatchToProps)(Rate);