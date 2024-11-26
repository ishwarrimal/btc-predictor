import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUserPrediction } from "../redux/gameSlice";


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  width: 100%;
`;

const PredictionButtons = () => {
  const dispatch = useDispatch();
  const { userPrediction } = useSelector((state: RootState) => state.game);
  return (
    <ButtonContainer>
      <Button direction="up" disabled={!!(userPrediction)} 
        onClick={() => dispatch(setUserPrediction('up'))}>🔺 UP</Button>
      <Button direction="down" disabled={!!(userPrediction)} 
        onClick={() => dispatch(setUserPrediction('down'))}>🔻 DOWN</Button>
    </ButtonContainer>
  );
};

export default React.memo(PredictionButtons);
