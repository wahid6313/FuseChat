// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socketId: null, // Store the socket id
  status: "disconnected", // Store the connection status
};

const socketSlice = createSlice({
  name: "socketio",
  initialState,
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload.socketId;
      state.status = action.payload.status;
    },
    clearSocket: (state) => {
      state.socketId = null;
      state.status = "disconnected";
    },
  },
});

export const { setSocketId, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
