import { Outlet } from "react-router-dom"
import Header from "../components/header"

function MainLayout() {
  return (
    <>
      <Header/>
      <div>
        <Outlet/>   
      </div>
    </>
  )
}

export default MainLayout