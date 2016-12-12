import {fetch as fetchApi} from 'whatwg-fetch'

function fetch(input, init) {
    init = init || {};
    init = Object.assign(init, {
        credentials: 'same-origin'
    })
    return fetchApi(input, init);
}


export function path(path = '') {
    return `${basePath}/${path}`
}

export function apiUrl(path = '', params = null) {
    var url = `${apiBase}/${path}`
    //TODO Add params as query string.
    return url;
}
