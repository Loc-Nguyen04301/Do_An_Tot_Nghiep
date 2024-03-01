import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.scss"
import { AlertContextProvider } from "./contexts/AlertContext"
import { SearchContextProvider } from "./contexts/SearchContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AlertContextProvider>
  </React.StrictMode>
)
