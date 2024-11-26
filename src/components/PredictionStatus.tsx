import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PredictionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: bold;
    color: #495057;
    margin: 0;
  }

  p span {
    display: block;
    font-weight: normal;
    color: #6c757d;
  }
`;

const GameResult = styled.div<{ isSuccess: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  background: ${({ isSuccess }) =>
    isSuccess ? "linear-gradient(to right, #d4edda, #c3e6cb)" : "linear-gradient(to right, #f8d7da, #f5c6cb)"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: ${({ isSuccess }) => (isSuccess ? "#155724" : "#721c24")};
  border: 2px solid ${({ isSuccess }) => (isSuccess ? "#c3e6cb" : "#f5c6cb")};
  margin: 0 auto;
  max-width: 400px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    margin: 8px 0 0;
    font-size: 1rem;
  }
`;

const GuessStyle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #495057;
  text-align: center;
  padding: 16px;
`;

const PredictionStatus = () => {
  const { timer, userPrediction, lockedBtcPrice, gameResult } = useSelector(
    (state: RootState) => state.game
  );

  if (!userPrediction) {
    return <GuessStyle>Make a Guess</GuessStyle>;
  }

  if (gameResult) {
    return (
      <GameResult isSuccess={gameResult === "win"}>
        <h2>{gameResult === "win" ? "🎉 Congratulations!" : "😞 Better Luck Next Time!"}</h2>
        <p>
          {gameResult === "win"
            ? "You correctly predicted the BTC price movement!"
            : "Your prediction was incorrect this time."}
        </p>
      </GameResult>
    );
  }

  return (
    <PredictionContainer>
      <p>
        Your Prediction:{" "}
        <span>{userPrediction === "up" ? "📈 Up" : "📉 Down"}</span>
      </p>
      <p>
        Guessed Price: <span>${lockedBtcPrice}</span>
      </p>
      <p>
        Time Remaining: <span>{timer}s</span>
      </p>
    </PredictionContainer>
  );
};

export default PredictionStatus;
