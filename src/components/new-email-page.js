import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import EmailForm from './email-form';

export function NewEmailPage(props) {
    
    return (
        <div className="new-email">
            <h2>New email</h2>
            <EmailForm />
            <Link to="/">cancel</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NewEmailPage);
