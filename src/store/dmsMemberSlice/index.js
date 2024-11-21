import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    meetingReport: [],
    dmsMeetingByUser: [],
    dmsMeetingDraft: null,
    dmsMeetingDraftByUser: [],
    activityReport: [],
    activityReportsByUser: [],
    activityDraft: null,
    activityDraftByUser: [],
    error: null,
};

export const createMeetingReport = createAsyncThunk(
    'meetingReports/createMeetingReport',
    async (formData) => {
        // console.log("create meeting report: ", formData)
        const response = await axios.post(
            `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/meeting-reports`,
            formData,
            { withCredentials: true }
        );
        // console.log("Server response:", response.data);
        return response.data;
    }
);

export const getDmsMeetingByUser = createAsyncThunk(
    'dmsReports/getDmsMeetingByUser',
    async ({userId, page = 1, limit = 10, searchQuery }) => {
        const response = await axios.get(
            `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/meeting-reports`,
            { 
              params: { userId, page, limit, searchQuery },
              withCredentials: true 
            }
        );
        // console.log("getting response from backend: ",response.data);
        return response.data;
    }
);

export const deleteDmsMeeting = createAsyncThunk(
  'draft/deleteDmsMeeting',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/meeting-reports/${meetingId}`,
        { withCredentials: true }
      );
      // console.log("delete response: ",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
  
export const createDmsMeetingDraft = createAsyncThunk(
    'draft/createDmsDraft',
    async (formData , { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/draft-meeting`,
          formData,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
);
  
export const getDmsMeetingDrafts = createAsyncThunk(
    'draft/getDmsMeetingDrafts',
    async (userId , { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/draft-meeting`,
          {
            params:{userId}, 
            withCredentials: true 
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
);

export const deleteDmsMeetingDraft = createAsyncThunk(
    'draft/deleteDmsMeetingDraft',
    async (draftId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/draft-meeting/${draftId}`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
);




export const activityReport = createAsyncThunk(
    'activityReport',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
            `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/activity-reports`,
            formData,
            { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const fetchActivityReportsByUser = createAsyncThunk(
    'activityReports/fetchActivityReportsByUser',
    async ({userId, page = 1, limit = 10, searchQuery }) => {
        const response = await axios.get(
            `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/activity-reports`,
            { 
              params: { userId, page, limit, searchQuery },
              withCredentials: true 
            }
        );
        // console.log("getting response from backend: ",response.data);
        return response.data;
    }
);

export const deleteActivity = createAsyncThunk(
  'activity/deleteActivity',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/activity-reports/${activityId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
  
export const createActivityDraft = createAsyncThunk(
    'draft/createActivityDraft',
    async (formData , { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/draft-activity`,
          formData,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
);
  
export const getActivityDrafts = createAsyncThunk(
    'draft/getActivityDraft',
    async (userId , { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/draft-activity`,
          {
            params:{userId}, 
            withCredentials: true 
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
);
  
export const deleteActivityDraft = createAsyncThunk(
    'draft/deleteActivityDraft',
    async (draftId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `https://rotaract-and-dms-club.onrender.com/api/v1/members/dms/draft-activity/${draftId}`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data || error.message);
      }
    }
);

const meetingReportSlice = createSlice({
    name: 'dms',
    initialState,
    reducers: {
        clearMeetingReport: (state) => {
            state.meetingReport = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMeetingReport.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createMeetingReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.meetingReport = action.payload.data
                state.error = null;
            })
            .addCase(createMeetingReport.rejected, (state, action) => {
                state.isLoading = false;
                state.meetingReport = [];
                state.error = action.payload;
            })

            .addCase(getDmsMeetingByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDmsMeetingByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingByUser = action.payload.data; 
                state.totalPages = action.payload.totalPages; 
                state.currentPage = action.payload.currentPage;
                state.error = null;
            })
            .addCase(getDmsMeetingByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingByUser = [];
                state.error = action.payload || action.error.message;
            })

            .addCase(deleteDmsMeeting.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(deleteDmsMeeting.fulfilled, (state, action) => {
              state.isLoading = false;
              state.dmsMeetingByUser = []
              state.error = null;
            })
            .addCase(deleteDmsMeeting.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload || action.error.message;
            })
    
            //create draft
            .addCase(createDmsMeetingDraft.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createDmsMeetingDraft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingDraft = action.payload.message; 
                state.error = null;
            })
            .addCase(createDmsMeetingDraft.rejected, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingDraft = null;
                state.error = action.payload || action.error.message;
            })
    
            // delete draft activity
            .addCase(deleteDmsMeetingDraft.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDmsMeetingDraft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingDraft = null;
                state.error = null;
            })
            .addCase(deleteDmsMeetingDraft.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    
            //get draft activity
            .addCase(getDmsMeetingDrafts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDmsMeetingDrafts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingDraftByUser = action.payload.data; 
                state.error = null;
            })
            .addCase(getDmsMeetingDrafts.rejected, (state, action) => {
                state.isLoading = false;
                state.dmsMeetingDraftByUser = [];
                state.error = action.payload || action.error.message;
            })


            .addCase(activityReport.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(activityReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activityReport = action.payload.data || action.payload;
                state.error = null;
            })
            .addCase(activityReport.rejected, (state, action) => {
                state.isLoading = false;
                state.activityReport = [];
                state.error = action.payload || action.error.message;
            })

            //fetch activity reports by user
            .addCase(fetchActivityReportsByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchActivityReportsByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activityReportsByUser = action.payload.data; 
                state.totalPages = action.payload.totalPages; 
                state.currentPage = action.payload.currentPage;
                state.error = null;
            })
            .addCase(fetchActivityReportsByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.activityReportsByUser = [];
                state.error = action.payload || action.error.message;
            })

            .addCase(deleteActivity.pending, (state) => {
              state.isLoading = true;
              state.error = null;
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
              state.isLoading = false;
              state.activityReportsByUser = [];
              state.error = null;
            })
            .addCase(deleteActivity.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload || action.error.message;
            })


            //save as draft
            .addCase(createActivityDraft.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createActivityDraft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activityDraft = action.payload.message; 
                state.error = null;
            })
            .addCase(createActivityDraft.rejected, (state, action) => {
                state.isLoading = false;
                state.activityDraft = null;
                state.error = action.payload || action.error.message;
            })

            // delete draft activity
            .addCase(deleteActivityDraft.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteActivityDraft.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activityDraft = null;
                state.error = null;
            })
            .addCase(deleteActivityDraft.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            //get draft activity
            .addCase(getActivityDrafts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getActivityDrafts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.activityDraftByUser = action.payload.data; 
                state.error = null;
            })
            .addCase(getActivityDrafts.rejected, (state, action) => {
                state.isLoading = false;
                state.activityDraftByUser = [];
                state.error = action.payload || action.error.message;
            })
    }
});

export const { clearMeetingReport } = meetingReportSlice.actions;
export default meetingReportSlice.reducer;
