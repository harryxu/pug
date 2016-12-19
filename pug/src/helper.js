import 'whatwg-fetch'

export function webfetch(input, init) {
    init = init || {};
    init = Object.assign(init, {
        credentials: 'same-origin'
    })

    const method = init.method || 'GET';

    // Add laravel csrf token to request header.
    if (method.toUpperCase() != 'GET') {
        if (!init['headers']) {
            init['headers'] = {};
            init['headers']['X-CSRF-TOKEN'] = window.csrfToken;
        }
    }

    // HTML forms can't make PUT, PATCH, or DELETE requests,
    // we need to add a _method field to spoof these HTTP verbs.
    if (['PUT', 'PATCH', 'DELETE'].indexOf(method.toUpperCase()) >= 0
        && init.body instanceof FormData) {
        init.body.append('_method', method);
        init.method = 'POST'
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
