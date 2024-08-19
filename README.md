# Crypto-Portfolio App

## Overview

Crypto-Portfolio App is a single-page application (SPA) that allows users to manage and monitor their cryptocurrency portfolio. Users can add tokens to their watch list, view current and historical balances, check token allowances, and perform token operations like transfers and approvals.

## Live Demo

[View the live demo here](https://token-management-dashboard-gwn1-git-deploy-rajput999s-projects.vercel.app/)

## Features

- Connect wallet MetaMask or input wallet address
- Add tokens to watch list
- View current token balances
- View historical token balances with date selection
- Check token allowances for different smart contracts
- Transfer tokens to other addresses

## Technology Stack

- Frontend: React
- Blockchain Interaction: ethers.js and Web3.js
- Backend: Node.js with Express
- Database: MongoDB 

## Installation

1. Clone the repository:
   git clone https://github.com/rajput999/Token-Management-Dashboard.git

2. Navigate to the project directory:
   cd Token-Management-Dashboard

3. Install dependencies for both frontend and backend:
   cd frontend && yarn install and npm install
   cd ../backend && npm install

4. Create `.env` files in backend directories and add necessary environment variables given in .env.example in backend directory

5. Start the backend server:
   cd backend && npm run server

6. In a new terminal, start the frontend development server:
   cd frontend && npm start

7. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

1. Connect your wallet by metamask or enter a wallet address.
2. Add tokens to your watch list using their contract addresses.
3. View your current token balances in the main dashboard.
4. Use the date picker to view historical balances.
5. Check token allowances for specific smart contracts.
6. Transfer tokens by entering the recipient's address and the amount.
