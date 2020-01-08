import { combineReducers } from 'redux'
import auth from './auth'
import contentful from './contentful'

export default combineReducers({ auth, contentful })
