// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import DevTools from './devTools'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware, { END } from 'redux-saga'
import { rootReducer } from 'store/reducers'
import { fromJS } from 'immutable'
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// - Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware()
// - initial state
let initialState = {

}

// - Config and create store of redux
let store: redux.Store<any> = redux.createStore(rootReducer(history), fromJS(initialState), redux.compose(
  redux.applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware)
))

export default {store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END), history}
