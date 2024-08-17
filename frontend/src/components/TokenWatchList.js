import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ethersService } from "../services/ethersService";
import '../App.css';

const TokenWatchList = ({ walletAddress }) => {
  const [tokens, setTokens] = useState([]);
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [balances, setBalances] = useState({});

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const fetchWatchList = async () => {
      try {
        const data = await ethersService.fetchWatchList(walletAddress);
        if (data) {
          setTokens(data.tokens);
        }
      } catch (error) {
        console.error("Failed to fetch watch list:", error);
      }
    };
    fetchWatchList();
  }, [walletAddress]);

  const addToken = async () => {
    try {
      console.log("Resolving ENS address:", newTokenAddress);
      const resolvedAddress = await provider.resolveName(newTokenAddress);

      if (!resolvedAddress) {
        console.error("Unable to resolve ENS name. It might be invalid or not registered.");
        return;
      }

      if (tokens.includes(resolvedAddress)) {
        alert("Token is already in the watch list.");
        setNewTokenAddress("");
        return;
      }

      console.log("Resolved address:", resolvedAddress);
      const updatedList = await ethersService.addToWatchList(walletAddress, resolvedAddress);
      setTokens(updatedList.tokens);
      setNewTokenAddress("");
    } catch (error) {
      console.error("Failed to add token:", error);
    }
  };

  const removeToken = async (token) => {
    try {
      const updatedList = await ethersService.removeFromWatchList(walletAddress, token);
      setTokens(updatedList.tokens);
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
  };

  useEffect(() => {
    tokens.forEach(async (token) => {
      try {
        const balance = await ethersService.getTokenBalance(walletAddress, token);
        setBalances((prev) => ({ ...prev, [token]: balance }));
      } catch (error) {
        console.error("Failed to fetch token balance:", error);
      }
    });
  }, [tokens, walletAddress]);

  return (
    <div className="card">
      <h2>Token Watch List</h2>
      <input 
        type="text" 
        placeholder="Token Address or ENS" 
        value={newTokenAddress} 
        onChange={(e) => setNewTokenAddress(e.target.value)} 
      />
      <button onClick={addToken}>Add Token</button>
      <ul>
        {tokens.map((token) => (
          <li key={token}>
            {token}: {balances[token] || "Loading..."} 
            <button onClick={() => removeToken(token)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenWatchList;
