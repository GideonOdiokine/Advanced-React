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

const App = () => {
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddFriend = (callback) => {
    setFriends((friends) => [...friends, callback]);
    setOpenAddFriend(false);
  };

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
    setOpenAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedUser.id
          ? {
              ...friend,
              balance: friend.balance + value,
            }
          : friend
      )
    );
    setSelectedUser(null)
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedUser={selectedUser}
          handleSelectedUser={handleSelectedUser}
        />
        {openAddFriend && <AddFriendForm handleAddFriend={handleAddFriend} />}
        <Button
          onClick={() => setOpenAddFriend((prev) => !prev)}
          className="button"
        >
          {openAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedUser && (
        <FormSplitBill
          selectedUser={selectedUser}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

export default App;

function FriendsList({ friends, handleSelectedUser, selectedUser }) {

  return (
    <ul>
      {friends.map((friend, i) => (
        <FriendsListItem
          friend={friend}
          selectedUser={selectedUser}
          key={i}
          handleSelectedUser={handleSelectedUser}
        />
      ))}
    </ul>
  );
}

function FriendsListItem({ friend, handleSelectedUser, selectedUser }) {
  const { name, image, balance, id } = friend;
  return (
    <li className={`${selectedUser?.id === id ? "selected" : ""}`}>
      <img src={image} alt={image} />
      <h3> {name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}$
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you {Math.abs(balance)}$
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button
        onClick={() =>
          handleSelectedUser(friend !== selectedUser ? friend : null)
        }
        className="button"
      >
        {selectedUser?.name !== name ? "Select" : "close"}
      </Button>
    </li>
  );
}

function AddFriendForm({ handleAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!friendName || !imageURL) return;

    const id = crypto.randomUUID();
    handleAddFriend({
      id,
      name: friendName,
      image: `${imageURL}?=${id}`,
      balance: 0,
    });

    setFriendName("");
    setImageURL("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🫡Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🙅‍♂️ Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <Button className="button">Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedUser, handleSplitBill }) {
  const { name } = selectedUser;
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      <label>💷 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🤦‍♂️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>🧑‍🤝‍🧑 {name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💷 Who is paying the bill </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button type="submit" className="button">
        Split bill
      </Button>
    </form>
  );
}

function Button({ type = "submit", onClick, children, className, rest }) {
  return (
    <button {...rest} type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
