import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Form, Button } from 'semantic-ui-react'

import { createApiSpec, updateApiSpec } from '../actions'

class ApiSpecPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestVerb: 'GET'
        }

        this.verbs = ['GET', 'PUT', 'PATCH', 'DELETE']
                        .map(v => ({value: v, label: v}));
    }

    updateVerb(verb) {
        this.setState({
            requestVerb: verb
        })
    }

    handleSaveSpec(event, data) {
        event.preventDefault()
        const spec = this.props.spec.data
        if (spec.id) {
            var formData = data.formData
            formData.id = spec.id
            this.props.dispatch(updateApiSpec(data.formData))
        }
        else {
            this.props.dispatch(createApiSpec(data.formData))
        }
    }

    renderSpecSetting() {

        return (
            <Form className="api-box spec-setting" onSubmit={this.handleSaveSpec.bind(this)}>

                <div className="request-info">
                    <div className="verb-select spec-field">
                        <Select name="method" searchable={false}
                                options={this.verbs} value={this.state.requestVerb}
                                clearable={false} onChange={this.updateVerb.bind(this)}/>
                    </div>

                    <div className="ui message base-path spec-field">
                        {this.props.globalConfig.baseUrl}/
                    </div>

                    <div className="ui input path-input sped-field">
                        <input type="text" name="path" placeholder="Request path"/>
                    </div>
                </div>

                <div className="ui input name-input sped-field">
                    <input type="text" name="name" placeholder="Request Name" />
                </div>

                <Button className="btn-save" loading={this.props.spec.pending} primary size="mini">Save</Button>
            </Form>
        )
    }

    render() {
        return(
            <div className="api-spec-pane">
                {this.renderSpecSetting()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        globalConfig: state.globalConfig,
        spec: state.activeApiSpec
    }
}

export default connect(mapStateToProps)(ApiSpecPane)
