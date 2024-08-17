import React, { useState } from "react";
import { ethersService } from "../services/ethersService";
import '../App.css';

const AllowanceCheck = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");
  const [allowance, setAllowance] = useState("");

  const checkAllowance = async () => {
    const result = await ethersService.checkAllowance(walletAddress, tokenAddress, spenderAddress);
    setAllowance(result);
  };

  return (
    <div className="card">
      <h2>Check Allowance</h2>
      <input 
        type="text" 
        placeholder="Token Address" 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Spender Address" 
        value={spenderAddress} 
        onChange={(e) => setSpenderAddress(e.target.value)} 
      />
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance && <p>Allowance: {allowance}</p>}
    </div>
  );
};

export default AllowanceCheck;