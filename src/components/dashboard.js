import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';

import {populateEmails, populateAddresses} from '../actions/data';

import '../css/dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(populateEmails());
        this.props.dispatch(populateAddresses());
    }

    delete(event) {
        console.log('clicked', event)
    }

    render() {
        console.log(this.props.emails)
        return (
            <div className="dashboard">
                <div className="dashboard-name">
                    <h1>EMAIL PRO</h1>
                    Welcome, {this.props.name}!
                </div>

                <div className="emails col-9">
                    <h3>Emails</h3>
                    <ul className="list">
                        {this.props.emails.map( email => 
                            <li key={email[0]}>
                                <div className="email-container">
                                    <h4>{email[1]}</h4>
                                    <div>{email[2]}</div>
                                    <div>{email[3]}</div>
                                </div>
                            </li>
                        )}
                    </ul>
                    <Link to="/new-email"><button>New</button></Link>
                </div>

                <div className="addresses col-3">
                    <h3>Addresses</h3>
                    <ul className="list">
                        {this.props.addresses.map( address => 
                            <li key={address}>
                                {address[1]}
                                <button onClick={this.delete}>X</button>
                            </li>
                        )}
                    </ul>
                    <Link to="/new-address"><button>New</button></Link>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        addresses: state.addresses.addresses,
        emails: state.emails.emails
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
