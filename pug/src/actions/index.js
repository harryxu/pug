import { webfetch, createFormData, path, apiUrl } from '../helper'

export const LOAD_API_GROUPS = 'LOAD_API_GROUPS'
export const CREATE_API_GROUP = 'CREATE_API_GROUP'

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

/**
 * Create a new api group.
 *
 * @param data
 * @returns {function(*, *)}
 */
export function createApiGroup(data) {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_API_GROUP,
            pending: true
        })
        return webfetch(apiUrl('group'), {
            method: 'post',
            body: createFormData(data)
        })
            .then(response => { return response.json() })
            .then(json => {
                dispatch(loadApiGroups())
                dispatch({
                    type: CREATE_API_GROUP,
                    pending: false,
                    data: json
                })
            })
    }
}
