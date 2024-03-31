import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AlertContextProvider } from "./contexts/AlertContext"
import { SearchContextProvider } from "./contexts/SearchContext"
import { Provider } from 'react-redux'
import { persistor, store } from "./redux-toolkit/store";
import { PersistGate } from 'redux-persist/integration/react'

import "./index.scss"
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </AlertContextProvider>
      </PersistGate>
    </Provider>
  </>
)
