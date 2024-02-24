import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.scss"
import AlertProvider from "./contexts/AlertContext"
import { SearchProvider } from "./contexts/SearchContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AlertProvider>
  </React.StrictMode>
)
