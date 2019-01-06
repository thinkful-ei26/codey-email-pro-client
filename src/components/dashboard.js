import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';

import Addresses from './addresses';
import Emails from './emails';

export class Dashboard extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>

                {/* <Addresses /> */}
                <Link to="/new-address">New Address</Link>

                {/* <Emails /> */}
                <Link to="/new-email">New Email</Link>

            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
