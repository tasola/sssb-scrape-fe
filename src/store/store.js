import { applyMiddleware, createStore } from 'redux'
import promise from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

import { verifyAuth } from '../actions/auth/auth'
import rootReducer from '../reducers/'

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware, promise)
  )
  store.dispatch(verifyAuth())
  return store
}
