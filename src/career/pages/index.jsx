import { Outlet, useLocation } from 'react-router-dom'
import '../assets/style.css'
import NavBar from '../components/NavBar'

const Index = () => {
  const location = useLocation()
  return (
    <div>
      {!(
        location.pathname.includes('login') || location.pathname.includes('register') || location.pathname.includes('verify')
      ) ? (
        <>
          <div className="header-career"></div>
          <NavBar />
        </>
      ) : null}
      <Outlet />
    </div>
  )
}

export default Index
