import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import * as actions from '../actions'

function apiGroups(state = {groups: []}, action) {
    if (action.type != actions.LOAD_API_GROUPS) {
        return state
    }

    var data = {
        groups: action.ready ? action.data : state.groups,
        ready: action.ready
    }

    return Object.assign({}, state, data)
}

function apiGroupRequest(state = {pending: false}, action) {
    switch (action.type) {
        case actions.CREATE_API_GROUP:
        case actions.UPDATE_API_GROUP:
            return Object.assign({}, state, {
                pending: action.pending,
                data: action.pending ? {} : action.data
            })
        default:
            return state
    }
}

function activeApiSpec(state={pending: false}, action) {
    switch (action.type) {
        case actions.CREATE_API_SPEC:
        case actions.UPDATE_API_SPEC:
            return Object.assign({}, state, {
                pending: action.pending,
                data: action.pending ? {} : action.data
            })
        default:
            return state
    }
}

function apiSpecs(state = {}, action) {
    return state;
}

function globalConfig(state = {}, action) {
    return state
}

const rootReducer = combineReducers({
    apiGroups,
    apiGroupRequest,
    apiSpecs,
    activeApiSpec,
    globalConfig,
    routing,
})

export default rootReducer

