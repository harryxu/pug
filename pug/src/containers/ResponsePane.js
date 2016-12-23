import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu, Form, Input, Button } from 'semantic-ui-react'
import Select from 'react-select'

import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/json';
import 'brace/mode/xml';

class ResponsePane extends Component {

    static contentTypes = [
        'application/json',
        'application/xml',
        'text/html'
    ] .map(v => ({value: v, label: v}));

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
                    <Form.Input label="Name:" />

                    <div className="field">
                        <label>Content Type</label>
                        <Select name="content_type"
                                options={this.constructor.contentTypes}
                        />
                    </div>

                    <div className="field">
                        <label>Status Code</label>
                        <Select name="status_code"
                                options={this.constructor.statusCodes}
                        />
                    </div>
                </Form.Group>

                <div className="field">
                    <label>Body</label>
                    <AceEditor
                        mode="json"
                        theme="github"
                        name="body"
                        fontSize={20}
                        width="100%"
                        tabSize={2}
                    />
                </div>

                <Form.Button>Save</Form.Button>
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
    }
}

export default connect(mapStateToProps)(ResponsePane)

