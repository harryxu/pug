import { fetch, path, apiUrl } from '../helper'

export const LOAD_API_GROUPS = 'LOAD_API_GROUPS'

export function loadApiGroups() {
    return (dispatch, getState) => {
        return fetch(apiUrl('group'))
            .then(response => {
                dispatch(receiveGroup(response.json()))
            })
    }
}

export function receiveGroup(data) {
    return {
        type: LOAD_API_GROUPS,
        fetching: false,
        data
    }
}
