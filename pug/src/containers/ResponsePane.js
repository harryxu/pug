import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu, Input, Button } from 'semantic-ui-react'

class ResponsePane extends Component {

    static contentTypes = [

    ]

    static statusCodes = [

    ]

    renderMenu() {
        return (
            <Menu vertical fluid>
            </Menu>
        )
    }

    renderResponse() {
        return (
            <div className="response-detail">
                <Input label="Name:" />
            </div>
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

