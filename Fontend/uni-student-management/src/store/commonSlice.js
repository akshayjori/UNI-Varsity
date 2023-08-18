import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isRegistering: false,
  isLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState: initialAuthState,
  reducers: {
    startLoadingSpinner(state) {
      state.isLoading = true;
    },
    stopLoadingSpinner(state) {
      state.isLoading = false;
    },
    startRegistering(state) {
      state.isRegistering = true;
    },
    doneRegistering(state) {
      state.isRegistering = false;
    },
  },
});

export const commonActions = commonSlice.actions;
export default commonSlice;
