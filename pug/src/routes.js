import React from 'react'

import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import ApiRequestPane from './containers/ApiRequestPane'

import { path } from './helper'

export default (
    <Route path={path()} component={App}>
        <IndexRoute component={ApiRequestPane} />

        <Route path={path('b/newspec')} component={ApiRequestPane} />

        <Route path={path('b/spec/:id')} component={ApiRequestPane} />

    </Route>
)

