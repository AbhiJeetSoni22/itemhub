import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: Install lucide-react or use icons of your choice

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-4 text-lg font-medium ${
      isActive ? 'text-yellow-300 underline' : 'text-white hover:text-yellow-200'
    }`;

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-extrabold tracking-tight">ItemHub</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/view" className={navLinkClass}>View Items</NavLink>
          <NavLink to="/add" className={navLinkClass}>Add Item</NavLink>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/view" onClick={() => setIsOpen(false)} className={navLinkClass}>View Items</NavLink>
          <NavLink to="/add" onClick={() => setIsOpen(false)} className={navLinkClass}>Add Item</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
