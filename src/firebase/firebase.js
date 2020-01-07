import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCOHkxP0aQKV83WnANfV8GYC354UEXwYFk',
  authDomain: 'sssb-scrape.firebaseapp.com',
  databaseURL: 'https://sssb-scrape.firebaseio.com',
  projectId: 'sssb-scrape',
  storageBucket: 'sssb-scrape.appspot.com',
  messagingSenderId: '42502418862',
  appId: '1:42502418862:web:6b4bd1962d5a6d8f8cd83f',
  measurementId: 'G-WPL7610NFK'
}

export const myFirebase = firebase.initializeApp(firebaseConfig)
const baseDb = myFirebase.firestore()
export const db = baseDb
