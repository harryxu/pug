import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'

class ApiSpecList extends Component {

    renderMenu(apiList) {
        return (
            <Menu vertical>
                {
                    apiList.map(function(spec, i) {
                        return <Menu.Item key={i} name={spec.name} />
                    })
                }
            </Menu>
        )
    }

    render() {
        var specs = this.props.specs

        return (
            <div>
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
