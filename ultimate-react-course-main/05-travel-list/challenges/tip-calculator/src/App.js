export default function App() {
  return (
    <div className="App">
      <h1>Tip Calculator</h1>
      <InputItem label="How much was the bill?" type="text" />
      <InputItem label="How did you like the service?"  />
    </div>
  );
}

function InputItem({ label, type }) {
  return (
    <div>
      <p>{label}</p>
      <input type={type} />
    </div>
  );
}
