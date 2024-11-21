import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the admin slice
const initialState = {
    isLoading: false,
    users: [], 
    error: null,
    groupedUsers: {
        DMS: [],
        Rotaract: [],
    },
    reports: [],
};

// Async thunk to fetch unapproved users
export const fetchUnapprovedUsers = createAsyncThunk(
    'admin/fetchUnapprovedUsers',
    async () => {
        const response = await axios.get(
            `https://rotaract-and-dms-club.onrender.com/api/v1/admin/requests`, 
            { withCredentials: true }
        );
        return response.data; // Adjust according to your response structure
    }
);

// Async thunk to approve a user
export const approveUser = createAsyncThunk(
    'admin/approveUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `https://rotaract-and-dms-club.onrender.com/api/v1/admin/approve-user/${userId}`,
                {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const disApproveUser = createAsyncThunk(
    'admin/disapproveUser',
    async (userId, {rejectWithValue}) => {
        try{
            const response = await axios.post(
                `https://rotaract-and-dms-club.onrender.com/api/v1/admin/disapprove-user/${userId}`,
                {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error){
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async () => {
    const response = await axios.get(`https://rotaract-and-dms-club.onrender.com/api/v1/admin/get-users`);
    // console.log("user response: ", response.data.data)
    return response.data.data;
});

export const fetchReportsByUser = createAsyncThunk(
    'admin/fetchReportsByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://rotaract-and-dms-club.onrender.com/api/v1/reports/user-reports/${userId}`, {
                withCredentials: true
            });
            return response.data.data; // Adjust according to your response structure
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.users = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUnapprovedUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUnapprovedUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data; 
                state.error = null;
            })
            .addCase(fetchUnapprovedUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            
            // Approve user
            .addCase(approveUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(approveUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.map(user => 
                    user._id === action.payload._id ? action.payload : user
                );
                state.error = null;
            })
            .addCase(approveUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(disApproveUser.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(disApproveUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // Remove the user from the list after disapproval (deletion)
                state.users = state.users.filter(user => user._id !== action.payload._id);
                state.error = null;
            })
            .addCase(disApproveUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            // Fetch and group users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                
                // Group users by role
                const grouped = {
                    DMS: [],
                    Rotaract: [],
                };
                action.payload.forEach((user) => {
                    if (user.role in grouped) {
                        grouped[user.role].push(user);
                    }
                });
                state.groupedUsers = grouped;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            
            // Fetch reports by user
            .addCase(fetchReportsByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReportsByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload; // Store reports
                state.error = null;
            })
            .addCase(fetchReportsByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            });
            
    }
});

// Export actions and reducer
export const { clearUsers } = adminSlice.actions;
export default adminSlice.reducer;
