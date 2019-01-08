import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import NewEmailForm from './email-form';

export function NewEmailPage(props) {
    return (
        <div className="new-email">
            <h2>New email</h2>
            <NewEmailForm history={props.history} />
            <Link to="/dashboard">cancel</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NewEmailPage);
