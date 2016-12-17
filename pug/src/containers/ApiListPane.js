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

    componentWillReceiveProps(nextProps) {
        if (!nextProps.apiGroupRequest.pending) {
            this.setState({showGroupForm: false})
        }
    }


    loadGropus() {
        this.props.dispatch(loadApiGroups())
    }

    handleNewApiClick(group = null) {
        console.log('create api in group', group)
    }

    renderApiGroups() {

        const {apiGroups} = this.props

        const panels = [];
        apiGroups.groups.forEach(function(group, i) {
            panels.push(<Accordion.Title key={`title-${i}`}>
                <Icon name='dropdown' />
                {group.name}
                <div className="btns">
                    <Icon name="add" className="icon-btn"
                          onClick={event => {
                              event.stopPropagation()
                              this.handleNewApiClick(group)
                          }} />
                </div>
            </Accordion.Title>)
            panels.push(<Accordion.Content key={`content-${i}`}>xxx</Accordion.Content>)
        }.bind(this))

        return(
            <div className="api-groups-list">
                {apiGroups.ready || apiGroups.groups.length > 0
                    ? (
                        <Accordion exclusive={false} fluid styled >
                            {panels}
                        </Accordion>
                      )
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

    /**
     * Dispatch create api group action
     *
     * @param data
     */
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
                                  loading={this.props.apiGroupRequest.pending}
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
        apiGroups: state.apiGroups,
        apiGroupRequest: state.apiGroupRequest
    }
}

export default connect(mapStateToProps)(ApiListPane)