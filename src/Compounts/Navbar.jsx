import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../Config/Firebase/Firebasemethode';
import { FaHome, FaUserAlt, FaSignOutAlt, FaPen, FaUserPlus, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(true); // Replace this with actual user state logic
  const navigate = useNavigate();
  

  return (
    <nav className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo / Branding */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          Blogging App
        </Link>

        {/* Navbar Links */}
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-200">
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="/disborad" className="flex items-center gap-2 hover:text-gray-200">
            <FaPen /> <span>Dashboard</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/profile" className="flex items-center gap-2 hover:text-gray-200">
                <FaUserCircle /> <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  signOutUser()
                    .then((res) => {
                      console.log(res);
                      navigate('/login');
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <FaSignOutAlt /> <span>Logout</span>  
                
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="flex items-center gap-2 hover:text-gray-200">
                <FaUserAlt /> <span>Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-2 hover:text-gray-200">
                <FaUserPlus /> <span>Register</span>
              </Link>
            </div>
          )}
        </div>
        <Link to="/register" className="flex items-center gap-2 hover:text-gray-200">
                <FaUserPlus /> <span>Register</span>
              </Link>
      </div>
    </nav>
  );
};

export default Navbar;
