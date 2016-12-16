import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { loadApiGroups } from '../actions'

class ApiListPane extends Component {

    componentDidMount() {
        this.loadGropus()
    }

    loadGropus() {
        this.props.dispatch(loadApiGroups())
    }

    render() {

        const {apiGroups} = this.props

        return (
            <div>
                <div className="api-groups-list">
                {apiGroups.ready
                    ? <ul>
                        {apiGroups.groups.map((group, i) =>
                            <li key={i}>{group.name}</li>
                        )}
                    </ul>
                    : 'Loading groups...'
                }
                </div>

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
