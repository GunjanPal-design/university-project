import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchuserbyToken } from '../src/Slice/Sliceuni';
import './Home.css';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.user);
    console.log("udserrrrrrr", user)

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token in Dashboard: ", token); // Check token value
        if (token) {
            dispatch(fetchuserbyToken(token))
                .then((data) => console.log("Fetched user", data))
                .catch((data) => console.log("Fetch error", data))
        }
    }, [dispatch]);
    

    return (
        <div className='bg-amber-300'>
            <div className="flex min-h-screen">
                <div className="bg-purple-900 text-white p-4 w-64">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="mt-4">
                        <h2 className="p-2 bg-purple-900">Schedule</h2>
                        <h2 className="p-2 bg-purple-900">Grades</h2>
                        <h2 className="p-2 bg-purple-900">Program</h2>
                        <h2 className="p-2 bg-purple-900">Scholarships</h2>
                        <h2 className="p-2 bg-purple-900">Payments</h2>
                    </div>
                </div>

                <div className="bg-fuchsia-200 w-full p-4">
                    <h2 className="text-2xl font-bold"><div>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {user ? (
                            <h1>Welcome, {user?.Name}</h1>

                        ) : (
                            <p>No user data available</p>
                        )}
                    </div> </h2>
                    <p>Here is your personalized dashboard content.</p>

                    <div className='flex space-x-10 mt-10'>
                        <div className='bg-amber-400 p-10'><a href="/Profile">Profile</a></div>
                        <div className='bg-amber-400 p-10'>Examinations</div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
