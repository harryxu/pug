import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { Button } from 'semantic-ui-react'

class ApiSpecPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestVerb: 'GET'
        }

        this.verbs = ['GET', 'PUT', 'PATCH', 'DELETE']
                        .map(v => ({value: v, label: v}));
    }

    updateVerb(verb) {
        this.setState({
            requestVerb: verb
        })
    }


    renderSpecSetting() {

        return (
            <div className="api-box spec-setting">

                <div className="request-info">
                    <div className="verb-select spec-field">
                        <Select name="verb" options={this.verbs} value={this.state.requestVerb}
                                clearable={false} onChange={this.updateVerb.bind(this)}/>
                    </div>

                    <div className="ui message base-path spec-field">
                        {this.props.globalConfig.baseUrl}/
                    </div>

                    <div className="ui input path-input sped-field">
                        <input type="text" name="path" placeholder="Request path"/>
                    </div>
                </div>

                <div className="ui input name-input sped-field">
                    <input type="text" name="name" placeholder="Request Name" />
                </div>

                <Button className="btn-save" primary size="mini">Save</Button>
            </div>
        )
    }

    render() {
        return(
            <div className="api-spec-pane">
                {this.renderSpecSetting()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        globalConfig: state.globalConfig
    }
}

export default connect(mapStateToProps)(ApiSpecPane)
