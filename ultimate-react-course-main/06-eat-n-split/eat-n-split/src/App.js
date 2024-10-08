import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  const [addFriend, setAddFriend] = useState(true);
  const [friendSelected, setFriendSelected] = useState(null);
  const [newFriend, setNewFriend] = useState({name: '', image: ''});

  function handleAddFriend(newFriend) {
    setAddFriend(!addFriend);
    console.log(newFriend);

  }


  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList addFriend={addFriend} onAddFriend={setAddFriend} friendSelected={friendSelected} onSelectFriend={setFriendSelected} />
        <FormAddFriend addFriend={addFriend} newFriend={newFriend} onAddFriend={setNewFriend} addNewFriend={handleAddFriend}/>
      </div>
      <FormSplitBill friendSelected={friendSelected}/>
    </div>
  );
}

function FriendsList({addFriend, onAddFriend, friendSelected, onSelectFriend}) {
  return (
    <div>
      <ul className="friends-list">
        {initialFriends.map((friend) => (
          <Friend key={friend.id} friend={friend} friendSelected={friendSelected} onSelectFriend={onSelectFriend} />
        ))}
      </ul>
      <button className="button" onClick={() => onAddFriend(!addFriend)}>Add Friend</button>
    </div>
  );
}

function Friend({ friend, friendSelected, onSelectFriend }) {
  return (
    <li className="friend">
      <img className="friend-image" src={friend.image} alt="" />
      <h3 className="friend-name">{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">You owe {friend.name} ${friend.balance}</p>
      )}
      {friend.balance < 0 && (
        <p className="green">{friend.name} owes you ${-friend.balance}</p>
      )}
      {friend.balance === 0 && <p>{friend.name} is all settled up!</p>}
      <button className="button" onClick={() => friendSelected !== friend ? onSelectFriend(friend) : onSelectFriend(null)}>Select</button>
    </li>
  );
}

function FormAddFriend({addFriend, newFriend, onAddFriend, addNewFriend}) {
  return (
    <div>
      {addFriend &&
        <form className="form-add-friend" onSubmit={() => addNewFriend(newFriend)}>
          <label>🧑‍🤝‍🧑Friend Name</label>
          <input type="text" onChange={(e) => onAddFriend({name: e.target.value})}  />
          <label>🖼️Image Url</label>
          <input type="text" onChange={(e) => onAddFriend({image: e.target.value})} />
          <button className="button">Add</button>
        </form>
      }
    </div>
  );
}

function FormSplitBill({friendSelected}) {
  return (
    <div>
      {friendSelected && (
        <form className="form-split-bill">
          <h2>Split Bill with {friendSelected.name}</h2>
          <label>💸Total Bill Amount</label>
          <input type="number" />
          <label>🧑‍🤝‍🧑Your Expenses</label>
          <input type="number" />
          <label>🧑‍🤝‍🧑{friendSelected.name}'s Expenses</label>
          <input type="number" value={Math.abs(friendSelected.balance)} disabled />
          <label>Who is paying the bill?</label>
          <select>
            <option value="user">You</option>
            <option value="friend">{friendSelected.name}</option>
          </select>
          <button className="button">Split</button>
        </form>
      )}
    </div>
  );
}
