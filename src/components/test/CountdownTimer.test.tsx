import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import CountdownTimer from "../CountdownTimer";
import { Store, UnknownAction } from "@reduxjs/toolkit";


// Create a mock store
const mockStore = configureStore([]);


describe("CountdownTimer", () => {
 let store:
   | MockStoreEnhanced<unknown, {}>
   | Store<unknown, UnknownAction, unknown>;


 beforeEach(() => {
   store = mockStore({
     game: {
       timer: 30,
       currentBtcPrice: 0,
       lockedBtcPrice: 0,
       userPrediction: null,
       isPriceLoading: true,
       gameResult: null,
       resultList: [],
     },
   });
   jest.clearAllMocks();
 });


 test("renders the timer with the correct time left", () => {
   render(
     <Provider store={store}>
       <CountdownTimer />
     </Provider>
   );


   // Check if the timer is displayed correctly
   expect(screen.getByText(/Time Left:/)).toBeInTheDocument();
   expect(screen.getByText(/30 seconds/)).toBeInTheDocument();
 });
});



