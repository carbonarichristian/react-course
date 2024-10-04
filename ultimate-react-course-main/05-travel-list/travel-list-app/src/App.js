import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <h1>🌴Far Away⛴️</h1>
  )
}

function Form({onAddItem}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmission(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);

  }

  return (
    <form className="add-form" onSubmit={handleSubmission}>
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

function PackingList({items}) {
  return (
    <div className="list">
      <h2>Packing List</h2>
      <ul>
        {items.map(item => (
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
