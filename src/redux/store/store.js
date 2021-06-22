import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import promise from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import authReducer from 'src/redux/slices/auth/auth'
import contentfulReducer from 'src/redux/slices/contentful/contentful'
import userReducer from 'src/redux/slices/user/user'

import { verifyAuth } from '../../actions/auth/auth'
import rootReducer from '../../reducers'

// const configureStore = (persistedState) => {
//   const store = createStore(
//     rootReducer,
//     persistedState,
//     applyMiddleware(thunkMiddleware, promise)
//   )
//   store.dispatch(verifyAuth())
//   return store
// }

const reducers = combineReducers({
  authReducer,
  contentfulReducer,
  userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware, promise],
})

export default configureStore
