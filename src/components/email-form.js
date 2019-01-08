import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required} from '../validators';
import { AddNewEmail } from '../actions/emails';
import {populateEmails} from '../actions/data';


export class NewEmailForm extends React.Component {
    onSubmit(values) {
        this.props.dispatch(AddNewEmail(values.title, values.content, values.recipients))
        this.props.dispatch(populateEmails());
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
                className="email-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="title">Title</label>
                <Field
                    component={Input}
                    type="text"
                    name="title"
                    id="title"
                    validate={required}
                />
                <label htmlFor="content">Content</label>
                <Field
                    component={Input}
                    type="text-area"
                    name="content"
                    id="content"
                    validate={required}
                />
                <label htmlFor="recipients">Recipients</label>
                <Field
                    component={Input}
                    type="text-area"
                    name="recipients"
                    id="recipients"
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
    form: 'newEmail',
    onSubmitFail: (errors, dispatch) => dispatch(focus('newEmail', 'title'))
})(NewEmailForm);
