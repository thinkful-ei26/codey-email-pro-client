import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const NEW_ADDRESS = 'NEW_ADDRESS';
export const newAddress = () => ({
    type: NEW_ADDRESS
});

export const NEW_ADDRESS_ERROR = 'NEW_ADDRESS_ERROR';
export const newAddressError = error => ({
    type: NEW_ADDRESS_ERROR,
    error
});

export const AddNewAddress = (name, address) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    const userId = getState().auth.currentUser.id;
    dispatch(newAddress());
    return (
        fetch(`${API_BASE_URL}/addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                userId,
                name,
                address
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .catch(err => {
                const {code} = err;
                const message =
                    code === 400
                        ? 'Invalid name or address'
                        : 'Unable to add new address, please try again';
                dispatch(newAddressError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};