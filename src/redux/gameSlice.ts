import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonType } from "../types";

// Define the initial state
interface GameState {
  timer: number;
  currentBtcPrice: number;
  lockedBtcPrice: number;
  userPrediction: ButtonType | null;
  isPriceLoading: boolean;
  gameResult: "win" | "lose" | null;
  resultList: Array<"win"|"lose">;
}

const initialState: GameState = {
  timer: 30,
  currentBtcPrice: 0,
  lockedBtcPrice: 0,
  userPrediction: null,
  isPriceLoading: true,
  gameResult: null,
  resultList: []
};

// Create the slice
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    setBtcPrice(state, action: PayloadAction<number>) {
      state.currentBtcPrice = action.payload;
      state.isPriceLoading = false;
    },
    setUserPrediction(state, action: PayloadAction<ButtonType | null>) {
      state.userPrediction = action.payload;
      state.lockedBtcPrice = state.currentBtcPrice;
    },
    setGameResult(state, action: PayloadAction<"win" | "lose" | null>) {
      state.gameResult = action.payload;
      if(!!action.payload) {
        state.resultList.push(action.payload);
      }
    }
  },
});

// Export actions and reducer
export const {
  setBtcPrice,
  setUserPrediction,
  setTimer,
  setGameResult
} = gameSlice.actions;

export default gameSlice.reducer;
