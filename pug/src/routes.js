import React from 'react'

import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import { path } from './helper'

export default (
    <Route path={path()} component={App}>
    </Route>
)

