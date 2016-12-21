import React from 'react'

import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import ApiSpecPane from './containers/ApiSpecPane'

import { path } from './helper'

export default (
    <Route path={path()} component={App}>
        <IndexRoute component={ApiSpecPane} />

        <Route path={path('b/newspec')} component={ApiSpecPane} />

        <Route path={path('b/spec/:id')} component={ApiSpecPane} />

    </Route>
)

