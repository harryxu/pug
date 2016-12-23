import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import SplitPane from 'react-split-pane'

import ApiListPane from './ApiListPane'

class App extends Component {

    render() {

        return (
            <div className="root">
                <div className="wrapper">
                    <Menu className="appmenu" inverted={true}>
                        <Menu.Item header>Pug</Menu.Item>
                    </Menu>

                    <SplitPane split="vertical" minSize={150} defaultSize={260}>
                        <ApiListPane/>
                        {this.props.children}
                    </SplitPane>
                </div>
            </div>
        )
    }
}

export default connect()(App)
