import React, { useState } from "react";
import { ethers } from "ethers";
import '../App.css';

const WalletConnect = ({ setWalletAddress }) => {
  const [inputAddress, setInputAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setWalletAddress(address, ethers.utils.formatEther(balance));
    } else {
      alert("Please install Metamask!");
    }
  };

  const fetchBalance = async (provider, address) => {
    const balance = await provider.getBalance(address);
    setBalance(ethers.utils.formatEther(balance));
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  };

  const submitAddress = async () => {
    if(inputAddress.length==0){
      alert("Input address can't be empty");
      return ;
    }
    setWalletAddress(inputAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    fetchBalance(provider, inputAddress);
  };

  return (
    <div className="card">
      <h2>Connect Wallet</h2>
      <div className="wallet-input">
        <input
          type="text"
          placeholder="Enter Address"
          value={inputAddress}
          onChange={handleInputChange}
        />
        <button onClick={submitAddress}>Connect Wallet</button>
      </div>
      <div className="or-divider">OR</div>
      <div className="metamask-button">
        <button onClick={connectWallet}>Connect MetaMask</button>
      </div>
    </div>
  );
};

export default WalletConnect;