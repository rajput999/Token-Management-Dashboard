import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import TokenWatchList from "./components/TokenWatchList";
import HistoricalData from "./components/HistoricalData";
import AllowanceCheck from "./components/AllowanceCheck";
import TokenTransfer from "./components/TokenTransfer";
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState("");

  const updateWalletInfo = (address, balance) => {
    setWalletAddress(address);
    setBalance(balance);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Token Management Dashboard</h1>
      </header>
      <main>
        <WalletConnect setWalletAddress={updateWalletInfo} />
        {walletAddress && (
          <>
            <div className="wallet-info">
              <p><strong>Wallet Address:</strong> {walletAddress}</p>
              <p><strong>Total Balance:</strong> {balance} ETH</p>
            </div>
            <div className="dashboard">
              <TokenWatchList walletAddress={walletAddress} />
              <HistoricalData walletAddress={walletAddress} />
              <AllowanceCheck walletAddress={walletAddress} />
              <TokenTransfer walletAddress={walletAddress} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;