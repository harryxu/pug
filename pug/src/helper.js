import 'whatwg-fetch'

export function webfetch(input, init) {
    init = init || {};
    init = Object.assign(init, {
        credentials: 'same-origin'
    })

    // Add laravel csrf token to request header.
    if (init['method'] && init['method'].toLowerCase != 'get') {
        if (!init['headers']) {
            init['headers'] = {};
            init['headers']['X-CSRF-TOKEN'] = window.csrfToken;
        }
    }

    return fetch(input, init);
}

export function createFormData(data = {})  {
    var formData = new FormData();

    Object.keys(data).forEach(key => formData.append(key, data[key]));


    return formData;
}


export function path(path = '') {
    return `${basePath}/${path}`
}

export function apiUrl(path = '', params = null) {
    var url = `${apiBase}/${path}`
    //TODO Add params as query string.
    return url;
}
