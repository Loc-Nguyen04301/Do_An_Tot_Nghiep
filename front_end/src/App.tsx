import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import Alert from "./components/Alert/Alert"
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Alert />
        <Router />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
