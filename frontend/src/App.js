import React, { useState } from 'react';

import logo from './logo.png'; 
import './App.css'; 


function App() {
  const [origin, setOrigin] = useState('SYD');
  const [destination, setDestination] = useState('JFK');
  const [cabin, setCabin] = useState('economy');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    const headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    };

    const json_data = {
      origin,
      destination,
      partnerPrograms: [
        'Air Canada',
        'United Airlines',
        'KLM',
        'Qantas',
        'American Airlines',
        'Etihad Airways',
        'Alaska Airlines',
        'Qatar Airways',
        'LifeMiles',
      ],
      stops: 2,
      departureTimeFrom: '2024-07-09T00:00:00Z',
      departureTimeTo: '2024-10-07T00:00:00Z',
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [cabin],
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://cardgpt.in/apitest', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(json_data),
      });
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setResults(data.data);
      } else {
        setError('Try another search route.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    }
  };
  

  return (
    <div className="app-container">
      <h2 style={{color:"#757b75"}}>Choose Origin & Destination Airports:</h2>
      <div className='form-main'>
        <div>
          <form onSubmit={handleSubmit} className="form-container">
            <label className='origin'>
            <div className='originh'>Origin</div>
              <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
                <option value="JFK">JFK</option>
                <option value="DEL">DEL</option>
                <option value="SYD">SYD</option>
                <option value="BOM">BOM</option>
                <option value="BNE">BNE</option>
                <option value="BLR">BLR</option>
              </select>
            </label>
            <br />
            <label className='dest'>
              <div className='desth'>Destination</div>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="JFK">JFK</option>
                <option value="DEL">DEL</option>
                <option value="SYD">SYD</option>
                <option value="LHR">LHR</option>
                <option value="CDG">CDG</option>
                <option value="DOH">DOH</option>
                <option value="SIN">SIN</option>
              </select>
            </label>
           
            <br />
            <label className='cabin'>
            <div className='cabinh'>Cabin</div>
              <select value={cabin} onChange={(e) => setCabin(e.target.value)}>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </label>
            <br />
            <div className='btn'><button type="submit">Search</button></div>
          </form>
        </div>
        
      </div>
 
      <div className="results-container">
        {error && <p>{error}</p>}
        {results.map((result, index) => (
          <div className="result-card" key={index}>
            <img src={logo} alt="logo" className="logo" />
            <p style={{fontSize:"x-large",fontWeight:"lighter"}}>{result.partner_program}</p>
            <p>
              
              {`${origin} ➔ ${destination}`}<br></br>
              <span style={{fontSize:"small"}}>
              2024-07-09 - 2024-10-07
              </span>
            </p>

            <p>
  {result.min_business_miles ? (
    <>
      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
        {result.min_business_miles}
      </span>
      {" + $" + result.min_business_tax}
    </>
  ) : (
    <span style={{color: "white", fontSize:"30px", fontWeight:"bold"}}>N/A</span>
  )}
  <br />
  <span style={{fontSize:"small"}}>Min Business Miles</span>
</p>
<p>
  {result.min_economy_miles ? (
    <>
      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
        {result.min_economy_miles}
      </span>
      {" + $" + result.min_economy_tax}
    </>
  ) : (
    <span style={{color: "white", fontSize:"30px", fontWeight:"bold"}}>N/A</span>
  )}
  <br />
  <span style={{fontSize:"small"}}>Min Economy Miles</span>
</p>
<p>
  {result.min_first_miles ? (
    <>
      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
        {result.min_first_miles}
      </span>
      {" + $" + result.min_first_tax}
    </>
  ) : (
    <span style={{color: "white", fontSize:"30px", fontWeight:"bold"}}>N/A</span>
  )}
  <br />
  <span style={{fontSize:"small"}}>Min First Miles</span>
</p>
              
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
