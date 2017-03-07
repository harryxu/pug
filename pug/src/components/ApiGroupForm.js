import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { Form, Button, Label } from 'semantic-ui-react'

class ApiGroupForm extends Component {

    handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    formField(FieldComponent) {
        return ({input, meta, ...rest}) => {
            return (
                <Form.Field error={Boolean(meta.touched && meta.error)}>
                    <label>{rest.label}</label>
                    <FieldComponent {...input} {...rest} />
                    {Boolean(meta.touched && meta.error) &&
                        <Label basic color='red' pointing>{meta.error}</Label>}
                </Form.Field>
            )
        }
    }

    render() {
        const {name, desc, id} = this.props.edit || {};
        var idInput = id ? <input type="hidden" name="id" value={id} /> : null

        return (
            <Form loading={this.props.loading} onSubmit={this.props.handleSubmit}>

                <Field name="name" component={this.formField('input')}
                       defaultValue={name} autoFocus
                       label="Name" placeholder="Group Name" />

                <Form.TextArea name="desc" defaultValue={desc}
                               label="Description" placeholder="Description" />

                {idInput}

                <div className="ui grid aligned">
                    <div className="right floated right aligned six wide column">
                        <Button onClick={this.handleCancel.bind(this)} type="button">Cancel</Button>
                        <Button primary type='submit'>{ id ? 'Save' : 'Create'}</Button>
                    </div>
                </div>

            </Form>
        )
    }
}

function validate(values) {
    const errors = {}

    if (!values.name) {
        errors.name = 'Group Name is required.'
    }

    return errors;
}

export default reduxForm({
    form: 'apiGroupForm',
    touchOnChange: false,
    touchOnBlur: false,
    validate,
})(ApiGroupForm)
