import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Discover Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded shadow p-6">
                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-green-600">
                                Target: ${project.targetAmount}
                            </span>
                            <span className="text-sm text-gray-500">
                                Raised: ${project.fundsRaised}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${Math.min((project.fundsRaised / project.targetAmount) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <Link
                            to={`/projects/${project._id}`}
                            className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
