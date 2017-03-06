import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

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
        case actions.LOAD_ACTIVE_API_SPEC:
            return Object.assign({}, state, {
                pending: action.pending,
                data: action.pending ? {} : action.data
            })
        default:
            return state
    }
}

function apiSpecs(state = {}, action) {
    if (action.type != actions.LOAD_API_SPECS) {
        return state;
    }

    if (action.pending) {
        var specs = state[action.groupId] ? state[action.groupId].data : []
    }
    else {
        var specs = action.data
    }

    var specObj = {
        [action.groupId]: {
            pending: action.pending,
            data: specs
        }
    }

    return Object.assign({}, state, specObj);
}

function activeApiResponse(state = {pending: false, data: {}}, action) {
    switch (action.type) {
        case actions.CREATE_API_RESPONSE:
        case actions.UPDATE_API_RESPONSE:
        case actions.ACTIVE_API_RESPONSE:
            return {
                pending: action.pending,
                data: action.data || {}
            }

        default:
            return state
    }
}

function apiResponses(state = {pending: false, responses:[]}, action) {
    switch (action.type) {
        case actions.LOAD_API_RESPONSE_LIST:
            return {
                pending: action.pending,
                responses: action.data ? action.data : state.responses
            }

        default:
            return state
    }
}

function globalConfig(state = {}, action) {
    return state
}

const rootReducer = combineReducers({
    apiGroups,
    apiGroupRequest,

    apiSpecs,
    activeApiSpec,

    activeApiResponse,
    apiResponses,

    globalConfig,

    form: formReducer,
    routing,
})

export default rootReducer

