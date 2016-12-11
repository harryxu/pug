import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends Component {

    render() {
        return (
            <div>
                Pug
            </div>
        )
    }
}

export default connect()(App)
