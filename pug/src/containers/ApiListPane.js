import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Accordion } from 'semantic-ui-react'

import { loadApiGroups } from '../actions'

class ApiListPane extends Component {

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

    render() {


        return (
            <div>
                {this.renderApiGroups()}
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
