import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { verifyAuth } from '../actions/'
import rootReducer from '../reducers/'
import promise from 'redux-promise'

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware, promise)
  )
  store.dispatch(verifyAuth())
  return store
}
