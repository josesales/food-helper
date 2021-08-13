import { MessageTypes } from './message-types';

const INITIAL_STATE = {
    message: null,
    type: null,
}

const reviewReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case MessageTypes.DISPLAY_MESSAGE:
            return {
                ...action.payload
            };

        default:
            return state;
    }
}

export default reviewReducer;