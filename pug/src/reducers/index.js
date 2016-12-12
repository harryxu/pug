import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import * as actions from '../actions'

function apiGroups(state = [], action) {
    if (action.type != actions.LOAD_API_GROUPS) {
        return
    }

    var data = {
        groups: action.fetching ? action.data : [],
        fetching: action.fetching || false,
    }

    return Object.assign({}, state, data)
}

const rootReducer = combineReducers({
    apiGroups,
    routing
})

export default rootReducer

