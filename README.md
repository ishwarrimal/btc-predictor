# Bitcoin Price Predictor Game  

[![Deploy to GitHub Pages](https://github.com/ishwarrimal/btc-predictor/actions/workflows/deploy.yml/badge.svg)](https://github.com/ishwarrimal/btc-predictor/actions/workflows/deploy.yml)

Game [Link](https://ishwarrimal.github.io/btc-predictor/)  
**Screenshots attached at the end of readme**

This is a Bitcoin price prediction game where users predict whether the price of Bitcoin will go up or down in the next 30 seconds. The game is designed using modern web technologies, and it allows users to authenticate using AWS Cognito, interact with APIs through AWS API Gateway, and store scores in DynamoDB.This README file provides an overview of the Bitcoin Price Predictor Game project, including its features, deployment process, and how to get started.

## Features

1. **Authentication**: Users can authenticate using AWS Cognito for secure access.
2. **API Integration**: The game interacts with APIs through AWS API Gateway to fetch real-time user's score.
3. **Websockets**: The game uses an open endpoint of [coincap](wss://ws.coincap.io/prices?assets=bitcoin) for fetching live BTC price.
4. **Game Logic**: The game predicts whether the Bitcoin price will go up or down in the next 30 seconds.
5. **User Interface**: A simple and intuitive web interface is provided to facilitate user interaction which is **mobile friendly**.
6. **Score retention**: The game score is stored for each user in dynamodb, so you'll always get your latest score no matter which device you use.
7. **CI/CD**: Have used github webhooks and github pages for CI/CD.

## Game Rules
- **Objective**: Predict if the price of Bitcoin will go up or down in the next 30 seconds.
- **How to Play**:
    - You will be presented with the current Bitcoin price.
    - You need to predict whether the price will go up or down in the next 30 seconds.
    - After making your prediction, the game will update with the result (whether your prediction was correct or not).
- **Scoring**:
    - If your prediction is correct, your score will increase.
    - If your prediction is incorrect, your score will decrease.
    - Your score will be stored in AWS DynamoDB, and you can view your current score after each prediction.

## Tech Stack

### Frontend:

1. **React**: The frontend is built using React for the user interface.
2. **Redux**: Used for state management, especially for handling the requests for Bitcoin price updates and managing the game state.
3. **TypeScript**: TypeScript is used to ensure type safety and better code quality.
4. **React Testing Library (RTL)**: Used for testing React components.

### Authentication:

**AWS Cognito**: Used for user authentication and management.

### Backend:

- **AWS API Gateway**: Serves as the API endpoint for the frontend to interact with.  
- **AWS Lambda**: A serverless function used to process API requests, including fetching Bitcoin price and updating scores built using **NodeJS**.
- **AWS DynamoDB**: Used for storing user scores.  


### Webhooks:
Used to fetch the real-time Bitcoin price updates from an external service.

## How to Run Locally
Follow the steps below to run the Bitcoin Price Prediction game locally on your machine.


### Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/)

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/btc-price-prediction-game.git
cd btc-price-prediction-game
```

### Step 2: Install Dependencies

Install the required dependencies by running the following command in your terminal:
```bash
npm install
```

### Step 3: Set Environment Variable

Create a .env file in the root directory of the project (if it doesn’t already exist) and add the following environment variables:
```bash
REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID=<your-identity-pool-id>
REACT_APP_AWS_USER_POOL_ID=<your-user-pool-id>
REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID=<your-web-client-id>
REACT_APP_AWS_GATEWAY_ENDPOINT=<your-gateway-endpoint>
```
Note: Please update region of required in aws-exports.jswith your actual region.

You can find the values for the Cognito environment variables in the AWS Cognito console:

- Identity Pool ID: Under the Federation section of your Identity Pool.
- User Pool ID: Under the General Settings of your User Pool.
- Web Client ID: Under the App clients section of your User Pool.

### Step 4: Run the Development Server

Once you've set the environment variables, run the following command to start the app:
```bash
npm start
```

This will start the development server, and you can view the game in your browser at `http://localhost:3000`.

### Step 5: Running Tests (Optional)
To run the tests for the project (if you have set up tests with React Testing Library), you can use the following command:
```bash
npm test
```
This will run the tests in watch mode, and you can see the results in the terminal.


## Tech Choices Explained

- **React**: A JavaScript library for building user interfaces, used for its flexibility and component-based architecture. React allows efficient rendering and a smooth user experience, making it ideal for building interactive web applications like the Bitcoin Price Prediction game.

- **Redux**: A state management library used to manage the global state of the application. Redux helps track and update state such as the Bitcoin price, user scores, and prediction status across different components, making the app's flow predictable and easier to debug.

- **AWS Cognito**: AWS Cognito is used for user authentication and authorization. It allows users to sign up, sign in, and manage their sessions in a secure and scalable manner. With Cognito, the app integrates user authentication seamlessly, allowing for a personalized experience.

- **AWS API Gateway + Lambda**: AWS API Gateway and Lambda are used to create serverless APIs for the game. API Gateway acts as the entry point for API requests (e.g., fetching the Bitcoin price, updating scores), and AWS Lambda handles the business logic in a cost-efficient and scalable manner without the need for managing servers.

- **AWS DynamoDB**: AWS DynamoDB is a fully managed NoSQL database used to store data such as user scores and prediction history. DynamoDB is chosen for its fast and predictable performance, scalability, and seamless integration with other AWS services like API Gateway and Lambda.

- **TypeScript**: TypeScript is a superset of JavaScript that adds static typing to the language. This ensures better code quality by catching errors during development, improving code readability, and enabling powerful developer tools such as autocomplete and type checking. TypeScript helps avoid common JavaScript pitfalls and enhances the development experience.

- **React Testing Library (RTL)**: React Testing Library is used to test React components in a way that mimics how users interact with the application. RTL encourages testing from the user’s perspective, making the tests more reliable and focusing on component behavior rather than implementation details.

## Future Scope

The Bitcoin Price Prediction game has a solid foundation, but there are several areas for potential improvement and future enhancements to provide a better user experience and expand the game's reach. Below are some of the key features that could be added in the future:

### 1. **Internationalization (i18n)**

Currently, the game supports only a single language, but in the future, it could be localized to multiple languages to cater to a global audience. By using libraries like `react-intl` or `i18next`, we can easily add translations for various regions and languages. This will make the game more accessible and increase its potential user base across different countries.

### 2. **Accessibility (a11y)**

Ensuring the game is accessible to users with disabilities is a key goal. We can improve accessibility by implementing features like screen reader support, keyboard navigation, and high-contrast themes. Adhering to the WCAG (Web Content Accessibility Guidelines) will help make the game more inclusive, allowing people with diverse abilities to enjoy the game. Features such as alternative text for images, audio cues, and adjustable font sizes could be added in future updates.

### 4. **Multi-Currency Support**

While the game currently deals with Bitcoin, future versions could include other cryptocurrencies like Ethereum, Litecoin, or others. Implementing multi-currency support would allow users to predict the price changes of different cryptocurrencies, broadening the scope and appeal of the game. 

### 5. **Real-Time Notifications**

To enhance the game’s engagement, real-time notifications (e.g., via push notifications or in-app notifications) can be implemented. Users could receive updates about significant price movements or other important game events. This would encourage users to return and participate more frequently in the game.

### 6. **Leaderboard & Social Features**

To foster competition and user engagement, a global leaderboard could be added where players can see how their scores compare with others. Social features like sharing scores on social media, connecting with friends, and tracking personal progress can help build a community around the game.

These features would not only improve the user experience but also provide greater scalability and ensure the game remains relevant as technology and user expectations evolve.


## Screenshots

Login Page
![alt text](<Screenshot 2024-11-26 at 8.40.13 PM.png>)

Game Page
![alt text](<Screenshot 2024-11-26 at 8.40.32 PM.png>)

Game Playing State
![alt text](<Screenshot 2024-11-26 at 8.40.44 PM.png>)

Game Result State
![alt text](<Screenshot 2024-11-26 at 8.41.45 PM.png>)

Game Rules
![alt text](<Screenshot 2024-11-26 at 8.42.15 PM.png>)
