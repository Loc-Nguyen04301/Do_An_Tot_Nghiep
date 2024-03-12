import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.scss"
import 'react-toastify/dist/ReactToastify.css';
import { AlertContextProvider } from "./contexts/AlertContext"
import { SearchContextProvider } from "./contexts/SearchContext"
import { Provider } from 'react-redux'
import { store } from "./redux-toolkit/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <AlertContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AlertContextProvider>
    </Provider>
  </>
)
