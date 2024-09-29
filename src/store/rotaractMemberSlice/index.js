import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  meetingReport: [],
  rotaractMeetingByUser: [],
  rotaractMeetingDraft: null,
  rotaractMeetingDraftByUser: [],

  projectReport: [],
  projectReportsByUser: [],
  projectDraft: null,
  projectDraftByUser: [],
  error: null,
};

// Async thunk for creating meeting report
export const createMeetingReport = createAsyncThunk(
  'meetingReports/createMeetingReport',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/meeting-reports`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getRotaractMeetingByUser = createAsyncThunk(
  'projectReports/getRotaractMeetingByUser',
  async ({userId, page = 1, limit = 10, searchQuery }) => {
      const response = await axios.get(
          `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/meeting-reports`,
          { 
            params: { userId, page, limit, searchQuery },
            withCredentials: true 
          }
      );
      // console.log("getting response from backend: ",response.data);
      return response.data;
  }
);

export const deleteRotaractMeeting = createAsyncThunk(
  'draft/deleteRotaractMeeting',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/meeting-reports/${meetingId}`,
        { withCredentials: true }
      );
      // console.log("delete response: ",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

//draft meeting
export const createRotaractMeetingDraft = createAsyncThunk(
  'draft/createRotaractDraft',
  async (formData , { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/draft-meeting`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getRotaractMeetingDrafts = createAsyncThunk(
  'draft/getRotaractMeetingDrafts',
  async (userId , { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/draft-meeting`,
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

export const deleteRotaractMeetingDraft = createAsyncThunk(
  'draft/deleteRotaractMeetingDraft',
  async (draftId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/draft-meeting/${draftId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk for creating project report
export const projectReport = createAsyncThunk(
  'projectReport',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/project-reports`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchProjectReportsByUser = createAsyncThunk(
  'projectReports/fetchProjectReportsByUser',
  async ({userId, page = 1, limit = 10, searchQuery }) => {
      const response = await axios.get(
          `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/project-reports`,
          { 
            params: { userId, page, limit, searchQuery },
            withCredentials: true 
          }
      );
      // console.log("getting response from backend: ",response.data);
      return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (projectId, { rejectWithValue }) => {
    // console.log("from index.js: ", projectId)
    try {
      const response = await axios.delete(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/project-reports/${projectId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

//draft project
export const createProjectDraft = createAsyncThunk(
  'draft/createProjectDraft',
  async (formData , { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/draft-project`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getProjectDrafts = createAsyncThunk(
  'draft/getProjectDraft',
  async (userId , { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/draft-project`,
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

export const deleteProjectDraft = createAsyncThunk(
  'draft/deleteProjectDraft',
  async (draftId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://rotaractanddmsclub.onrender.com/api/v1/members/rotaract/draft-project/${draftId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);


const rotaractSlice = createSlice({
  name: 'rotaract',
  initialState,
  reducers: {
    clearMeetingReport: (state) => {
      state.meetingReport = [];
    },
    clearProjectDraft: (state) => {
      state.projectDraft = null; // Clear draft message
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling createMeetingReport
      .addCase(createMeetingReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMeetingReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetingReport = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(createMeetingReport.rejected, (state, action) => {
        state.isLoading = false;
        state.meetingReport = [];
        state.error = action.payload || action.error.message;
      })

      //getmeetingReport
      .addCase(getRotaractMeetingByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRotaractMeetingByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rotaractMeetingByUser = action.payload.data; 
        state.totalPages = action.payload.totalPages; 
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(getRotaractMeetingByUser.rejected, (state, action) => {
          state.isLoading = false;
          state.rotaractMeetingByUser = [];
          state.error = action.payload || action.error.message;
      })

      //delete meeting
      .addCase(deleteRotaractMeeting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRotaractMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rotaractMeetingByUser = []
        state.error = null;
      })
      .addCase(deleteRotaractMeeting.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //create draft
      .addCase(createRotaractMeetingDraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRotaractMeetingDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rotaractMeetingDraft = action.payload.message; 
        state.error = null;
      })
      .addCase(createRotaractMeetingDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.rotaractMeetingDraft = null;
        state.error = action.payload || action.error.message;
      })

      // delete draft project
      .addCase(deleteRotaractMeetingDraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRotaractMeetingDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rotaractMeetingDraft = null;
        state.error = null;
      })
      .addCase(deleteRotaractMeetingDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //get draft project
      .addCase(getRotaractMeetingDrafts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRotaractMeetingDrafts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rotaractMeetingDraftByUser = action.payload.data; 
        state.error = null;
      })
      .addCase(getRotaractMeetingDrafts.rejected, (state, action) => {
          state.isLoading = false;
          state.rotaractMeetingDraftByUser = [];
          state.error = action.payload || action.error.message;
      })

      // Handling projectReport
      .addCase(projectReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(projectReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectReport = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(projectReport.rejected, (state, action) => {
        state.isLoading = false;
        state.projectReport = [];
        state.error = action.payload || action.error.message;
      })

      //fetch Project reports by user
      .addCase(fetchProjectReportsByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectReportsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectReportsByUser = action.payload.data; 
        state.totalPages = action.payload.totalPages; 
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(fetchProjectReportsByUser.rejected, (state, action) => {
          state.isLoading = false;
          state.projectReportsByUser = [];
          state.error = action.payload || action.error.message;
      })

      // delete project
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectReportsByUser = [];
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //save as draft
      .addCase(createProjectDraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProjectDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectDraft = action.payload.message; 
        state.error = null;
      })
      .addCase(createProjectDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.projectDraft = null;
        state.error = action.payload || action.error.message;
      })

      // delete draft project
      .addCase(deleteProjectDraft.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProjectDraft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectDraft = null;
        state.error = null;
      })
      .addCase(deleteProjectDraft.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //get draft project
      .addCase(getProjectDrafts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProjectDrafts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectDraftByUser = action.payload.data; 
        state.error = null;
      })
      .addCase(getProjectDrafts.rejected, (state, action) => {
          state.isLoading = false;
          state.projectDraftByUser = [];
          state.error = action.payload || action.error.message;
      })
  },
});

export const { clearMeetingReport, clearProjectDraft } = rotaractSlice.actions;
export default rotaractSlice.reducer;
