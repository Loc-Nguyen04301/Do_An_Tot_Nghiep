import React from "react"
import Header from "./Header"
import Footer from "./Footer"

interface DefaultLayoutProps {
  children: React.ReactElement
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="main-container">{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
