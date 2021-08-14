import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTimeout } from 'timers';
import { displayMessage } from '../../redux/message/message-actions';

const DisplayMessage = ({ type, message, displayMessage }) => {

    const [onDisplay, setOnDisplay] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            displayMessage({ type: null, message: null });
            setOnDisplay(false);
        }, 5000)
    }, []);


        return (
            <React.Fragment>
                {
                    onDisplay ?
                        <div role="alert" className="display-message">
                            <div className={`display-message__${type}`}>
                                <h2 className="display-message__type">{`${type}!`}</h2>
                                <h2>{message}</h2>
                            </div>
                        </div>
                        : null

                }
            </React.Fragment>
        );
}

const mapDispatchToProps = dispatch => ({
    displayMessage: messageObj => dispatch(displayMessage(messageObj)),
});

export default connect(null, mapDispatchToProps)(DisplayMessage);