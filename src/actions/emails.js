import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const NEW_EMAIL = 'NEW_EMAIL';
export const newEmail = () => ({
    type: NEW_EMAIL
});

export const NEW_EMAIL_ERROR = 'NEW_EMAIL_ERROR';
export const newEmailError = error => ({
    type: NEW_EMAIL_ERROR,
    error
});

export const AddNewEmail = (title, content, recipients) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    const userId = getState().auth.currentUser.id;
    dispatch(newEmail());
    return (
        fetch(`${API_BASE_URL}/emails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                userId,
                title,
                content,
                recipients
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
                        ? 'Invalid form data'
                        : 'Unable to send email, please try again';
                dispatch(newEmailError(err));
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