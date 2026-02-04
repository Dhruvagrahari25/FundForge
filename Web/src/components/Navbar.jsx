import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">FundForge</Link>
                <div className="space-x-4">
                    <Link to="/projects" className="hover:text-gray-300">Projects</Link>
                    {user ? (
                        <>
                            {user.role === 'creator' && (
                                <Link to="/create-project" className="hover:text-gray-300">Create Project</Link>
                            )}
                            {user.role === 'creator' && (
                                <Link to="/creator-profile" className="hover:text-gray-300">My Profile</Link>
                            )}
                            {user.role === 'investor' && (
                                <Link to="/investor-profile" className="hover:text-gray-300">My Portfolio</Link>
                            )}
                            <span className="text-gray-400">Hello, {user.name}</span>
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/register" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
