import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import Alert from "./components/Alert/Alert"
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import { getMe } from "./redux-toolkit/authSlice";
import { useAppDispatch } from "./redux-toolkit/hook";
import { socket } from "@/socket";
import { createBillNoti } from "@/redux-toolkit/billNotiSlice";

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])

  useEffect(() => {
    console.log(socket.id)
    socket.on('BILL_NOTIFICATION', (bill) => {
      console.log(bill)
      dispatch(createBillNoti({ ...bill, is_read: false }))
    })

    return () => {
      socket.off('BILL_NOTIFICATION');
    };
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