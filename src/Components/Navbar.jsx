import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlePostProjectClick = () => {
    const isAuthenticated = localStorage.getItem('Id');

    if (!isAuthenticated) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You must be logged in to post a project!',
      });
    } else {
      navigate('/detailproject');
    }
  };

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and main links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold ml-6 mr-20">
            HireHub
          </Link>
          
          {/* Main links for large screens */}
          <div className="hidden md:flex gap-12 cursor-pointer font-montserrat">
            <Link to="/" className="hover:text-gray-400">Hire Freelancers</Link>
            <Link to="/work" className="hover:text-gray-400">Find Work</Link>
            <Link to="/solutions" className="hover:text-gray-400">Solutions</Link>
          </div>
        </div>

        {/* Login, Sign Up, and Post Project buttons */}
        <div className="flex items-center gap-8 font-montserrat">
          <Link to="/login" className="hover:text-gray-400 hidden md:block">Log In</Link>
          <Link to="/signup" className="hover:text-gray-400 hidden md:block">Sign Up</Link>
          <button
            onClick={handlePostProjectClick}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 hidden md:block"
          >
            Post a Project
          </button>
        </div>

        {/* Mobile menu icon */}
        <div className="flex md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg> 
            ) : (
              <svg className="h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Dropdown menu for small screens */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Hire Freelancers</Link>
          <Link to="/work" className="block px-4 py-2 hover:bg-gray-700">Find Work</Link>
          <Link to="/solutions" className="block px-4 py-2 hover:bg-gray-700">Solutions</Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Log In</Link>
          <Link to="/signup" className="block px-4 py-2 hover:bg-gray-700">Sign Up</Link>
          <button
            onClick={handlePostProjectClick}
            className="block w-full text-left px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
          >
            Post a Project
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
