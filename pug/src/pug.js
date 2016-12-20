import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'

require('../sass/splitpane.scss')
require('../sass/style.scss')

// app modules
import rootReducer from './reducers'
import routes from './routes'

var initState = {
    apiGroups: {groups:[]},

    // Current working api group request.
    apiGroupRequest: {
        pending: false,
        data: {}
    },

    // Current active api spec
    activeApiSpec: {
        pending: false,
        data: {}
    },

    // Api spec list, data grouped by group id, ungrouped api in key 0
    // {0:[...], 1:[...]}
    apiSpecs: {},

    globalConfig: {
        basePath: window.basePath,
        baseUrl: window.baseUrl
    }
}

const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware(thunk, routerMiddleware(browserHistory)),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
)
