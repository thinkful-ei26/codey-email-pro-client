import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import NewAddressForm from './address-form';

import '../css/form.css';

export function NewAddressPage(props) {
    return (
        <div className="container">
            <h2>New address</h2>
            <NewAddressForm history={props.history} />
            <Link to="/dashboard">cancel</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NewAddressPage);
