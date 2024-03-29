import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import Alert from "./components/Alert/Alert"
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import { getAccount } from "./redux-toolkit/authSlice";
import { useAppDispatch } from "./redux-toolkit/hook";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccount())
  }, [dispatch])

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
