import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function groupList(state = []) {
    return state
}

const rootReducer = combineReducers({
    groupList,
    routing
})

export default rootReducer

