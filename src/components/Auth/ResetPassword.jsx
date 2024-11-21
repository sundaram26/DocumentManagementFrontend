import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/authSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { isLoading, resetLinkMessage } = useSelector((state) => state.auth);


    // Password validation function
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if password meets the criteria
        if (!validatePassword(password)) {
            toast.info(
                <div>
                <strong>Password Requirements:</strong>
                <ul style={{ marginLeft: "20px", textAlign: "left" }}>
                    <li>At least 1 uppercase letter</li>
                    <li>At least 1 lowercase letter</li>
                    <li>At least 1 number</li>
                    <li>At least 1 special character</li>
                    <li>Be at least 8 characters long</li>
                </ul>
                </div>,
                {
                position: "top-right",
                autoClose: 5000,  // Keeps the toast on screen for 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }
            );
            
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        setError('');

        // Dispatch reset password action
        dispatch(resetPassword({ token, password }))
            .unwrap()
            .then(() => {
                toast.success("Your password has been changed successfully! You can now log in.")
                navigate('/auth/login'); 
            })
            .catch((err) => {
                setError(err); 
            });
    };

    return (
        <section className="min-h-[calc(100vh-99px)] flex flex-col items-center justify-center bg-gray-100 py-6">
            {/* <p className='font-semibold text-3xl mb-4'>Welcome to Aaghaz!</p> */}
            <section className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
                
                {/* {resetLinkMessage && <p className="text-green-500 text-center">{resetLinkMessage}</p>} */}
                {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block mb-1">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your new password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${isLoading ? 'opacity-50' : ''}`}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default ResetPassword;
