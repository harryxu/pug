import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu, Form, Button, TextArea, Label, Icon, Modal } from 'semantic-ui-react'
import Select from 'react-select'

import AceEditor from 'react-ace'
import 'brace/theme/github'
import 'brace/mode/json'
import 'brace/mode/xml'
import 'brace/mode/html'
import 'brace/mode/plain_text'

import {
    createApiResponse,
    updateApiResponse,
    deleteApiResponse,
    loadApiResponseList,
    activeApiResponse
} from '../actions'

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
            editorMode: this.findEditorMode(response.content_type),
            deleteModalOpen: false
        }
    }

    componentDidMount() {
        this.props.dispatch(loadApiResponseList(this.props.request.id))

        var response = this.props.activeResponse.data
        if (response.id) {
            this.setState({
                response,
                editorMode: this.findEditorMode(response.content_type)
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // New active response
        var response = nextProps.activeResponse.data
        if (response.id != this.state.response.id) {
            this.setState({
                response,
                contentType: {
                    value: response.content_type,
                    mode: this.findEditorMode(response.content_type)
                }
            })
        }
    }

    /**
     * Get ace editor mode by content type.
     * @param contentType
     * @returns {string}
     */
    findEditorMode(contentType) {
        var t = this.constructor.contentTypes.find(ct => ct.value == contentType)
        return t ? t.mode : 'plain_text'
    }

    updateContentTypeState(contentType) {
        var response = Object.assign({}, this.state.response, {
            content_type: contentType.value
        })

        this.setState({editorMode: contentType.mode, response})
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

    handleDeleteResponse() {
        this.props.dispatch(deleteApiResponse(this.state.response.id, this.props.request.id))
        this.props.dispatch(activeApiResponse(this.newResponse()))
        this.setState({deleteModalOpen: false})
    }

    newResponse() {
        return {
            name: '',
            status_code: 200,
            content_type: 'application/json',
            match_pattern: '',
            body: ''
        }
    }

    handleResponseMenuClick(event, response) {
        this.props.dispatch(activeApiResponse(response))
    }

    handleNewResponseClick(event) {
        this.props.dispatch(activeApiResponse(this.newResponse()))
    }

    /**
     * Response list menu.
     */
    renderMenu() {
        var items = this.props.responseList.responses.map(function(response, i) {
            return <Menu.Item key={i} active={this.state.response.id == response.id}
                              name={response.name} content={response.name}
                              onClick={e => this.handleResponseMenuClick(e, response)}/>
        }.bind(this))

        var menu = items.length > 0 ? <Menu vertical fluid>{items}</Menu> : null

        return (
            <div className="response-menu">
                <h5>Responses
                    <Icon name="add circle" className="icon-btn btn-add-resp"
                          title="Add New Response"
                          onClick={this.handleNewResponseClick.bind(this)}/>
                </h5>

                {menu}
            </div>
        )
    }

    /**
     * Active response editor form.
     */
    renderResponse() {
        const {response, deleteModalOpen} = this.state

        var deleteModal = <Modal open={deleteModalOpen} basic
            trigger={
                <Button onClick={() => this.setState({deleteModalOpen:true})}
                        basic color="red" type="button">Delete</Button>
            }>
                <Modal.Content>
                    <h1>Delete this response, Really?</h1>
                </Modal.Content>

                <Modal.Actions>
                    <Button color='red' onClick={this.handleDeleteResponse.bind(this)} inverted>
                        <Icon name='delete' /> Delete
                    </Button>

                    <Button onClick={() => this.setState({deleteModalOpen:false})} inverted>Cancel</Button>
                </Modal.Actions>
            </Modal>

        return (
            <Form className="response-detail" loading={this.props.activeResponse.pending}>
                <Form.Group widths='equal'>
                    <Form.Input name="name" label="Name:" value={response.name || ''}
                                onChange={this.handleFieldChange.bind(this)} />

                    <div className="field">
                        <label>Content Type</label>
                        <Select name="content_type"
                                options={this.constructor.contentTypes}
                                value={this.state.response.content_type}
                                onChange={this.updateContentTypeState.bind(this)}
                        />
                    </div>

                    <div className="field">
                        <label>Status Code</label>
                        <Select name="status_code"
                                options={this.constructor.statusCodes}
                                value={response.status_code}
                                onChange={data => this.handleFieldChange({status_code: data.value})}
                        />
                    </div>
                </Form.Group>

                <Form.Field>
                    <label>Match Pattern <Icon name="question circle outline" /> </label>

                    <TextArea rows="1" className="match-pattern"
                              name="match_pattern"
                              value={response.match_pattern || ''}
                              onChange={this.handleFieldChange.bind(this)}/>
                </Form.Field>

                <div className="field">
                    <label>Body</label>
                    <AceEditor
                        mode={this.state.editorMode}
                        theme="github"
                        name="body"
                        fontSize={16}
                        width="100%"
                        height="300px"
                        tabSize={2}
                        value={response.body}
                        onChange={body => this.handleFieldChange({body})}
                        editorProps={{$blockScrolling: true}}
                    />
                </div>

                <div className="group">
                    <Button onClick={this.handleSaveResponse.bind(this)} primary type="button">Save</Button>
                    {response.id ? deleteModal : null}
                </div>
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
        activeResponse: state.activeApiResponse,
        responseList: state.apiResponses
    }
}

export default connect(mapStateToProps)(ResponsePane)

