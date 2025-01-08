import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  // State hooks for the app
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState("");

  // Your API key from Exchangerate-API or any other API service
  const apiKey = "YOUR_API_KEY";  // Replace with your API key

  useEffect(() => {
    // Fetch supported currencies list
    axios
      .get(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
      .then((response) => {
        setCurrencies(response.data.supported_codes);
      })
      .catch((error) => {
        setError("Failed to fetch currency codes");
        console.error(error);
      });

    // Fetch conversion rate whenever currencies change
    if (fromCurrency && toCurrency) {
      axios
        .get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
        .then((response) => {
          setConversionRate(response.data.conversion_rates[toCurrency]);
        })
        .catch((error) => {
          setError("Failed to fetch conversion rate");
          console.error(error);
        });
    }
  }, [fromCurrency, toCurrency]);

  // Handle changes in amount input
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle changes in the from currency
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  // Handle changes in the to currency
  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  // Calculate converted amount
  const convertAmount = () => {
    if (conversionRate) {
      return (amount * conversionRate).toFixed(2);
    }
    return 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Currency Converter</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex mb-4">
          <select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            className="w-1/2 p-2 border border-gray-300 rounded mr-2"
          >
            {currencies.map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
          <span className="mx-2">to</span>
          <select
            value={toCurrency}
            onChange={handleToCurrencyChange}
            className="w-1/2 p-2 border border-gray-300 rounded"
          >
            {currencies.map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
        </div>
        {conversionRate !== null && (
          <div className="text-center mt-4">
            <p className="text-lg font-semibold">
              {amount} {fromCurrency} = {convertAmount()} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;