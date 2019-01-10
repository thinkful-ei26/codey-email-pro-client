import {
    FETCH_EMAILS
} from '../actions/data';

const initialState = {
    emails: []
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_EMAILS) {
        return Object.assign({}, state, {
            emails: action.emails
        });
    }
    return state;
}
