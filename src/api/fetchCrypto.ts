import { useState, useEffect, useRef } from 'react';
import { setBtcPrice } from '../redux/gameSlice';

const MAX_WAIT_TIME_SEC = 20 //Wait for 2 seconds before throwing error

const URL = 'wss://ws.coincap.io/prices?assets=bitcoin'
const fetchCryptoPrice = (dispatcher:any) => {
    try{
        let socket = new WebSocket(URL);
        socket.addEventListener('open', () => {
          console.log('WebSocket connection established');
        });
        socket.addEventListener('message', (event) => {
          try {
            // clearTimeout(errorIntervalRef.current)
            const data = JSON.parse(event.data);
            if(!isNaN(data.bitcoin)){
                dispatcher(setBtcPrice(data.bitcoin))
            }
          } catch (err) {
            // errorIntervalRef.current = setTimeout(() => {
            //     setError(event)
            // },MAX_WAIT_TIME_SEC * SECONDS_IN_MS)
          }
        });
    
        socket.addEventListener('error', (event) => {
        //   setError(new Error('WebSocket error: ' + event.message));
            // errorIntervalRef.current = setTimeout(() => {
            //     setError(event)
            // },MAX_WAIT_TIME_SEC * SECONDS_IN_MS)
        });
    
        socket.addEventListener('close', () => {
          console.log('WebSocket connection closed');
        });

    }catch(err){
        console.error('Error fetching crypto price:', err);
        dispatcher({type: 'FETCH_CRYPTO_PRICE_FAILURE', payload: err})
    }
}

export default fetchCryptoPrice;