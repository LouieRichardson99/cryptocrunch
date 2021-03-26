import { useState, useContext } from "react";
import { CurrencyContext } from "../context/currencyContext";
import { UserContext } from "../context/userContext";
import firebase from "../firebase/initialiseFirebase";

export default function NewTransaction() {
  const user = useContext(UserContext);
  const currency = useContext(CurrencyContext);

  const db = firebase.firestore();
  const transactionsRef = db.collection("transactions");

  const [transaction, setTransaction] = useState({
    name: "",
    price: "",
    quantity: "",
    type: "buy",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user[0]) {
      try {
        const userUID = user[0].uid;

        transactionsRef.add({
          uid: userUID,
          name: transaction.name || "No name",
          price: transaction.price || "No price",
          quantity: transaction.quantity || "No quantity",
          type: transaction.type || "No TX type",
          date: transaction.date || "No date",
        });
      } catch (error) {
        alert(error);
      }
    }

    setTransaction({
      name: "",
      price: "",
      quantity: "",
      type: "buy",
      date: "",
    });
  };

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <p className="text-xl text-center text-gray-100">
        New Transaction
        <i
          aria-hidden
          className="fas fa-money-check-alt ml-3 mb-5 text-lightBlue"
        ></i>
      </p>
      <form
        onSubmit={handleSubmit}
        className="sm:w-96 px-3 mx-auto text-gray-100"
      >
        <label className="block">
          Cryptocurrency Name
          <input
            value={transaction.name}
            className="block rounded-md w-full mt-2 bg-darkerGray border-none"
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Bitcoin?"
          ></input>
        </label>
        <label className="block mt-3">
          Price Per Coin in {currency[0][0]}
          <input
            value={transaction.price}
            className="block rounded-md w-full mt-2 bg-darkerGray border-none"
            onChange={handleChange}
            type="number"
            name="price"
            placeholder="5000"
          ></input>
        </label>
        <label className="block mt-3">
          Quantity
          <input
            value={transaction.quantity}
            className="block rounded-md w-full mt-2 bg-darkerGray border-none"
            onChange={handleChange}
            type="number"
            name="quantity"
            placeholder="3"
          ></input>
        </label>
        <p className="mt-3">What type of transaction is it?</p>
        <select
          className="w-full mt-2 text-white bg-darkerGray border-none rounded-md"
          name="type"
          value={transaction.type}
          onChange={handleChange}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <label className="block mt-3">
          Date
          <input
            value={transaction.date}
            className="block rounded-md w-full mt-2 bg-darkerGray border-none"
            onChange={handleChange}
            type="date"
            name="date"
            placeholder="dd/mm/yyyy"
          ></input>
        </label>
        <button
          className="p-2 text-darkerGray rounded-md bg-lightBlue w-full mt-3"
          type="submit"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
