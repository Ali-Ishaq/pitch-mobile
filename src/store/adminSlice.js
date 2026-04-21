import { createSlice } from "@reduxjs/toolkit";

import { MOCK_USERS, MOCK_VENUES } from "../data/mockAdminData";

const initialState = {
  users: MOCK_USERS,
  venues: MOCK_VENUES,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    deleteUserById: (state, action) => {
      state.users = state.users.filter((user) => user.userId !== action.payload);
    },
    deleteVenueById: (state, action) => {
      state.venues = state.venues.filter((venue) => venue.venueId !== action.payload);
    },
  },
});

export const { deleteUserById, deleteVenueById } = adminSlice.actions;

export const selectAdminUsers = (state) => state.admin.users;
export const selectAdminVenues = (state) => state.admin.venues;

export default adminSlice.reducer;
