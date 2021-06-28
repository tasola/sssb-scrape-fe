import React from 'react'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistor, store } from 'src/redux/store/store'

import App from './App'
// import configureStore from './store/store'

// const store = configureStore()

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default Root
