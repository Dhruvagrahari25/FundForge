import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        completionTargetDate: '',
        targetAmount: '',
        milestones: '', // comma separated string for input
        riskScore: 0,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                milestones: formData.milestones.split(',').map(s => s.trim()),
                targetAmount: Number(formData.targetAmount),
                riskScore: Number(formData.riskScore)
            }

            await api.post('/projects', payload);
            toast.success('Project created successfully!');
            navigate('/projects');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create project');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-3xl font-bold mb-6">Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Project Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border p-2 rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        className="w-full border p-2 rounded h-32"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Target Amount ($)</label>
                        <input
                            type="number"
                            name="targetAmount"
                            className="w-full border p-2 rounded"
                            value={formData.targetAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Risk Score (0-100)</label>
                        <input
                            type="number"
                            name="riskScore"
                            className="w-full border p-2 rounded"
                            value={formData.riskScore}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Completion Target Date</label>
                    <input
                        type="date"
                        name="completionTargetDate"
                        className="w-full border p-2 rounded"
                        value={formData.completionTargetDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Milestones (comma separated)</label>
                    <input
                        type="text"
                        name="milestones"
                        placeholder="e.g. Scripting, Shooting, Editing"
                        className="w-full border p-2 rounded"
                        value={formData.milestones}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
                    Launch Project
                </button>
            </form>
        </div>
    );
};

export default CreateProject;
