import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commonSlice from "./commonSlice";

const store = configureStore({
  reducer: { common: commonSlice.reducer, user: userSlice.reducer },
});

export default store;
