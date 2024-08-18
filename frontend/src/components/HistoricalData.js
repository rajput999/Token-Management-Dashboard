// HistoricalData.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ethersService } from "../services/ethersService";
import '../App.css';

const HistoricalData = ({ walletAddress }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState({});

  const fetchHistoricalData = async () => {
    try {
      const data = await ethersService.getHistoricalData(walletAddress, startDate, endDate);
      setHistoricalData(data);
      console.log(historicalData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  return (
    <div className="card">
      <h2>Historical Data</h2>
      <div className="datapicker" style={{display:'flex'}}>
        <div style={{display:'flex',alignItems:'center', justifyContent:'center',fontWeight:'bold',fontSize:'1.1rem',marginRight:'1.2rem'}}>From</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className="datapicker" style={{display:'flex'}}>
      <div style={{display:'flex',alignItems:'center', justifyContent:'center',fontWeight:'bold',fontSize:'1.1rem',marginRight:'1.2rem'}}>To</div>
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
      <div className="chart-container">
        {/* Render chart here */}
      </div>
    </div>
  );
};

export default HistoricalData;
