import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import promise from 'redux-promise'
import thunkMiddleware from 'redux-thunk'
import authReducer from 'src/redux/slices/auth/auth'
import contentfulReducer from 'src/redux/slices/contentful/contentful'
import userReducer from 'src/redux/slices/user/user'

import { verifyAuth } from '../../actions/auth/auth'

const reducers = combineReducers({
  auth: authReducer,
  contentful: contentfulReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof reducers>

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
