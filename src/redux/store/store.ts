import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import promise from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import authReducer from 'src/redux/slices/auth/auth'
import contentfulReducer from 'src/redux/slices/contentful/contentful'
import userReducer from 'src/redux/slices/user/user'
import { verifyAuth } from '../functions/auth/thunks'

export const reducers = combineReducers({
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

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    },
  }).concat([thunkMiddleware, promise]),
})

export const setupStore = () => {
  store.dispatch(verifyAuth())
  return store
}

export const persistor = persistStore(store)
