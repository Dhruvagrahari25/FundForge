import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data } = await api.get(`/projects/${id}`);
                setProject(data);
            } catch (error) {
                console.error('Failed to fetch project details', error);
            }
        };
        fetchProject();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-8 rounded shadow">
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            <p className="text-gray-500 mb-6">By {project.creator?.name || 'Unknown Creator'}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold mb-2">Description</h3>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">{project.description}</p>

                    <h3 className="text-xl font-bold mb-2">Milestones</h3>
                    <ul className="list-disc list-inside mb-6">
                        {project.milestones.map((milestone, idx) => (
                            <li key={idx} className="text-gray-700">{milestone}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded border">
                    <h3 className="text-lg font-bold mb-4">Funding Status</h3>
                    <div className="mb-2">
                        <span className="text-3xl font-bold text-green-600">${project.fundsRaised}</span>
                        <span className="text-gray-500"> raised of ${project.targetAmount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                        <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min((project.fundsRaised / project.targetAmount) * 100, 100)}%` }}
                        ></div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-600"><strong>Launch Date:</strong> {new Date(project.launchDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600"><strong>Target Completion:</strong> {new Date(project.completionTargetDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600"><strong>Risk Score:</strong> {project.riskScore}/100</p>
                    </div>

                    <button className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
                        Invest Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
