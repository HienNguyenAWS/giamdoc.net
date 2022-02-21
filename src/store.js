import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import rootReducer from './reducers'

const initialState = {}
const middleware = [thunk]
const store = createStore(
    rootReducer,
    fromJS(initialState),
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store