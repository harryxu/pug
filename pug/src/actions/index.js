import { webfetch, createFormData, path, apiUrl } from '../helper'

export const LOAD_API_GROUPS = 'LOAD_API_GROUPS'
export const CREATE_API_GROUP = 'CREATE_API_GROUP'
export const UPDATE_API_GROUP = 'UPDATE_API_GROUP'

export const CREATE_API_SPEC = 'CREATE_API_SPEC'
export const UPDATE_API_SPEC = 'UPDATE_API_SPEC'


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
        (p, dispatch) => p.then(() => dispatch(loadApiGroups())))

}

export function updateApiGroup(data) {
    return commonWrite(`group/${data.id}`, UPDATE_API_GROUP, data, 'PUT',
        (p, dispatch) => p.then(() => dispatch(loadApiGroups())))
}

//
//      API Spec
//

export function createApiSpec(data) {
    return commonWrite('spec', CREATE_API_SPEC, data);
}

export function updateApiSpec(data) {
    return commonWrite(`spec/${data.id}`, UPDATE_API_SPEC, data, 'PUT');
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
                return dispatch({
                    type: actionType,
                    pending: false,
                    data: json
                })
            })
        return middleware(p, dispatch, getState)
    }
}

