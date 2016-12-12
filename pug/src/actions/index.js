import {fetch as fetchApi} from 'whatwg-fetch'


function fetch(input, init) {
    init = init || {};
    init = Object.assign(init, {
        credentials: 'same-origin'
    })
    return fetchApi(input, init);
}
