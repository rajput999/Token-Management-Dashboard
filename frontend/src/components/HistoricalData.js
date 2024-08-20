import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ethersService } from "../services/ethersService";
import '../App.css';

const HistoricalData = ({ walletAddress }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [token, setToken] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const [tokenBalance, setTokenBalance] = useState('');

  const fetchHistoricalData = async () => {
    try {
      const data = await ethersService.getHistoricalData(walletAddress, token, startDate, endDate);
      setHistoricalData(data);

      // Fetch token balance
      if (data.length > 0) {
        const balance = await ethersService.getTokenBalance(walletAddress, token);
        setTokenBalance(balance);
      }

      console.log(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data if walletAddress or token changes
    if (walletAddress && token) {
      fetchHistoricalData();
    }
  }, [walletAddress, token]);

  return (
    <div className="card">
      <h2>Historical Data</h2>

      <div className="input-group">
        <div className="label">Token</div>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter token"
        />
      </div>

      <div className="datapicker" style={{ display: 'flex' }}>
        <div className="label">From</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="datapicker" style={{ display: 'flex' }}>
        <div className="label">To</div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <button onClick={fetchHistoricalData}>Fetch Data</button>

      <div className="balance-info">
        <h3>Token Balance</h3>
        <p>Token Address: {token}</p>
        <p>Balance: {tokenBalance}</p>
      </div>

      <div className="chart-container">
        {/* Render chart here */}
      </div>
    </div>
  );
};

export default HistoricalData;
