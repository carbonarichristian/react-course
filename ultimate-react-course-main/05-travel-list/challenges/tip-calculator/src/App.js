import { useState } from 'react';

export default function App() {
  const [bill, setBill] = useState(0);
  const [service, setService] = useState(0);
  const [friendService, setFriendService] = useState(0);

  const totService = (service + friendService) / 100 * bill;

  const total = bill + totService;

  function handleReset() {
    setBill(0);
    setService(0);
    setFriendService(0);
  }

  return (
    <div className="App">
      <h1>Tip Calculator</h1>
      <InputItem label="How much was the bill?" type="text" onSetBill={ setBill } onSetService={setService} />
      <InputItem label="How did you like the service?" type="select" onSetBill={ setBill } onSetService={setService} />
      <InputItem label="How did your friend like the service?" type="select" onSetBill={ setBill } onSetService={setFriendService} />
      <br />
      <Result bill={bill} service={totService} total={total} />
      <Reset onReset={handleReset} />
    </div>
  );
}

function InputItem({ label, type, onSetBill, onSetService, service }) {
  return (
    <div>
      <span>{label}</span>
      { type === "text" && <input type={type} placeholder="Enter the bill amount" onChange={(e) => onSetBill(Number(e.target.value)) }/>}
      { type === 'select' &&
        <select onChange={(e) => onSetService(Number(e.target.value))}>
          <option value="0" >Dissatisfied (0%)</option>
          <option value="5">It was okay (5%)</option>
          <option value="10">It was good(10%)</option>
          <option value="20">It was great (20%)</option>
        </select>
      }
    </div>
  );
}

function Result({bill, service, total}) {
  return (
    <div>
      <h2>Bill: ${bill}</h2>
      <h2>Tip: ${service}</h2>
      <h2>Total to pay: ${total}</h2>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <button onClick={onReset}>Reset</button>
  );
}
