import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

jest.mock("./components/GameRules", () => {
 return () => <div data-testid="game-rules">Game Rules</div>; // Mock GameInterface
});


jest.mock("./pages/gameInterface", () => {
 return () => <div data-testid="game-interface">Mock Game Interface</div>; // Mock GameInterface
});


// Create a mock store
const mockStore = configureStore([]);
const store = mockStore({});


test("renders Bitcoin Price Guessing Game title", () => {
 render(
   <Provider store={store}>
     <App />
   </Provider>
 );


 // Check if the title is rendered
 const titleElement = screen.getByText(/Bitcoin Price Guessing Game/i);
 expect(titleElement).toBeInTheDocument();


 // Check if GameInterface is rendered
 const gameInterfaceElement = screen.getByTestId("game-interface");
 expect(gameInterfaceElement).toBeInTheDocument();

 const gameRulesElement = screen.getByTestId("game-rules");
 expect(gameRulesElement).toBeInTheDocument();
});



