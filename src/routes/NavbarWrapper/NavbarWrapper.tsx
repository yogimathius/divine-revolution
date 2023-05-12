import { Outlet } from 'react-router-dom'
import { Nav } from '../../components'

const NavbarWrapper = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  )
}

export default NavbarWrapper
