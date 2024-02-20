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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {openAddFriend && <AddFriendForm />}
        <Button
          onClick={() => setOpenAddFriend((prev) => !prev)}
          className="button"
        >
          {openAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
    </div>
  );
};

export default App;

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend, i) => (
        <FriendsListItem friend={friend} key={i} />
      ))}
    </ul>
  );
}

function FriendsListItem({ friend }) {
  const { name, image, balance } = friend;
  return (
    <li>
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
      <Button className="button">Select</Button>
    </li>
  );
}

function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label>🫡Friend name</label>
      <input type="text" />

      <label>🙅‍♂️ Image URL</label>
      <input type="text" />
      <Button type="submit" className="button">
        Add
      </Button>
    </form>
  );
}

function FormSplitBill(){
  return (
    <form className="form-split-bill">
      <h2>Split a bill with</h2>
    </form>
  );
}

function Button({ type = "submit", onClick, children, className }) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
