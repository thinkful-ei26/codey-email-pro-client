import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import NewAddressForm from './address-form';

export function NewAddressPage(props) {
    
    return (
        <div className="new-address">
            <h2>New address</h2>
            <NewAddressForm />
            <Link to="/">cancel</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NewAddressPage);
