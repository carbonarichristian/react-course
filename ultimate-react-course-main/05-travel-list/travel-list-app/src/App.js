import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItems(items => items.filter((items) => items.id !== id));
  }

  function handleTogglePacked(id) {
    setItems(items => items.map((item) => {
      if (item.id !== id) return item;
      return {...item, packed: !item.packed};
    }));
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onTogglePacked={handleTogglePacked} onClearList={handleClearList}/>
      <Stats items={items} />
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
    document.querySelector("input").value = "";
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

function PackingList({items, onDeleteItem, onTogglePacked, onClearList}) {
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "input") return a.id - b.id; // Sort by input order (assuming `id` is the input order)
    if (sortBy === "description") return a.description.localeCompare(b.description); // Sort by description alphabetically
    if (sortBy === "packed") return Number(a.packed) - Number(b.packed); // Sort by packed status (false -> true)
  });

  return (
    <div className="list">
      <h2>Packing List</h2>
      <ul>
        {sortedItems.map(item => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onTogglePacked={onTogglePacked}/>
        ))}
      </ul>

    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={() => onClearList()}>
        Clear list
      </button>
    </div>
    </div>

  )
}

function Item({item, onDeleteItem, onTogglePacked}) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onTogglePacked(item.id) }/>
      <span style={item.packed ? {textDecoration: "line-through"} : null}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )

}

function Stats({items}) {
  if (items.length === 0)
    return(
      <div className="stats">
        <p>Start adding something in your list!</p>
      </div>
    )

  const itemsPacked = items.filter((item) => item.packed).length;
  const percentagePacked = items.length > 0 ? itemsPacked / items.length * 100 : 0;

  return (
    <div className="stats">
      <p>You have <strong>{items.length}</strong> items in your list, <strong>{itemsPacked}</strong> items already packed ({percentagePacked}%) </p>
    </div>
  )
}
