import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';

import {populateEmails, populateAddresses} from '../actions/data';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(populateEmails());
        this.props.dispatch(populateAddresses());
        
    }



    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>

                <div className="addresses">
                    <ul>
                        {this.props.addresses.map( address => <li key={address}>{address}</li>)}
                    </ul>
                </div>
                <Link to="/new-address">New Address</Link>
                <div className="emails">
                    {this.props.emails}
                </div>
                <Link to="/new-email">New Email</Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        addresses: state.addresses.addresses,
        emails: state.emails.emails
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
