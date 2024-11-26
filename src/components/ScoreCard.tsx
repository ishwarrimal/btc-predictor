import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/gameContext";

const ScoreCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057; /* Neutral dark gray for text */
  background: linear-gradient(to bottom right, #e3f2fd, #ffffff); /* Light blue gradient */
  border: 2px solid #90caf9; /* Soft blue border */
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: fit-content;

  span {
    margin-left: 8px;
    color: #007bff; /* Blue for score or loading */
    font-weight: normal;
  }

  /* Loading state style */
  span.loading {
    color: #6c757d; /* Neutral gray for loading */
    font-style: italic;
  }
`;


const ScoreCard = () => {
  const {state: {userScore, isLoadingScore}} = useGameContext();
  return (
    <ScoreCardContainer>
     Your Score:{" "}
      <span className={isLoadingScore ? "loading" : ""}>
        {isLoadingScore ? "...Loading" : userScore}
      </span>
    </ScoreCardContainer>
  );
};

export default ScoreCard;
