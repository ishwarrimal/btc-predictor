import React, { useEffect } from "react";
import styled from "styled-components";
import CountdownTimer from "./CountdownTimer";
import PredictionButtons from "./PredictionButtons";
import { RootState } from "../redux/store";
import PredictionStatus from "./PredictionStatus";
// import SparklineChart from "./SparklineChart";

const MainSectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: #eee;
  border: 2px solid #282a36;
  border-radius: 8px;

  h2 {
    color: #6c757d;
  }
`;

const BoardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const GamePlayArea = () => {
  return (
    <MainSectionContainer>
      <h2>Will the price go up or down in the next 30 seconds?</h2>
      <BoardContainer>
        <PredictionStatus />
        <PredictionButtons />
        {/* <SparklineChart /> */}
      </BoardContainer>
    </MainSectionContainer>
  );
};

export default GamePlayArea;
