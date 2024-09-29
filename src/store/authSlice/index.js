import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadUserFromLocalStorage = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        return null;
    }
};

const setTimerEndTime = () => {
    const endTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
    localStorage.setItem('logoutTimer', endTime);
};


const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    isLoading: false,
    user: loadUserFromLocalStorage(),
    isRegistered: localStorage.getItem("isRegistered") === "true",
    isVerified: localStorage.getItem("isVerified") === "true",
    isApproved: localStorage.getItem("isApproved") === "true",
    resendEmailTimer: 0,
    canResendEmail: true,
    error: null,
};

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData) => {
        const response = await axios.post(
            `https://rotaractanddmsclub.onrender.com/api/v1/users/register`, 
            formData, 
            { withCredentials: true }
        );
        return response.data;
    }
);

export const verifyEmail = createAsyncThunk(
    'auth/verify-email',
    async (verificationCode) => {
        const response = await axios.post(
            `https://rotaractanddmsclub.onrender.com/api/v1/users/verify-otp`,
            { verificationCode },
            { withCredentials: true }
        );
        return response.data;
    }
);

export const resendVerificationEmail = createAsyncThunk(
    'auth/resend-verification-email',
    async () => {
        const response = await axios.post(
            `https://rotaractanddmsclub.onrender.com/api/v1/users/resend-otp`,
            {},
            { withCredentials: true }
        );
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData) => {
        // console.log("form data: ", formData)
        const response = await axios.post(
            `https://rotaractanddmsclub.onrender.com/api/v1/users/login`,
            formData,
            { withCredentials: true }
        );
        // console.log("backend returned: ", response.data)
        return response.data;
    }
);

export const checkAuth = createAsyncThunk(
    "/auth/checkAuth",
    async () => {
        const response = await axios.get(
            `https://rotaractanddmsclub.onrender.com/api/v1/users/check-auth`,
            {
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                }
            }
        );
        return response.data;
    }
);


export const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        const response = await axios.post(
            `https://rotaractanddmsclub.onrender.com/api/v1/users/logout`,
            {},
            { withCredentials: true }
        )
        // console.log("logout: ", response.data)
        return response.data;
    }
)


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCanResendEmail: (state, action) => {
            state.canResendEmail = action.payload;
        },
        setResendEmailTimer: (state, action) => {
            state.resendEmailTimer = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isVerified = false;
            state.isApproved = false;
            localStorage.removeItem;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isRegistered = true;
            state.isAuthenticated = false;
            localStorage.setItem("isRegistered", "true");
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(verifyEmail.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(verifyEmail.fulfilled, (state) => {
            state.isLoading = false;
            state.isVerified = true;
            localStorage.setItem("isVerified", "true");
        })
        .addCase(verifyEmail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(resendVerificationEmail.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(resendVerificationEmail.fulfilled, (state) => {
            state.isLoading = false;
            state.canResendEmail = false;
            state.resendEmailTimer = 60; // 1 minute
            state.error = null;
        })
        .addCase(resendVerificationEmail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const { data } = action.payload;
            const { response, user } = data;
            const { isApproved, isVerified } = response;
            state.isRegistered = true;
            state.isVerified = isVerified;
            state.isApproved = isApproved;
            state.isAuthenticated = true;
            state.user = user || null;
            state.error = null;

            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("isRegistered", "true");
            localStorage.setItem("isVerified", isVerified ? "true" : "false");
            localStorage.setItem("isApproved", isApproved ? "true" : "false");
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            }
            setTimerEndTime();
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.error.message;
        })
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            const { user, isVerified = true, isApproved = true } = action.payload;
            state.isAuthenticated = true;
            state.isVerified = isVerified;
            state.isApproved = isApproved;
            state.user = user;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.isVerified = false;
            state.isApproved = false;
            state.error = action.error.message;
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.isVerified = false;
            state.isApproved = false;
            localStorage.removeItem('logoutTimer');
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("isRegistered");
            localStorage.removeItem("isVerified");
            localStorage.removeItem("isApproved");
            localStorage.removeItem("user");
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export const { setUser, setError, setCanResendEmail, setResendEmailTimer, clearUser } = authSlice.actions;
export default authSlice.reducer;
