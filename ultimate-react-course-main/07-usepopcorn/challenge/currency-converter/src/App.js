import { useEffect, useState } from "react";

const BASE_URL = "https://api.frankfurter.app/latest?"; // API URL

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [value, setValue] = useState(null);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}base=${fromCurrency}&symbols=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setOutput(data.rates[toCurrency] * value);
      });
  }, [fromCurrency, toCurrency, value]);

  return (
    <div className="app">
      <input type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value to convert"
      />
      <select onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT: {output} {toCurrency}</p>
    </div>
  );
}

export default App;
