import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  info: {},
  student: {},
  photo: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    storeUser(state, action) {
      state.isAuthenticated = true;
      state.info = {
        studentId: action.payload.studentId,
        fullname: action.payload.fullname,
        role: action.payload.role,
      };
    },
    storePhoto(state, action) {
      state.photo = action.payload;
    },
    storeStudent(state, action) {
      state.student = action.payload;
    },
    removeUser(state) {
      state.isAuthenticated = false;
      state.info = {};
      state.photo = null;
      state.student = {};
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
