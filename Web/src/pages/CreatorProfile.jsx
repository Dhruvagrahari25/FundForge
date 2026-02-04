import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const CreatorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/creators/profile');
            setProfile(data);
            setDescription(data.description);
        } catch (error) {
            // if not found, it might be a new creator
            console.log("Profile not found or error", error);
        }
    };

    const handleSave = async () => {
        try {
            const { data } = await api.post('/creators/profile', { description });
            setProfile(data);
            setIsEditing(false);
            toast.success('Profile updated');
            fetchProfile(); // refresh to get populated data if needed
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">My Creator Profile</h2>

            <div className="bg-white p-6 rounded shadow mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold">{profile?.user?.name || 'Your Name'}</h3>
                        <p className="text-gray-500">{profile?.user?.email}</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-blue-600 hover:underline"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                {isEditing ? (
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">About user</label>
                        <textarea
                            className="w-full border p-2 rounded h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell investors about yourself..."
                        />
                        <button
                            onClick={handleSave}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                        {profile?.description || 'No description added yet.'}
                    </p>
                )}
            </div>

            <h3 className="text-2xl font-bold mb-4">My Projects</h3>
            {profile?.projects && profile.projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.projects.map(project => (
                        <div key={project._id} className="bg-white p-4 rounded shadow border">
                            <h4 className="font-bold text-lg">{project.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${Math.min((project.fundsRaised / project.targetAmount) * 100, 100)}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-right mt-1">
                                ${project.fundsRaised} / ${project.targetAmount}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">You haven't created any projects yet.</p>
            )}
        </div>
    );
};

export default CreatorProfile;
