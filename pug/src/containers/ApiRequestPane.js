import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Form, Input, Button } from 'semantic-ui-react'

import ResponsePane from './ResponsePane'
import { createApiSpec, updateApiSpec, loadActiveApiSpec } from '../actions'

class ApiRequestPane extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spec: this.newSpec()
        }


        this.verbs = ['GET', 'PUT', 'PATCH', 'DELETE']
                        .map(v => ({value: v, label: v}));
    }

    newSpec() {
        return {
            method: 'GET',
            name: '',
            path: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        var nextSpec = _.isEmpty(nextProps.spec.data) ? this.newSpec() : nextProps.spec.data

        this.setState({
            spec: nextSpec
        })

        if (nextProps.params.id != this.props.params.id) {
            if (nextProps.params.id) {
                this.loadSpec(nextProps.params.id)
            }
            else {
                // Trans to creation mode.
                this.setState({spec: this.newSpec()})
            }
        }
    }

    componentDidMount() {
        if (this.props.params.id) {
            this.loadSpec(this.props.params.id)
        }
    }

    loadSpec(id) {
        this.props.dispatch(loadActiveApiSpec(id))
    }

    handleSaveSpec(event, data) {
        event.preventDefault()

        var formData = data.formData
        var spec = this.state.spec

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

    handleUpdateSpec(value) {
        var specvo = value;

        if (!_.isPlainObject(value)) { // value should be a event object
            specvo = { [value.target.name]: value.target.value }
        }

        this.setState({
            spec: Object.assign(this.state.spec, specvo)
        })

    }

    renderSpecSetting() {

        const {spec} = this.state

        const handleChange = this.handleUpdateSpec.bind(this)

        return (
            <Form className="api-box request-setting"
                  loading={this.props.spec.pending}
                  onSubmit={this.handleSaveSpec.bind(this)}>

                <div className="request-info">
                    <div className="verb-select spec-field">
                        <Select name="method" searchable={false}
                                options={this.verbs}
                                value={spec.method}
                                clearable={false}
                                onChange={value => handleChange({method: value})}/>
                    </div>

                    <div className="ui message base-path spec-field">
                        {this.props.globalConfig.baseUrl}/i/{this.props.globalConfig.user.id}/
                    </div>

                    <Input name="path" className="path-input spec-field" placeholder="Request path"
                           value={spec.path} onChange={handleChange}/>
                </div>

                <div className="ui input name-input spec-field">
                    <input type="text" name="name" placeholder="Request Name"
                           value={spec.name} onChange={handleChange}/>
                </div>

                <Button className="btn-save" primary size="mini">Save</Button>
            </Form>
        )
    }

    render() {
        return(
            <div className="api-spec-pane">
                {this.renderSpecSetting()}

                {this.state.spec.id ? <ResponsePane request={this.state.spec} /> : ''}
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

export default connect(mapStateToProps)(ApiRequestPane)
