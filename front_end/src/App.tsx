import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import Alert from "./components/Alert/Alert"
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import { getMe } from "./redux-toolkit/authSlice";
import { useAppDispatch } from "./redux-toolkit/hook";
import { retrieveCategory } from "@/redux-toolkit/categorySlice";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
    dispatch(retrieveCategory())
  }, [])

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

// hello text