import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutUser } from '../../store/authSlice';
import { LuLogOut } from "react-icons/lu";
import { logo2, mainLogo } from '../../assets';


const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour = 3600 seconds
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));
//   console.log(user)

  // Function to handle logout
  const handleLogout = async () => {
    // console.log(await dispatch(logoutUser))
    try {
        const actionResult = await dispatch(logoutUser()).unwrap(); // Using unwrap() for handling response
        // console.log(actionResult);
        toast.success("You have been successfully logged out.");
        navigate('/auth/login');
    } catch (error) {
        toast.error("An error occurred during logout.");
    }
  };

  useEffect(() => {
    const initializeTimer = () => {
      // Retrieve end time from localStorage
      const endTime = localStorage.getItem('logoutTimer');
      if (endTime) {
        const remainingTime = Math.max(0, Math.floor((parseInt(endTime) - Date.now()) / 1000));
        setTimeLeft(remainingTime);
      } else {
        // Set end time in localStorage for 1 hour from now
        const newEndTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
        localStorage.setItem('logoutTimer', newEndTime);
        setTimeLeft(3600); // 1 hour in seconds
      }
    };

    initializeTimer();
  }, []);

  useEffect(() => {
    if (timeLeft <= 1) {
      handleLogout();
      return;
    }

    // Set up the interval for the countdown
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000); // Decrease the time every second

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Function to format time in hh:mm:ss format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get menu items based on authentication state
  const getMenuItems = () => {
    if (!isAuthenticated) {
      return [];
    }
    // console.log(user.role)
    switch (user.role) {
      case 'admin':
        return ['Requests', 'Timer', 'Logout', 'logo2'];
      case 'DMS':
        return ['Activities', 'Meetings', 'Timer', 'Logout', 'logo2'];
      case 'Rotaract':
        return ['Projects', 'Meetings', 'MoU', 'Timer', 'Logout', 'logo2'];
      default:
        return ['Timer', 'Logout'];
    }
  };


  const getHomeLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'DMS':
        return '/member/dms-member';
      case 'Rotaract':
        return '/member/rotaract-member';
      default:
        return '/';
    }
  };

  return (
    <nav className="flex justify-between items-center px-12 text-black border-b-zinc-200 border-b-[1px]">
      <div>
        <Link to={getHomeLink()} aria-label="Home">
          <img src={mainLogo} alt="Home" className="w-48 h-auto p-0 m-0" /> {/* Home Image */}
        </Link>
      </div>
      <div className="space-x-4 flex items-center">
        {getMenuItems().map((item, index) =>
          item === 'Logout' ? (
            <button key={index} onClick={handleLogout} className="hover:underline font-bold text-pink-500 inline-flex items-center space-x-2">
              <span>Logout</span>
              <LuLogOut className='font-bold text-2xl' />
            </button>
          ) : item === 'logo2' ? (
            <img src={logo2} alt="logo2" className="w-28 h-24 p-1 m-0" />
          ) : item === 'Timer' ? (
            <span key={index} className="timer">
              <span className='font-bold'>Time Left:</span> {formatTime(timeLeft)}
            </span>
          ) : (
            <Link key={index} to={`${getHomeLink()}/${item.toLowerCase()}`} className="hover:font-semibold" aria-label={item}>
              {item}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
