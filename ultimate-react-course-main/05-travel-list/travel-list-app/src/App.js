import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <h1>🌴Far Away⛴️</h1>
  )
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function HandleSubmission(event) {
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false
    };
    console.log(newItem);
    initialItems.push(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={HandleSubmission}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map ((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="item..." onChange={(event) => setDescription(event.target.value) } ></input>
      <button>Add</button>
    </form>
  )
}

function PackingList() {
  return (
    <div className="list">
      <h2>Packing List</h2>
      <ul>
        {initialItems.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

function Item(props) {
  return (
    <li>
      <input type="checkbox" checked={props.item.packed ? true : null} />
      <span style={props.item.packed ? {textDecoration: "line-through"} : null}>
        {props.item.quantity} {props.item.description}
      </span>
      <button>❌</button>
    </li>
  )

}

function Stats() {
  return (
    <div className="stats">
      <h2>Stats</h2>
      <p>Items packed: 3</p>
    </div>
  )
}
