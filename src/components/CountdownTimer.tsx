import React from "react";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const TimerContainer = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #9ca3af;
`;

const CountdownTimer = () => {
  const { timer } = useSelector((state: RootState) => state.game);
  return <TimerContainer>Time Left: <strong>{timer} seconds</strong></TimerContainer>;
};

export default CountdownTimer;
