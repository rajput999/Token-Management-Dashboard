import React, { useState } from "react";
import { ethersService } from "../services/ethersService";
import '../App.css';

const TokenTransfer = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const transferTokens = async () => {
    await ethersService.transferTokens(walletAddress, tokenAddress, recipientAddress, amount);
    alert("Transfer successful!");
  };

  return (
    <div className="card">
      <h2>Transfer Tokens</h2>
      <input 
        type="text" 
        placeholder="Token Address" 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Recipient Address" 
        value={recipientAddress} 
        onChange={(e) => setRecipientAddress(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={transferTokens}>Transfer</button>
    </div>
  );
};

export default TokenTransfer;