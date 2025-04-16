import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchuserbyToken, updateUser } from './Slice/Sliceuni';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);
    const [success, setSuccess] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchuserbyToken(token))
                .then((data) => console.log("Fetched user", data))
                .catch((err) => console.log("Fetch error", err));
        }
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setValue("Name", user.Name);
            setValue("Semester", user.Semester);
            setValue("Roll_No", user.Roll_No);
            setValue("Phn_No", user.Phn_No);
            setValue("Email", user.Email);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const result = await dispatch(updateUser({ token, userData: data }));
                console.log('Update success:', result);
                setSuccess('Profile updated successfully!');
                setEditMode(false);
            } catch (err) {
                console.log('Update error:', err);
                setSuccess('Failed to update profile.');
            }
        }
    };

    return (
        <div className="bg-[url('./assets/sign.jpg')] min-h-screen bg-no-repeat bg-cover flex justify-center items-center">
            <div className="max-w-4xl w-full mx-auto p-4 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-white bg-purple-700 rounded-md py-2">Profile</h1>

                {loading && <p className="text-white">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {user ? (
                    <div className="space-y-4 bg-purple-100 p-6 rounded-lg shadow-lg">
                        {!editMode ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">Name:</p>
                                    <p className="text-gray-600">{user.Name}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">Semester:</p>
                                    <p className="text-gray-600">{user.Semester}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">Roll No:</p>
                                    <p className="text-gray-600">{user.Roll_No}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">Phone No:</p>
                                    <p className="text-gray-600">{user.Phn_No}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">Email:</p>
                                    <p className="text-gray-600">{user.Email}</p>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                                    <input {...register('Name', { required: 'Name is required' })}
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {errors.Name && <p className="text-orange-400">{errors.Name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Semester:</label>
                                    <input {...register('Semester', { required: 'Semester is required' })}
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {errors.Semester && <p className="text-orange-400">{errors.Semester.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Roll No:</label>
                                    <input {...register('Roll_No', { required: 'Roll No is required' })}
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {errors.Roll_No && <p className="text-orange-400">{errors.Roll_No.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone No:</label>
                                    <input {...register('Phn_No', {
                                        required: 'Phone No is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Phone number must be 10 digits long'
                                        }
                                    })}
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {errors.Phn_No && <p className="text-orange-400">{errors.Phn_No.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                                    <input {...register('Email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                            message: 'Please enter a valid email address'
                                        }
                                    })}
                                        type="email"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    {errors.Email && <p className="text-orange-400">{errors.Email.message}</p>}
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">Save</button>
                                    <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <p className="text-white text-center">No user data available</p>
                )}

                {success && <div className="text-center text-green-600">{success}</div>}
            </div>
        </div>
    );
};

export default Profile;
