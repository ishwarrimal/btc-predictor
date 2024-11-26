import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import CurrentPriceCard from '../components/CurrentPriceCard';
import GamePlayArea from '../components/GamePlayArea';
import fetchCryptoPrice from '../api/fetchCrypto';
import { SECONDS_IN_MS } from '../constants/timeConstants';
import { useSelector, useDispatch } from "react-redux";
import { setGameResult, setTimer, setUserPrediction } from "../redux/gameSlice";

import {
  RootState,
} from "../redux/store";
import ScoreCard from '../components/ScoreCard';

function GameInterface() {
  const { userPrediction, currentBtcPrice, lockedBtcPrice } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCryptoPrice(dispatch);
  },[])

  useEffect(() => {
    //Start the coutdown when user prediction is set
    if(!!userPrediction){
      const startTime = Date.now()
      const interval = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTime) / SECONDS_IN_MS);
        dispatch(setTimer(30 - secondsPassed));
        if (secondsPassed >= 30) {
          clearInterval(interval);
          checkAndUpdateResult();
        }
      }, SECONDS_IN_MS);

      return () => clearInterval(interval);
    }
  }, [userPrediction])

  //Function to check the result and update the game state
  function checkAndUpdateResult(){
    if(!!userPrediction){
      const priceDiff = currentBtcPrice - lockedBtcPrice;
      if(priceDiff > 0 && userPrediction === "up" || priceDiff < 0 && userPrediction === "down" ){
        dispatch(setGameResult('win'))
      }else{
        dispatch(setGameResult('lose'))
      }
      setTimeout(() => {
        dispatch(setGameResult(null))
        dispatch(setUserPrediction(null));
        dispatch(setTimer(30))
      }, 2000)
    }
  }

  return (
    <GameInterfaceWrapper>
      <CurrentPriceCard/>
      <ScoreCard />
      <GamePlayArea />
    </GameInterfaceWrapper>
  );
}


export const GameInterfaceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 24px;
`;

export default GameInterface;
