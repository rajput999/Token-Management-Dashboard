import { ethers } from "ethers";


export const ethersService = {
  getTokenBalance: async (walletAddress, tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, [
      // ERC-20 ABI to get the balance
      "function balanceOf(address owner) view returns (uint256)"
    ], provider);
    const balance = await contract.balanceOf(walletAddress);
    return ethers.utils.formatUnits(balance, 18);
  },

  checkAllowance: async (walletAddress, tokenAddress, spenderAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, [
      "function allowance(address owner, address spender) view returns (uint256)"
    ], provider);
    const allowance = await contract.allowance(walletAddress, spenderAddress);
    return ethers.utils.formatUnits(allowance, 18);
  },

  transferTokens: async (walletAddress, tokenAddress, recipientAddress, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, [
      "function transfer(address to, uint amount) returns (bool)"
    ], signer);
    const tx = await contract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
  },

  // New service methods
  fetchWatchList: async (walletAddress) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/watchlist/${walletAddress}`);
    return await response.json();
  },

  addToWatchList: async (walletAddress, token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/watchlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, token }),
    });
    return await response.json();
  },

  removeFromWatchList: async (walletAddress, token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/watchlist/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, token }),
    });
    return await response.json();
  }
};
