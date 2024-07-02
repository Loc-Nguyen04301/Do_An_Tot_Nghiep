import React, { memo } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

interface DefaultLayoutProps {
  children?: React.ReactElement
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="main-container">{children ?? <Outlet />}</div>
      <Footer />
    </div>
  )
}

export default memo(DefaultLayout)
