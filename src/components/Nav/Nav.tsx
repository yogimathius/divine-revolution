import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context';

const Nav = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  console.log('nav logged in value:', isLoggedIn);
  
  return (
    <nav className="bg-blue-500 fixed max-w-4xl w-full mx-4 sm:mx-auto z-10 top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="" alt="Logo" />
            </div>
            <div className="ml-4">
              <h1 className="text-white text-lg font-bold">My App</h1>
            </div>
          </div>
          <div className="flex">
            <NavLink
              to="/"
              end
              className={`text-white hover:bg-blue-600 px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-blue-600' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/home"
              className={`text-white hover:bg-blue-600 px-3 py-2 rounded-md ${location.pathname === '/home' ? 'bg-blue-600' : ''}`}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={`text-white hover:bg-blue-600 px-3 py-2 rounded-md ${location.pathname === '/contact' ? 'bg-blue-600' : ''}`}
            >
              Contact
            </NavLink>
            {isLoggedIn ? (
              <button onClick={() => logout()} className="text-white hover:bg-blue-600 px-3 py-2 rounded-md">Logout</button>
            ) : (
              <Link to="/login" className="text-white hover:bg-blue-600 px-3 py-2 rounded-md">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
