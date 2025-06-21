import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight">ItemHub</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-yellow-300 underline' : 'hover:text-yellow-200'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/view"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-yellow-300 underline' : 'hover:text-yellow-200'}`
            }
          >
            View Items
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-yellow-300 underline' : 'hover:text-yellow-200'}`
            }
          >
            Add Item
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;