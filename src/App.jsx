import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

// Components
import Routes from "./router.js";
import GlobalStyle from "./assets/styles/globalStyle.js";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Components
import AppProvider from "./AppProvider.jsx";

// Styles
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <GlobalStyle />
          <Routes />
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
        </AppProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
