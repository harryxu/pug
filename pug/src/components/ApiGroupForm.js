import React, { Component, PropTypes } from 'react'

import { Form, Button } from 'semantic-ui-react'

export default class ApiGroupForm extends Component {

    handleSubmit(event, data) {
        event.preventDefault()
        if (this.props.onSubmit) {
            this.props.onSubmit(data.formData);
        }
    }

    handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {
        const {name, desc, id} = this.props.edit || {};
        var idInput = id ? <input type="hidden" name="id" value={id} /> : null

        return (
            <Form loading={this.props.loading} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Input name="name" defaultValue={name} autoFocus required label="Name" placeholder="Group Name" />
                <Form.TextArea name="desc" defaultValue={desc} label="Description" placeholder="Description" />

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
