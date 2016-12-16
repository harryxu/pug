import 'whatwg-fetch'

export function webfetch(input, init) {
    init = init || {};
    init = Object.assign(init, {
        credentials: 'same-origin'
    })
    return fetch(input, init);
}


export function path(path = '') {
    return `${basePath}/${path}`
}

export function apiUrl(path = '', params = null) {
    var url = `${apiBase}/${path}`
    //TODO Add params as query string.
    return url;
}
