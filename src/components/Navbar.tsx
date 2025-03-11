import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white">
      <Link to="/" className="text-blue-300 hover:text-blue-500">Home</Link>
      <Link to="/about" className="text-blue-300 hover:text-blue-500">About</Link>
      <Link to="/contact" className="text-blue-300 hover:text-blue-500">Contact</Link>
    </nav>
  );
};

export default Navbar;
