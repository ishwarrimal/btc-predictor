import React, { createContext, useReducer, FC, useContext, ReactNode } from "react";
import { ButtonType } from "../types";

interface GameState {
    userScore: number;
    currentBtcPrice: number;
    userPrediction: ButtonType | null;
    timer: number;
    lockedPrice: number | null;
    isPriceLoading: boolean;
    isLoadingScore: boolean;
  }

// Initial state
const initialState: GameState = {
  userScore: 0,
  currentBtcPrice: 0,
  userPrediction: null,
  timer: 30,
  lockedPrice: null,
  isPriceLoading: true,
  isLoadingScore: true
};

export const GAME_ACTION = {
  SET_USER_SCORE: "SET_USER_SCORE",
  SET_BTC_PRICE: "SET_BTC_PRICE",
  SET_USER_PREDICTION: "SET_USER_PREDICTION",
  SET_TIMER: "SET_TIMER",
  SET_LOCKED_PRICE: "SET_LOCKED_PRICE",
};

type Action = {
  type: keyof typeof GAME_ACTION;
  payload?: any;
};


const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "SET_USER_SCORE":
      return { ...state, userScore: action.payload, isLoadingScore: false };
    case "SET_BTC_PRICE":
      return { ...state, currentBtcPrice: action.payload, isPriceLoading: false };
    case "SET_USER_PREDICTION":
      return { ...state, userPrediction: action.payload, lockedPrice: state.currentBtcPrice };
    case "SET_TIMER":
      return { ...state, timer: action.payload };
    case "SET_LOCKED_PRICE":
      return { ...state, lockedPrice: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};


// Context
interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<Action>;
}

const GameContext = createContext<GameContextProps>({} as GameContextProps);

// Provider
export const GameProvider: React.FC<{children: ReactNode}> = ({children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
};

// Custom Hook for Context
export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
