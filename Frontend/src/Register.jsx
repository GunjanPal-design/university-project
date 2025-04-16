import React from 'react';
import './Home.css';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    function onSubmit(data) {
        console.log('Form submitted successfully', data);
        alert('signup sucessfully')
        axios.post("http://localhost:4000/student/Register", data)
            .then((result) => {
                console.log(result)
                alert("Registration successful")


            }).catch((err) => {
                console.log("Registration error", err)
            })
        navigate("/Login")
    }




    return (
        <div>
            <div className="bg-[url('./assets/sign.jpg')] min-h-screen bg-no-repeat bg-cover bg-center flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-96 max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg">

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

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Staff_Id</label>
                        <input
                            {...register('Staff_Id', { required: 'Id is required' })}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your name"
                        />
                        {errors.Name && <p className="text-orange-400">{errors.Staff_Id.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            {...register('Department', { required: 'Id is required' })}
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your name"
                        />
                        {errors.Name && <p className="text-orange-400">{errors.Department.message}</p>}
                    </div>

                   

                   


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
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your phone number"
                        />
                        {errors['Phone No'] && <p className="text-orange-400">{errors['Phone No'].message}</p>}
                    </div>


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


                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            {...register('Password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                                    message: 'Password must include 8 characters,an uppercase letter, a number, and a special character'
                                }
                            })}
                            type="password"
                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                            placeholder="Enter your password"
                        />
                        {errors.Password && <p className="text-orange-400">{errors.Password.message}</p>}
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg ">
                            Register
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm">
                            Already have an account?
                            <a href="/Login" className="text-purple-600 ">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
