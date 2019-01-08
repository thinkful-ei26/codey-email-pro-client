import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import LandingPage from './landing-page';
import RegistrationPage from './registration-page';
import Dashboard from './dashboard';
import NewEmailPage from './new-email-page';
import NewAddressPage from './new-address-page';

export class App extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/new-email" component={NewEmailPage} />
                <Route exact path="/new-address" component={NewAddressPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));