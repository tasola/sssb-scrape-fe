import { combineReducers } from 'redux'

import auth from './auth'
import contentful from './contentful'
import firebaseDb from './firebase-db'

export default combineReducers({ auth, contentful, firebaseDb })
