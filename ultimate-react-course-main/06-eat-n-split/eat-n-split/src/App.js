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
  const [addFriend, setAddFriend] = useState(false);
  const [friendSelected, setFriendSelected] = useState(null);
  const [friends, setFriends] = useState(initialFriends);

  function handleSubmission(friend) {
    setFriends([...friends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} addFriend={addFriend} onAddFriend={setAddFriend} friendSelected={friendSelected} onSelectFriend={setFriendSelected} />
        <FormAddFriend addFriend={addFriend} onAddFriend={handleSubmission} />
      </div>
      <FormSplitBill friendSelected={friendSelected} setFriendSelected={setFriendSelected} friends={friends} setFriends={setFriends}/>
    </div>
  );
}

function FriendsList({friends, addFriend, onAddFriend, friendSelected, onSelectFriend}) {
  return (
    <div>
      <ul className="friends-list">
        {friends.map((friend) => (
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

function FormAddFriend({addFriend, onAddFriend}) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  const friendId = crypto.randomUUID();

  function handleSubmission(e) {
    e.preventDefault();

    if (!friendName || !friendImage) return;

    const newFriend = {
      id: friendId,
      name: friendName,
      image: `${friendImage}?u=${friendId}`,
      balance: 0,
    };

    console.log(newFriend);

    onAddFriend(newFriend);

    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
  }

  return (
    <div>
      {addFriend &&
        <form className="form-add-friend" onSubmit={handleSubmission}>
          <label>🧑‍🤝‍🧑Friend Name</label>
          <input type="text" onChange={(e) => setFriendName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}  />
          <label>🖼️Image Url</label>
          <input type="text" onChange={(e) => setFriendImage(e.target.value)} />
          <button className="button">Add</button>
        </form>
      }
    </div>
  );
}

function FormSplitBill({friendSelected, setFriendSelected, friends, setFriends}) {
  const [totalBill, setTotalBill] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);
  const [friendExpenses, setFriendExpenses] = useState(0);
  const [payer, setPayer] = useState("user");

  function setExpenses(e) {
    if (Number(e.target.value) > totalBill) return alert("Expenses cannot exceed total bill amount");
    setUserExpenses(Number(e.target.value));
    setFriendExpenses(totalBill - Number(e.target.value));
  }

  function handleSplitSubmission(e) {
    e.preventDefault()

    setFriends(friends.map((friend) => {
      if (friendSelected.id === friend.id) {
        if (payer === "user") {
          return {
            ...friend,
            balance: friend.balance - userExpenses + friendExpenses
          };
        } else if (payer === "friend") {
          return {
            ...friend,
            balance: friend.balance + userExpenses - friendExpenses
          };
        }
      }

      setFriendSelected(null);

      return friend;
    }));
  }

  return (
    <div>
      {friendSelected && (
        <form className="form-split-bill">
          <h2>Split Bill with {friendSelected.name}</h2>
          <label>💸Total Bill Amount</label>
          <input type="number" onChange={(e) => setTotalBill(Number(e.target.value))} />

          <label>🧑‍🤝‍🧑Your Expenses</label>
          <input type="number" onBlur={(e) => setExpenses(e)} />

          <label>🧑‍🤝‍🧑{friendSelected.name}'s Expenses</label>
          <input type="number" value={friendExpenses} disabled />

          <label>Who is paying the bill?</label>
          <select onChange={(e) => setPayer(e.target.value)}>
            <option value="user">You</option>
            <option value="friend">{friendSelected.name}</option>
          </select>

          <button className="button" onClick={handleSplitSubmission}>Split</button>
        </form>
      )}
    </div>
  );
}
