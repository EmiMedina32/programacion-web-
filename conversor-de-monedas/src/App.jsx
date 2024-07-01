import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [exchangeData, setExchangeData] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/7bf3d6909864c678a19b0224/latest/${fromCurrency}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExchangeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency]); // Dependencia para re-ejecutar efecto cuando cambia fromCurrency

  if (!exchangeData) {
    return <div>Loading...</div>;
  }

  const { conversion_rates: rates } = exchangeData;

  const handleChangeFromCurrency = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleChangeToCurrency = (event) => {
    setToCurrency(event.target.value);
  };

  return (
    <div className="App">
      <h2>Conversor de Moneda</h2>
      <div>
        <label>De:</label>
        <select value={fromCurrency} onChange={handleChangeFromCurrency}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>A:</label>
        <select value={toCurrency} onChange={handleChangeToCurrency}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <p>
        1 {fromCurrency} = {rates[toCurrency]} {toCurrency}
      </p>
    </div>
  );
}

export default App;
