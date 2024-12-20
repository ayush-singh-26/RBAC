import '../App.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './Url';


function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const onLogin = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/v1/login`, {
                email: data.email,
                password: data.password,
            });
            
            
            setLoading(false);
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('role', response.data.data.user.role);
            const role=response.data.data.user.role;
            
            

            if (role === 'admin') navigate('/dashBoard/admin');
            else if (role === 'moderator') navigate('/dashBoard/moderator');
            else navigate('/dashBoard/user');
        } catch (e) {
            setLoading(false);
            if (e.response && e.response.data && e.response.data.message) {
                setMessage('Error: ' + e.response.data.message);
            } else {
                setMessage('Error: ' + e.message);
            }
        }
    };

    return (
        <>
            <div className='w-full flex justify-center items-center min-h-screen bg-gray-900'>
                <div className='w-full p-8 max-w-md rounded-md bg-gray-800 space-y-6 shadow-md'>
                    <form onSubmit={handleSubmit(onLogin)} className='space-y-3'>
                        <div className='space-y-2'>
                            <label htmlFor='email' className='text-gray-300'>Email:</label>
                            <input
                                type='email'
                                placeholder='Enter your Email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Please enter a valid email address',
                                    },
                                })}
                                className='w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600'
                            />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='password' className='text-gray-300'>Password:</label>
                            <input
                                type='password'
                                placeholder='Enter your Password'
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                className='w-full p-2 rounded-md bg-gray-700 text-gray-200 border border-gray-600'
                            />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                        <div className='flex justify-center'>
                            <button type='submit' className='p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700'>
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </div>
                        <p className="text-center text-gray-300 cursor-pointer" onClick={() => navigate('/register')}>
                            New user?
                        </p>
                    </form>
                    {message && <p className='text-center text-gray-300'>{message}</p>}
                </div>
            </div>
        </>
    );
}

export default Login;
