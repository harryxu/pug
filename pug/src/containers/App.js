import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import SplitPane from 'react-split-pane'

class App extends Component {

    render() {
        return (
            <div>
                 <Menu className="appmenu" fixed="top" inverted="true">
                    <Menu.Item header>Pug</Menu.Item>
                </Menu>
                <div className="root-pane">
                    <SplitPane split="vertical" minSize={150} defaultSize={300}>
                        <div></div>
                        <div></div>
                    </SplitPane>
                </div>
            </div>
        )
    }
}

export default connect()(App)
