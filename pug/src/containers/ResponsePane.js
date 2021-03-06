import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Form, Button, TextArea, Accordion, Label, Icon, Modal, Popup } from 'semantic-ui-react'
import Select from 'react-select'

import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/htmlmixed/htmlmixed'

import ApiResponseList from '../components/ApiResponseList'

import {
    createApiResponse,
    updateApiResponse,
    deleteApiResponse,
    loadApiResponseList,
    activeApiResponse,
    updateResponseOrder
} from '../actions'

class ResponsePane extends Component {

    static contentTypes = [
        ['application/json', {name: 'javascript', json: true}],
        ['application/xml', 'xml'],
        ['text/html', 'htmlmixed'],
        ['text/plain', '']
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
                contentType: response.content_type,
                editorMode: this.findEditorMode(response.content_type)
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

    /**
     * Handle response field change.
     */
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

    handleResponseOrderChange(order, event)  {
        this.props.dispatch(updateResponseOrder(order, this.props.request.id))
    }

    /**
     * Response list menu.
     */
    renderMenu() {
        return (
            <div className="response-menu">
                <h5>Responses
                    <Icon name="add circle" className="icon-btn btn-add-resp"
                          title="Add New Response"
                          onClick={this.handleNewResponseClick.bind(this)}/>
                </h5>
                <ApiResponseList
                    responses={this.props.responseList.responses}
                    activeResponse={this.state.response}
                    onChange={this.handleResponseMenuClick.bind(this)}
                    onOrderChange={this.handleResponseOrderChange.bind(this)}
                />
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
                    <Button onClick={() => this.setState({deleteModalOpen:false})} inverted>Cancel</Button>
                    <Button color='red' onClick={this.handleDeleteResponse.bind(this)} inverted>
                        <Icon name='delete' /> Delete
                    </Button>
                </Modal.Actions>
            </Modal>

        var matchPatternHelper =
            <Popup flowing hoverable positioning='bottom center'
                   trigger={<Icon name="question circle outline" />}>
                If regex match your request, this response will be used.
                <div>
                    Request will be encoding to a JSON string:
                    <pre>{`{
  "querystr":"Query String from $_SERVER['QUERY_STRING']",
  "raw":"HTTP raw data from php://input",
  "post":"POST data from $_POST encoding to JSON string"
}`}</pre>
                </div>
                Regex will try to match above JSON string.<br />
                The actual JSON will be an one line string.
            </Popup>



        var headersHelp =
            <Popup flowing hoverable
                   trigger={
                       <div className="help">
                           Http response headers. JSON Object format, key value pair.
                       </div>
                   }>
                Sample:
                <pre>{`{
    "foo": "bar",
    "Via": "pug"
}`
                }</pre>
            </Popup>

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
                    <label>Match Pattern {matchPatternHelper}</label>
                    <TextArea rows="1" className="match-pattern"
                              name="match_pattern"
                              placeholder="Regex to match request"
                              value={response.match_pattern || ''}
                              onChange={this.handleFieldChange.bind(this)}/>
                </Form.Field>

                <div className="field">
                    <Accordion onTitleClick={() => setTimeout(()=>this.refs.headerCM.codeMirror.refresh(), 100) }
                        panels={[{
                            title: 'Headers',
                            content: <div>
                                {headersHelp}
                                <CodeMirror
                                    ref="headerCM"
                                    name="headers"
                                    value={response.headers || ''}
                                    onChange={headers => this.handleFieldChange({headers})}
                                    options={{
                                        lineNumbers: true,
                                        mode: 'javascript'
                                    }}
                                />
                             </div>
                        }]}
                    />
                </div>

                <div className="field">
                    <label>Body</label>
                    <CodeMirror
                        name="body"
                        value={response.body || ''}
                        onChange={body => this.handleFieldChange({body})}
                        options={{
                            lineNumbers: true,
                            mode: this.state.editorMode
                        }}
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

