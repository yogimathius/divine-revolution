import { Outlet } from 'react-router-dom'
import { Nav } from '../../components'
import { AuthProvider } from '../../context'

const NavbarWrapper = () => {
  return (
    <AuthProvider>
      <Nav />
      <Outlet />
    </AuthProvider>
  )
}

export default NavbarWrapper
