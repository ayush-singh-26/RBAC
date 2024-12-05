// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    const role = localStorage.getItem('role'); 

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
    <div className="flex space-x-6">
        {role === 'admin' && (
            <Link to="/admin" className="hover:text-blue-400 transition duration-300">Admin</Link>
        )}
        {role === 'moderator' && (
            <Link to="/moderator" className="hover:text-blue-400 transition duration-300">Moderator</Link>
        )}
        {role === 'user' && (
            <Link to="/user" className="hover:text-blue-400 transition duration-300">User</Link>
        )}
    </div>
    <Link
        to="/login"
        className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
    >
        Login
    </Link>
    <Link
        to="/signUp"
        className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
    >
        Sign up
    </Link>
    
</nav>

    );
}

export default Navbar;
