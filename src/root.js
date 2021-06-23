import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from 'src/redux/store/store'

import App from './App'
// import configureStore from './store/store'

// const store = configureStore()

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

export default Root
