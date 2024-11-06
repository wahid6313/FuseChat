import { createSlide } from "@reduxjs/toolkit";

const authSlice = createSlide({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
