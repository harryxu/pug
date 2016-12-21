import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Form, Button } from 'semantic-ui-react'

import { createApiSpec, updateApiSpec, loadActiveApiSpec } from '../actions'

class ApiSpecPane extends Component {

    constructor(props) {
        super(props);


        this.state = {
            requestVerb: 'GET'
        }

        this.verbs = ['GET', 'PUT', 'PATCH', 'DELETE']
                        .map(v => ({value: v, label: v}));
    }

    componentDidMount() {

        var {params, dispatch} = this.props

        if (params.id) {
            dispatch(loadActiveApiSpec(params.id))
        }

    }

    updateVerb(verb) {
        this.setState({
            requestVerb: verb
        })
    }

    handleSaveSpec(event, data) {
        event.preventDefault()

        var formData = data.formData
        var spec = this.props.spec.data

        if (spec.id) {
            formData.id = spec.id
            this.props.dispatch(updateApiSpec(data.formData))
        }
        else {
            if (this.props.location.query.gid) {
                formData.group_id = this.props.location.query.gid
            }

            this.props.dispatch(createApiSpec(data.formData))
        }
    }

    renderSpecSetting() {

        const {spec} = this.props
        console.log('ssss', spec)

        return (
            <Form className="api-box spec-setting" onSubmit={this.handleSaveSpec.bind(this)}>

                <div className="request-info">
                    <div className="verb-select spec-field">
                        <Select name="method" searchable={false}
                                options={this.verbs}
                                defaultValue={spec.data.method}
                                value={this.state.requestVerb}
                                clearable={false} onChange={this.updateVerb.bind(this)}/>
                    </div>

                    <div className="ui message base-path spec-field">
                        {this.props.globalConfig.baseUrl}/
                    </div>

                    <div className="ui input path-input sped-field">
                        <input type="text" name="path" placeholder="Request path"
                               value={spec.data.path}/>
                    </div>
                </div>

                <div className="ui input name-input sped-field">
                    <input type="text" name="name" placeholder="Request Name"
                           value={spec.data.name}/>
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

function mapStateToProps(state, ownProps) {
    return {
        globalConfig: state.globalConfig,
        spec: state.activeApiSpec
    }
}

export default connect(mapStateToProps)(ApiSpecPane)
