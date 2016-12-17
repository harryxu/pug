import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Accordion, Icon, Modal, Button } from 'semantic-ui-react'

import { loadApiGroups, createApiGroup } from '../actions'
import ApiGroupForm from '../components/ApiGroupForm'

class ApiListPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showGroupForm: false
        }
    }

    componentDidMount() {
        this.loadGropus()
    }

    loadGropus() {
        this.props.dispatch(loadApiGroups())
    }

    renderApiGroups() {

        const {apiGroups} = this.props

        const panels = apiGroups.groups.map((group, i) => ({
            title: group.name,
            content: <div>apis there</div>
        }))

        return(
            <div className="api-groups-list">
                {apiGroups.ready
                    ? <Accordion panels={panels} exclusive={false} fluid styled />
                    : 'Loading groups...'
                }
            </div>
        )
    }

    openGroupForm() {
        this.setState({showGroupForm: true})
    }

    closeGroupForm() {
        this.setState({showGroupForm: false})
    }

    handleGroupFormSubmit(data) {
        this.props.dispatch(createApiGroup(data))
    }

    renderApiGroupForm() {
        return (
            <Modal open={this.state.showGroupForm}>
                <Modal.Header>Create Api Group</Modal.Header>
                <Modal.Content>
                    <ApiGroupForm onCancel={this.closeGroupForm.bind(this)}
                                  onSubmit={this.handleGroupFormSubmit.bind(this)}
                    />
                </Modal.Content>
            </Modal>
        )
    }

    render() {

        return (
            <div className="api-list-pane">
                <div className="toolbar">
                    <Icon name="plus" size="big" title="New group"
                          className="square outline icon-btn btn-add-group"
                          onClick={this.openGroupForm.bind(this)}
                    />
                </div>
                {this.renderApiGroups()}
                {this.renderApiGroupForm()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        apiGroups: state.apiGroups
    }
}

export default connect(mapStateToProps)(ApiListPane)
