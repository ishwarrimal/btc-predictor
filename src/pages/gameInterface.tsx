import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CurrentPriceCard from '../components/CurrentPriceCard';
import GamePlayArea from '../components/GamePlayArea';
import fetchCryptoPrice from '../api/fetchCrypto';
import { SECONDS_IN_MS } from '../constants/timeConstants';
import { useSelector, useDispatch } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { setGameResult, setTimer, setUserPrediction, setUserScore } from "../redux/gameSlice";


import {
  RootState,
} from "../redux/store";
import ScoreCard from '../components/ScoreCard';
import { getUserScore, postUserScore } from '../api/gameScore';

function GameInterface() {
  const currentPriceRef = useRef<number>(0)
  let { userPrediction, currentBtcPrice, lockedBtcPrice, userScore } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const { signOut } = useAuthenticator()
  currentPriceRef.current = currentBtcPrice

  useEffect(() => {
    fetchCryptoPrice(dispatch);
    getUserScore(dispatch);
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
      const priceDiff = currentPriceRef.current - lockedBtcPrice;
      let tempScore = userScore
      if(priceDiff > 0 && userPrediction === "up" || priceDiff < 0 && userPrediction === "down" ){
        dispatch(setGameResult('win'))
        tempScore++
      }else{
        tempScore--
        dispatch(setGameResult('lose'))
      }
      dispatch(setUserScore(tempScore))
      postUserScore(tempScore)
      setTimeout(() => {
        dispatch(setGameResult(null))
        dispatch(setUserPrediction(null));
        dispatch(setTimer(30))
      }, 3000)
    }
  }

  return (
    <GameInterfaceWrapper>
      <CurrentPriceCard/>
      <ScoreCard />
      <GamePlayArea />
       <StyledLogout onClick={signOut}><IoMdExit /> Logout</StyledLogout>
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

const StyledLogout = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  cursor: pointer;
  background: #aaa;
  padding: 0.3rem;
  border-radius: 10px;
`;

export default withAuthenticator(GameInterface);
