import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, isVerified, isRegistered, isApproved, children }) => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    const location = useLocation();

    const authRoutes = ['/auth/login', '/auth/register', '/auth/verify-email'];
    const dmsRoutes = ['/member/dms-member']; // DMS-specific routes
    const rotaractRoutes = ['/member/rotaract-member']; // Rotaract-specific routes

    // console.log("from checkAuth: ",user?.role);

    // 1. If user is not registered, allow access only to /auth/register and /auth/login
    if (!isRegistered) {
        if (location.pathname === '/auth/register' || location.pathname === '/auth/login') {
            return children;
        } else {
            return <Navigate to="/auth/login" />;
        }
    }

    // 2. If user is registered but not verified, allow access to /auth/login, /auth/register, and /auth/verify-email
    if (isRegistered && !isVerified) {
        if (location.pathname === '/auth/login' || location.pathname === '/auth/register' || location.pathname === '/auth/verify-email') {
            return children;
        } else {
            return <Navigate to="/auth/login" />;
        }
    }

    // 3. If user is registered, verified, but not approved, allow access only to /auth/login and /auth/register
    if (isRegistered && isVerified && !isApproved) {
        if (location.pathname === '/auth/login' || location.pathname === '/auth/register') {
            return children;
        } else {
            return <Navigate to="/auth/login" />;
        }
    }

    // 4. If user is registered, verified, approved but not authenticated, allow access only to /auth/login and /auth/register
    if (isRegistered && isVerified && isApproved && !isAuthenticated) {
        if (location.pathname === '/auth/login' || location.pathname === '/auth/register') {
            return children;
        } else {
            return <Navigate to="/auth/login" />;
        }
    }

    // 5. If user is authenticated, verified, and approved, restrict access to auth routes
    if (isAuthenticated && isVerified && isApproved) {
        // Redirect authenticated users to their respective dashboard
        if (location.pathname.startsWith('/auth/')) {
            if (user?.role === 'admin') {
                return <Navigate to="/admin" />;
            } else if (user?.role === 'DMS') {
                return <Navigate to="/member/dms-member" />;
            } else if (user?.role === 'Rotaract') {
                return <Navigate to="/member/rotaract-member" />;
            }
        }

        // Restrict access based on user roles
        if(user?.role === 'DMS' && location.pathname.includes("/rotaract-member")){
            return <Navigate to={"/member/dms-member"} />
        }
        if(user?.role === 'Rotaract' && location.pathname.includes("/dms-member")){
            return <Navigate to={"/member/rotaract-member"} />
        }
        if (user?.role === 'DMS' && rotaractRoutes.includes(location.pathname)) {
            return <Navigate to="/member/dms-member" />;
        }
        if (user?.role === 'Rotaract' && dmsRoutes.includes(location.pathname)) {
            return <Navigate to="/member/rotaract-member" />;
        }

        // Prevent admin from accessing member-specific routes
        if (user?.role === 'admin' && location.pathname.startsWith('/member')) {
            return <Navigate to="/admin" />;
        }

        // Prevent non-admin users from accessing admin routes
        if (user?.role !== 'admin' && location.pathname.startsWith('/admin')) {
            return <Navigate to={user?.role === 'DMS' ? '/member/dms-member' : '/member/rotaract-member'} />;
        }
    }

    // 6. Catch-all for non-authenticated users trying to access protected routes
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    // Allow access to protected content if all conditions are met
    return <>{children}</>;
};

export default CheckAuth;
