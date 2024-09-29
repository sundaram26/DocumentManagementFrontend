import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { verifyEmail, resendVerificationEmail, setCanResendEmail, setResendEmailTimer } from '../../store/authSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {

    // const location = useLocation();
    const navigate = useNavigate();
    // const searchParams = new URLSearchParams(location.search);
    // const email = searchParams.get("email")
    // console.log(location.search);

    const [verificationCode, setVerificationCode] = useState('');
    const dispatch = useDispatch();
    const { isLoading, canResendEmail, resendEmailTimer, error } = useSelector(state => state.auth);

    useEffect(() => {
        let timer;
        if (!canResendEmail && resendEmailTimer > 0) {
            timer = setInterval(() => {
                dispatch(setResendEmailTimer(resendEmailTimer - 1));
            }, 1000);
        } else if (resendEmailTimer <= 0) {
            dispatch(setCanResendEmail(true));
            dispatch(setResendEmailTimer(0));
        }
        return () => clearInterval(timer);
    }, [canResendEmail, resendEmailTimer, dispatch]);

    const handleVerify = (e) => {
        e.preventDefault();
        // console.log("I am in handle Verify")
        dispatch(verifyEmail(verificationCode)).then((data) => {
            // console.log("Verify Email: ", data.payload.success)
            if (data?.payload?.success) {
                toast.success('Email verified successfully!');
                navigate("/auth/login")
            } else {
                toast.error('Invalid or expired verification code.');
            }
        });
    };

    const handleResend = () => {
        dispatch(resendVerificationEmail()).then((data) => {
            if (data?.payload?.success) {
                // console.log("verification email: ", data.payload.success)
                toast.success('Verification email resent!');
                dispatch(setCanResendEmail(false));
                dispatch(setResendEmailTimer(60)); // 5 minutes
            } else {
                toast.error('Failed to resend verification email.');
            }
        });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
            <section className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                <p className="text-2xl font-semibold text-center text-gray-700 mb-6">Verify your email</p>
                <form onSubmit={handleVerify} className="space-y-4">
                    <input
                        type="text"
                        name="verificationCode"
                        value={verificationCode}
                        placeholder="Enter verification code"
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Didn't receive the email?{" "}
                    {canResendEmail ? (
                        <button
                            className="text-green-500 ml-2"
                            onClick={handleResend}
                            disabled={isLoading}
                        >
                            Resend
                        </button>
                    ) : (
                        <span className="text-gray-500 ml-2">Please wait {resendEmailTimer}s</span>
                    )}
                </p>
                {/* {error && <p className="text-red-500 text-center mt-4">{error}</p>} */}
            </section>
        </section>
    );
};

export default VerifyEmail;
