import React from 'react';
import styled from 'styled-components';
// import { useGameContext } from '../context/gameContext';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PriceDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #ffffff, #f1f3f5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  color: #495057;
  margin-bottom: 12px;
`;

const CurrentPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #198754; /* Green for positive feel */
  background: #e9f7ef; /* Light green background */
  padding: 8px 16px;
  border-radius: 8px;

  /* Styling for the loading text */
  &.loading {
    color: #6c757d; /* Gray text for loading state */
    background: none;
  }
`;

const CurrentPriceCard: React.FC = () => {
  // const {state: { currentBtcPrice, isPriceLoading}} = useGameContext()

  const { currentBtcPrice, isPriceLoading } = useSelector((state: RootState) => state.game);
  return (
    <PriceDisplayContainer>
      <H2>Current BTC Price</H2>
      <CurrentPrice>
        {isPriceLoading ? 'Loading...' : `$${currentBtcPrice}`}
      </CurrentPrice>
    </PriceDisplayContainer>
  );
};

export default CurrentPriceCard;