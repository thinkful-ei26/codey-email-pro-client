import {
    FETCH_ADDRESSES
} from '../actions/data';

const initialState = {
    addresses: []
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_ADDRESSES) {
        return Object.assign({}, state, {
            addresses: action.addresses
        });
    }
    return state;
}