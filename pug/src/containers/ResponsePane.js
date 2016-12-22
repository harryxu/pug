import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class ResponsePane extends Component {

    render() {
        return (
            <div className="response-pane">

                <div className="response-list">

                </div>

                <div className="response-detail">

                </div>

            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
    }
}

export default connect(mapStateToProps)(ResponsePane)

