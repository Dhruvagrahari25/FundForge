import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const InvestorProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/investors/profile');
                setProfile(data);
            } catch (error) {
                // Try to create one if it doesn't exist
                try {
                    const { data } = await api.post('/investors/profile');
                    setProfile(data);
                } catch (e) {
                    console.error("Error fetching/creating profile", e);
                }
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">My Investment Portfolio</h2>

            <div className="bg-white p-6 rounded shadow mb-8">
                <h3 className="text-xl font-bold mb-2">{profile?.user?.name}</h3>
                <p className="text-gray-500">{profile?.user?.email}</p>
            </div>

            <h3 className="text-2xl font-bold mb-4">Investments</h3>
            {profile?.investments && profile.investments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4 text-left">Project</th>
                                <th className="p-4 text-left">Amount Invested</th>
                                <th className="p-4 text-left">Stake (%)</th>
                                <th className="p-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.investments.map((inv, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="p-4 font-bold">{inv.project?.name || 'Unknown Project'}</td>
                                    <td className="p-4 text-green-600">${inv.amount}</td>
                                    <td className="p-4">{inv.stake}%</td>
                                    <td className="p-4 text-gray-500">{new Date(inv.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white p-8 rounded shadow text-center">
                    <p className="text-gray-500 text-lg mb-4">You haven't made any investments yet.</p>
                    <a href="/projects" className="text-blue-600 hover:underline">Browse Projects to Invest</a>
                </div>
            )}
        </div>
    );
};

export default InvestorProfile;
