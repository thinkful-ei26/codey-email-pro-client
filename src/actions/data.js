import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

// changes fetch_name to fetch_name_success and change populateName to fetchName add each action to its named action file

export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const fetchAddresses = addresses => ({
    type: FETCH_ADDRESSES,
    addresses
});

export const FETCH_ADDRESS_ERROR = 'FETCH_ADDRESS_ERROR';
export const fetchAddressError = error => ({
    type: FETCH_ADDRESS_ERROR,
    error
});

export const FETCH_EMAILS = 'FETCH_EMAILS';
export const fetchEmails = emails => ({
    type: FETCH_EMAILS,
    emails
});

export const FETCH_EMAILS_ERROR = 'FETCH_EMAILS_ERROR';
export const fetchEmailsError = error => ({
    type: FETCH_EMAILS_ERROR,
    error
});


export const populateAddresses = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            const addresses = res.map( obj => [obj.name, obj.address])
            dispatch(fetchAddresses(addresses))})
        .catch(err => {
            dispatch(fetchAddressError(err));
        });
};

export const populateEmails = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/emails`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(res => {
            const emails = res.map( obj => [obj._id, obj.title, obj.content, obj.recipients])
            dispatch(fetchEmails(emails))})
        .catch(err => {
            dispatch(fetchEmailsError(err));
        });
};
