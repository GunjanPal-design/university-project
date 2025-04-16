import React from 'react';
import './Home.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log('Form submitted successfully', data);
        try {
            const response = await axios.post("http://localhost:4000/api/Signup", data);
            console.log("Registration success:", response.data);
            alert("Registration successful");
            navigate("/Login");
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            alert(err.response?.data?.error || "Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <div className="bg-[url('./assets/sign.jpg')] min-h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-96 max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg">

                    {/* Name */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            {...register('Name', { required: 'Name is required' })}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your name"
                        />
                        {errors.Name && <p className="text-orange-400">{errors.Name.message}</p>}
                    </div>

                    {/* Semester */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Semester:</label>
                        <input
                            {...register('Semester', { required: 'Semester is required' })}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your semester"
                        />
                        {errors.Semester && <p className="text-orange-400">{errors.Semester.message}</p>}
                    </div>

                    {/* Roll No */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Roll No:</label>
                        <input
                            {...register('Roll_No', { required: 'Roll No is required' })}
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your roll number"
                        />
                        {errors.Roll_No && <p className="text-orange-400">{errors.Roll_No.message}</p>}
                    </div>

                    {/* Phone No */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Phone No:</label>
                        <input
                            {...register('Phn_No', {
                                required: 'Phone No is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone number must be 10 digits long'
                                }
                            })}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your phone number"
                        />
                        {errors.Phn_No && <p className="text-orange-400">{errors.Phn_No.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            {...register('Email', {
                                required: 'Email Address is required',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: 'Please enter a valid email address'
                                }
                            })}
                            aria-invalid={errors.Email ? 'true' : 'false'}
                            type="email"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your email"
                        />
                        {errors.Email && <p className="text-orange-400">{errors.Email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            {...register('Password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: 'Password must include 8 characters, an uppercase letter, a number, and a special character'
                                }
                            })}
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your password"
                        />
                        {errors.Password && <p className="text-orange-400">{errors.Password.message}</p>}
                    </div>

                    {/* Submit */}
                    <div className="mb-2">
                        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg">
                            Sign Up
                        </button>
                    </div>

                    {/* Link to Login */}
                    <div className="text-center">
                        <p className="text-sm">
                            Already have an account?
                            <a href="/Login" className="text-purple-600 ml-1">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
