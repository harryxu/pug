import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu, Form, Input, Button } from 'semantic-ui-react'
import Select from 'react-select'

import AceEditor from 'react-ace'
import 'brace/theme/github'
import 'brace/mode/json'
import 'brace/mode/xml'
import 'brace/mode/html'
import 'brace/mode/plain_text'

import { createApiResponse, updateApiResponse } from '../actions'

class ResponsePane extends Component {

    static contentTypes = [
        ['application/json', 'json'],
        ['application/xml', 'xml'],
        ['text/html', 'html'],
        ['text/plain', 'plain_text']
    ] .map(v => ({value: v[0], label: v[0], mode: v[1]}));

    static statusCodes = [
        // 2xx
        {value: 200, label: '200 OK'},
        {value: 201, label: '201 Created'},

        // 3xx
        {value: 300, label: '300 Multiple Choices'},
        {value: 301, label: '301 Moved Permanently'},
        {value: 302, label: '302 Found'},

        // 4xx
        {value: 400, label: '400 Bad Request'},
        {value: 401, label: '401 Unauthorized'},
        {value: 402, label: '402 Payment Required'},
        {value: 403, label: '403 Forbidden'},
        {value: 404, label: '404 Not Found'},

        // 5xx
        {value: 500, label: '500 Internal Server Error'},

    ]

    constructor(props) {
        super(props)

        var response = this.newResponse()
        this.state = {
            response,
            contentType: {
                value: response.content_type,
                mode: this.findEditorMode(response.content_type)
            }
        }
    }

    findEditorMode(contentType) {
        var t = this.constructor.contentTypes.find(ct => ct.value == contentType)
        return t ? t.mode : 'plain_text'
    }

    updateContentTypeState(contentType) {
        var response = Object.assign({}, this.state.response, {
            content_type: contentType.value
        })

        this.setState({contentType, response})
    }

    handleFieldChange(value) {
        var vo = value;

        if (!_.isPlainObject(value)) { // value should be a event object
            vo = { [value.target.name]: value.target.value }
        }

        this.setState({
            response: Object.assign({}, this.state.response, vo)
        })

    }

    handleSaveResponse() {
        var response = this.state.response

        if (!response.id) {
            this.props.dispatch(createApiResponse(response, this.props.request.id))
        }
        else {
            this.props.dispatch(updateApiResponse(response))
        }
    }

    newResponse() {
        return {
            status_code: 200,
            content_type: 'application/json'
        }
    }

    renderMenu() {
        return (
            <Menu vertical fluid>
            </Menu>
        )
    }

    renderResponse() {
        return (
            <Form className="response-detail">
                <Form.Group widths='equal'>
                    <Form.Input name="name" label="Name:"
                                onChange={this.handleFieldChange.bind(this)} />

                    <div className="field">
                        <label>Content Type</label>
                        <Select name="content_type"
                                options={this.constructor.contentTypes}
                                value={this.state.contentType.value}
                                onChange={this.updateContentTypeState.bind(this)}
                        />
                    </div>

                    <div className="field">
                        <label>Status Code</label>
                        <Select name="status_code"
                                options={this.constructor.statusCodes}
                                value={this.state.response.status_code}
                                onChange={status_code => this.handleFieldChange({status_code})}
                        />
                    </div>
                </Form.Group>

                <div className="field">
                    <label>Body</label>
                    <AceEditor
                        mode={this.state.contentType.mode}
                        theme="github"
                        name="body"
                        fontSize={20}
                        width="100%"
                        tabSize={2}
                        value={this.state.response.body}
                        onChange={body => this.handleFieldChange({body})}
                    />
                </div>

                <Form.Button onClick={this.handleSaveResponse.bind(this)}
                             primary type="button" >Save</Form.Button>
            </Form>
        )
    }

    render() {
        return (
            <div className="response-pane">

                <div className="response-list">
                    {this.renderMenu()}
                </div>

                {this.renderResponse()}
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        response: state.activeApiResponse,
    }
}

export default connect(mapStateToProps)(ResponsePane)

