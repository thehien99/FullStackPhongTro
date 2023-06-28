import React from "react"
import Header from "../../component/Layout/header/Header"
import Footer from "../../component/Layout/footer/Footer"
import Navigation from "./Navigation/Navigation"
import { Outlet } from "react-router-dom"
import Search from "../page/Search/Search"
import { useSelector } from "react-redux"
const Layout = () => {
  const isLogin = useSelector(state => state.auth.isLogin)
  return (
    <>
      <div className="home">
        <div className="header">
          <Header />
          <Navigation />
          {isLogin && <Search />}
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="footer bg-white">
          <Footer />
        </div>
      </div>
    </>
  )
}
export default Layout