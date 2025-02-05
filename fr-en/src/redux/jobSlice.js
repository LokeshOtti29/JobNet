import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    allAdminjobs: [],
    Singlejob: null,
    searchJobByText: "",
    allAppliedjobs: [],
    searchQuery: "",
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.Singlejob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminjobs = action.payload;
    },
    setSearchJobBytext: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedjobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobBytext,
  setAllAppliedJobs,
  setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
