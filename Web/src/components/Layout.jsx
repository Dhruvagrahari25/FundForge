import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar />
            <main className="container mx-auto p-4">
                {children}
            </main>
            <Toaster />
        </div>
    );
};

export default Layout;
