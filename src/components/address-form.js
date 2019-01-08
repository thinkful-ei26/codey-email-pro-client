import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required} from '../validators';
import { AddNewAddress } from '../actions/addresses';
import {populateAddresses} from '../actions/data';

export class NewAddressForm extends React.Component {
    onSubmit(values) {
        this.props.dispatch(AddNewAddress(values.name, values.address))
        this.props.dispatch(populateAddresses());
        this.props.history.push('/dashboard');
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="address-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="name">Name</label>
                <Field
                    component={Input}
                    type="text"
                    name="name"
                    id="name"
                    validate={required}
                />
                <label htmlFor="address">Address</label>
                <Field
                    component={Input}
                    type="text"
                    name="address"
                    id="address"
                    validate={required}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Add
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'newAddress',
    onSubmitFail: (errors, dispatch) => dispatch(focus('newAddress', 'address'))
})(NewAddressForm);
