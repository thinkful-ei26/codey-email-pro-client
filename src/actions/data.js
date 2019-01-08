import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

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
            console.log(res)
            const emails = res.map( obj => obj.title)
            console.log(emails)
            dispatch(fetchEmails(emails))})
        .catch(err => {
            dispatch(fetchEmailsError(err));
        });
};
