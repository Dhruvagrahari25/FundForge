import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-bold mb-4">Welcome to FundForge</h1>
            <p className="text-xl text-gray-600 mb-8">
                Empowering creators and investors with programmable payments and transparent funding.
            </p>
            <div className="space-x-4">
                <Link to="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
                    Explore Projects
                </Link>
                <Link to="/register" className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-900">
                    Start Creating
                </Link>
            </div>
        </div>
    );
};

export default Home;
