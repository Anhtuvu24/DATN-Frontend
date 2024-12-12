import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import Boot from './redux/boot.js';
import { PersistGate } from 'redux-persist/integration/react';

// Components
import Routes from "./router.jsx";
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
        </AppProvider>
      </PersistGate>
    </Provider>
  )
}
Boot()
    .then(() => App())
    .catch(error => console.error(error))

export default App
