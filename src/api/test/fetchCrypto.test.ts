import fetchCryptoPrice from "../fetchCrypto";
import { setBtcPrice } from "../../redux/gameSlice";


describe("fetchCryptoPrice", () => {
 let mockDispatcher: jest.Mock;
 let mockWebSocket: {
   addEventListener: jest.Mock;
   close: jest.Mock;
 };


 beforeEach(() => {
   // Create a mock dispatcher
   mockDispatcher = jest.fn();


   // Mock the WebSocket
   mockWebSocket = {
     addEventListener: jest.fn(),
     close: jest.fn(),
   };


   // Mock the global WebSocket
   (global as any).WebSocket = jest.fn(() => mockWebSocket);
 });


 afterEach(() => {
   jest.clearAllMocks(); // Clear mocks after each test
 });


 test("should establish a WebSocket connection and handle messages", () => {
   // Call the fetchCryptoPrice function
   fetchCryptoPrice(mockDispatcher);


   // Check that the WebSocket was created with the correct URL
   expect((global as any).WebSocket).toHaveBeenCalledWith(
     "wss://ws.coincap.io/prices?assets=bitcoin"
   );


   // Simulate the WebSocket connection opening
   const openCallback = mockWebSocket.addEventListener.mock.calls.find(
     (call) => call[0] === "open"
   )?.[1];
   if (openCallback) {
     openCallback(); // Call the open callback
   }


   // Check that the dispatcher is not called yet
   expect(mockDispatcher).not.toHaveBeenCalled();


   // Simulate receiving a message
   const messageCallback = mockWebSocket.addEventListener.mock.calls.find(
     (call) => call[0] === "message"
   )?.[1];
   const mockEvent = {
     data: JSON.stringify({ bitcoin: 45000 }), // Simulate a valid message
   };
   if (messageCallback) {
     messageCallback(mockEvent); // Call the message callback
   }


   // Verify that the dispatcher was called with the correct action
   expect(mockDispatcher).toHaveBeenCalledWith(setBtcPrice(45000));


   // Simulate an invalid message
   const invalidMessageCallback =
     mockWebSocket.addEventListener.mock.calls.find(
       (call) => call[0] === "message"
     )?.[1];
   const invalidMockEvent = {
     data: JSON.stringify({ invalid: "data" }), // Simulate an invalid message
   };
   if (invalidMessageCallback) {
     invalidMessageCallback(invalidMockEvent); // Call the message callback
   }


   // Verify that the dispatcher was not called with invalid data
   expect(mockDispatcher).toHaveBeenCalledTimes(1); // Should still be 1 call with the valid data
 });


 test("should handle WebSocket errors", () => {
   fetchCryptoPrice(mockDispatcher);


   // Simulate the WebSocket error
   const errorCallback = mockWebSocket.addEventListener.mock.calls.find(
     (call) => call[0] === "error"
   )?.[1];
   const mockErrorEvent = { message: "WebSocket error" };
   if (errorCallback) {
     errorCallback(mockErrorEvent); // Call the error callback
   }


   // Check that the dispatcher was not called for errors in this case
   expect(mockDispatcher).not.toHaveBeenCalled();
 });


 test("should handle errors when creating the WebSocket", () => {
   // Mock the WebSocket constructor to throw an error
   (global as any).WebSocket = jest.fn(() => {
     throw new Error("WebSocket error");
   });


   fetchCryptoPrice(mockDispatcher);


   // Verify that the dispatcher is called with the error action
   expect(mockDispatcher).toHaveBeenCalledWith({
     type: "FETCH_CRYPTO_PRICE_FAILURE",
     payload: expect.any(Error),
   });
 });
});



