import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, loginUser } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa";

const AuthLogin = () => {

  const dispatch = useDispatch()
  // const { isVerified, isApproved } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleForgotPassword = async () => {
    setLoading(true);

    if (!email) {
      toast.warn("Please provide your email!");
      return;
    } else if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    try {
      const actionResult = await dispatch(forgotPassword(email));
      const { success, message } = actionResult?.payload || {};

      if (success) {
        toast.success(message || "Password reset link sent successfully. Check your email.");
      } else if (actionResult.error) {
        toast.error(actionResult.error.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Error in forgot password:", error);
      toast.error("An unexpected error occurred while sending the reset link.");
    } finally{
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    // Frontend validations
    if (!email) {
        toast.error("Email is required");
        return;
    } else if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
    }

    if (!password) {
        toast.error("Password is required");
        return;
    }

    try {
        // Dispatching the login action
        // console.log("in try block");
        const actionResult = await dispatch(loginUser(formData));
        const { data, success } = actionResult?.payload || {};
        // console.log("actionResult: ", actionResult);
        // setLoading(true)
        

        // Backend response handling
        if (data) {
            const { response, user } = data;

            if (!response.isVerified) {
                toast.error("Email is not verified");
                toast.success("Redirecting to email verification page");
                navigate("/auth/verify-email");
                return;
            }

            if (!response.isApproved) {
                toast.error("You can log in once the admin accepts your request.");
                return;
            }

            if (success) {
                setLoginLoading(false);
                toast.success("Login Successful");
                switch (user?.role) {
                    case 'admin':
                        navigate("/admin");
                        break;
                    case 'DMS':
                        navigate("/member/dms-member");
                        break;
                    case 'Rotaract':
                        navigate("/member/rotaract-member");
                        break;
                    default:
                        toast.error("Unexpected user role");
                        break;
                }
                return;
            } else {
                toast.error("Login failed!");
            }
        } else if(actionResult.error.name === "AxiosError"){
            if(actionResult.error.message === "Request failed with status code 401"){
              toast.error("Email or Password is incorrect!!");
              return;
            } else if(actionResult.error.message === "Request failed with status code 404"){
              toast.error("Your email is not registered!!");
              navigate("/auth/register")
              return;
            }
        } else {
          toast.error("Unexpected response format");
        }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Some unexpected error occurred!!!")
    }
  
  };


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <section className="min-h-[calc(100vh-99px)] flex flex-col items-center justify-center bg-gray-100 py-6">
      <p className='font-semibold text-3xl mb-4'>Welcome to Aaghaz!</p>
      <section className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <p className="text-2xl font-semibold text-center text-gray-700 mb-6">Login to your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className='flex justify-end items-center'>
            <p className='text-green-500 font-medium cursor-pointer' onClick={handleForgotPassword}>
              {loading ? (
                <span className='flex items-center'>
                  <FaSpinner className='animate-spin mr-2' /> 
                  Please wait...
                </span>
              ) : (
                "Forgot Password"
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-geen-500 mr-2"
            >
              {loginLoading ? (
                <span className='flex items-center'>
                  <FaSpinner className='animate-spin mr-2' /> 
                  Please wait...
                </span>
              ) : (
                "Login"
              )}
            </button>
            <Link to='/auth/register' className='w-full'>
              <button
                type="button"
                className="w-full p-3 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                
                Register
              </button>
            </Link>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AuthLogin;
