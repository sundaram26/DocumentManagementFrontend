import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../store/authSlice';

const initialState = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false)

  // console.log(formData)
  const { firstName, lastName, role, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      toast.info("Invalid email format!", {
        position: toast.position.top_right
      });
      return;
    }

    if (role === "select") {
      toast.error("Please select a valid role.");
      return;
    }    

    // Check if password meets the criteria
    if (!validatePassword(password)) {
      toast.error(
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

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const actionResult = await dispatch(registerUser(formData));
      const response = actionResult.payload;

      // console.log("response: ",response)

      if (response?.success) {
        setLoading(false);
        // console.log("Navigating to verification page")
        navigate('/auth/verify-email');
      } else {
        toast.error(response?.message || "Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  return (
    <section className="w-full min-h-[calc(100vh-99px)] flex flex-col items-center bg-gray-100 py-6">
      <p className='font-semibold text-3xl mb-4'>Welcome to Aaghaz!</p>
      <section className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <p className="text-2xl font-semibold text-center text-gray-700 mb-6">Please create an account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Enter your first name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Enter your last name"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            name="role"
            value={ role || 'select'}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="select" disabled>Choose your role</option>
            <option value="DMS">DMS</option>
            <option value="Rotaract">Rotaract</option>
          </select>
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
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-geen-500 mr-2"
            >
              {loading ? (
                <span className='flex items-center justify-center'>
                  <FaSpinner className='animate-spin mr-2' /> 
                  Please wait...
                </span>
              ) : (
                "Register"
              )}
            </button>

            <Link to='/auth/login' className='w-full'>
              <button
                type="button"
                className="w-full p-3 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                  Login
              </button>
            </Link>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AuthRegister;
