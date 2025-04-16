import React, { useState } from 'react';
import "./Home.css";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setErrorMessage('');
        console.log('Form submitted:', data);

        try {
            const result = await axios.post("http://localhost:4000/api/Login", data);
            console.log("Login success:", result.data);
            localStorage.setItem("token", result.data.token);
            alert("Login successful");
            navigate("/Dashboard");
        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            setErrorMessage(err.response?.data?.error || 'Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="bg-[url('./assets/sign.jpg')] min-h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-96 max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg">

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        {...register('Email', {
                            required: 'Email Address is required',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: 'Please enter a valid email address'
                            }
                        })}
                        type="email"
                        className="mt-1 block w-full border border-purple-900 rounded-lg p-2"
                        placeholder="Enter your email"
                    />
                    {errors.Email && <p className="text-orange-400 text-sm">{errors.Email.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
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
                        className="mt-1 block w-full border border-purple-900 rounded-lg p-2"
                        placeholder="Enter your password"
                    />
                    {errors.Password && <p className="text-orange-400 text-sm">{errors.Password.message}</p>}
                </div>

                {/* Error Message */}
                {errorMessage && <p className="text-red-500 text-center text-sm mb-4">{errorMessage}</p>}

                {/* Submit */}
                <div className="mb-4">
                    <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg">
                        Login
                    </button>
                </div>

                {/* Signup Redirect */}
                <div className="text-center text-sm">
                    <p>
                        Create an account?{' '}
                        <a href="/Signup" className="text-purple-600 hover:underline">Signup</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
