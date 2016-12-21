import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Menu } from 'semantic-ui-react'

import { path } from '../helper'

class ApiSpecList extends Component {

    handleMenuItenClick(event, spec) {
        this.props.dispatch(push(path(`b/spec/${spec.id}`)))
    }

    renderMenu(apiList) {
        return (
            <Menu vertical fluid>
                {
                    apiList.map(function(spec, i) {
                        return <Menu.Item key={i} name={spec.name}
                                          onClick={event => this.handleMenuItenClick(event, spec)} />
                    }.bind(this))
                }
            </Menu>
        )
    }

    render() {
        var specs = this.props.specs

        return (
            <div className="api-spec-list">
                {specs.pending ? 'Loading...' : this.renderMenu(specs.data)}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    var specs = state.apiSpecs[ownProps.group.id] || { pending: false, data: [] };
    return {
        specs
    }
}

export default connect(mapStateToProps)(ApiSpecList)
