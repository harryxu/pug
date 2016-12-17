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

export function createApiGroup(data) {
    return (dispatch, getState) => {
        return webfetch(apiUrl('group'), {
            method: 'post',
            body: createFormData(data)
        })
    }
}
