import { webfetch, createFormData, path, apiUrl } from '../helper'

import { push } from 'react-router-redux'

export const LOAD_API_GROUPS = 'LOAD_API_GROUPS'
export const CREATE_API_GROUP = 'CREATE_API_GROUP'
export const UPDATE_API_GROUP = 'UPDATE_API_GROUP'

export const LOAD_API_SPECS = 'LOAD_API_SPECS'
export const CREATE_API_SPEC = 'CREATE_API_SPEC'
export const UPDATE_API_SPEC = 'UPDATE_API_SPEC'
export const LOAD_ACTIVE_API_SPEC = 'LOAD_ACTIVE_API_SPEC'

export const create_api_response = 'create_api_response'
export const update_api_response = 'update_api_response'


//
//      API Group
//

export function loadApiGroups() {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_API_GROUPS,
            ready: false
        })

        return webfetch(apiUrl('group'))
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch(receiveApiGroups(json))
            })
    }
}

export function receiveApiGroups(data) {
    return {
        type: LOAD_API_GROUPS,
        ready: true,
        data
    }
}

export function createApiGroup(data) {
    return commonWrite('group', CREATE_API_GROUP, data, 'POST',
        (p, dispatch) => p.then(() => dispatch(loadApiGroups()))
    )

}

export function updateApiGroup(data) {
    return commonWrite(`group/${data.id}`, UPDATE_API_GROUP, data, 'PUT',
        (p, dispatch) => p.then(() => dispatch(loadApiGroups()))
    )
}

//
//      API Spec
//

export function loadApiSpecs(groupId = 0) {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_API_SPECS,
            groupId,
            pending: true
        })

        return webfetch(apiUrl(`spec?gid=${groupId}`))
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch(receiveApiSpecs(groupId, json))
            })
    }
}

export function receiveApiSpecs(groupId, data) {
    return {
        type: LOAD_API_SPECS,
        pending: false,
        groupId,
        data
    }
}

export function createApiSpec(data) {
    return commonWrite('spec', CREATE_API_SPEC, data, 'POST',
        (p, dispatch) => p.then(spec => {
            dispatch(push(`/b/spec/${spec.id}`))    // redirect to spec page
            dispatch(loadApiSpecs(spec.group_id))   // reload spec list
        })
    );
}

export function updateApiSpec(data) {
    return commonWrite(`spec/${data.id}`, UPDATE_API_SPEC, data, 'PUT',
        (p, dispatch) => p.then(spec => dispatch(loadApiSpecs(spec.group_id)))  // reload spec list })
    )
}

/**
 * Load a single api spec by id.
 *
 * @param id
 */
export function loadActiveApiSpec(id) {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_ACTIVE_API_SPEC,
            pending: true
        })

        return webfetch(apiUrl(`spec/${id}`))
            .then(response => {
                return response.json()
            })
            .then(json => {
                dispatch({
                    type: LOAD_ACTIVE_API_SPEC,
                    pending: false,
                    data: json
                })
            })
    }
}


/**
 * Call write webapi for common create or update use.
 *
 * @param path
 * @param actionType
 * @param data
 * @param method
 * @param middleware
 * @returns {function(*, *)}
 */
export function commonWrite(path, actionType, data, method='POST', middleware = p=>p) {
    return (dispatch, getState) => {
        dispatch({
            type: actionType,
            pending: true
        })

        var p = webfetch(apiUrl(path), {
                method,
                body: createFormData(data)
            })
            .then(response => { return response.json() })
            .then(json => {
                dispatch({
                    type: actionType,
                    pending: false,
                    data: json
                })
                return json
            })
        return middleware(p, dispatch, getState)
    }
}

