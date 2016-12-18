import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import SplitPane from 'react-split-pane'

import ApiListPane from './ApiListPane'

class App extends Component {

    render() {
        const paneStyle = {
            position: 'static'
        }

        return (
            <div className="root">
                <div className="wrapper">
                    <Menu className="appmenu" inverted={true}>
                        <Menu.Item header>Pug</Menu.Item>
                    </Menu>

                    <SplitPane style={paneStyle} split="vertical" minSize={150} defaultSize={300}>
                        <div>
                            <ApiListPane/>
                        </div>
                        <div>{this.props.children}</div>
                    </SplitPane>
                </div>
            </div>
        )
    }
}

export default connect()(App)
