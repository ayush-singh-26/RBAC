import React from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    // Handles form submission
    const onSignUp = async (data) => {

        const formData = new FormData();

        // Manually append each field from `data` to `FormData`
        for (let key in data) {
            formData.append(key, data[key]);
        }

        console.log(formData);
        

        try {
            const response = await axios.post(`api/v1/signUp`,{

                fullname:data.fullname,
                email: data.email,
                username: data.username,
                password: data.password,
                role: data.role
            }
            );
            console.log("Response data:", response.data);
            if (response.data.success) {
                setMessage(response.data.message);
                localStorage.setItem('token', response.data.token);
                console.log("Token saved:", response.data.token);
                navigate('/login');
            } else {
                setMessage(response.data.message);
            }
        } catch (e) {
            setMessage(e.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full p-8 max-w-md bg-gray-800 text-white space-y-6 rounded-md shadow-md">
                <form onSubmit={handleSubmit(onSignUp)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-300">
                            Fullname:
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter your fullname"
                            {...register('fullname', { required: "Full name is required" })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register('username', { required: "Username is required" })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    {/* Role Dropdown */}
                    <div className="space-y-2">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                            Role:
                        </label>
                        <select
                            id="role"
                            {...register('role', { required: "Role is required" })}
                            className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center text-gray-300 cursor-pointer" onClick={() => navigate('/login')}>
                        Already have an account?
                    </p>
                </form>
                {message && <p className="text-center text-red-500 mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default SignUp;
