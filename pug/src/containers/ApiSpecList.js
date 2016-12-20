import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class ApiSpecList extends Component {

    render() {
        return (
            <div>
                spec list
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(ApiSpecList)
