import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
