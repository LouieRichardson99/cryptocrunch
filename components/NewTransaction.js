import { useEffect, useState, useContext } from 'react'
import { UserContext } from "../context/userContext";
import firebase from "../firebase/initialiseFirebase";

export default function NewTransaction() {
    const user = useContext(UserContext);

    const db = firebase.firestore();
    const transactionsRef = db.collection('transactions');

    const [transaction, setTransaction] = useState({
        name: '',
        price: '',
        quantity: '',
        type: 'buy',
        date: ''
    })

    const handleSubmit = e => {
        e.preventDefault();

        if (user[0]) {
            try {
                const userUID = user[0].uid;

                transactionsRef.add({
                    uid: userUID,
                    name: transaction.name,
                    price: transaction.price,
                    quantity: transaction.quantity,
                    type: transaction.type,
                    date: transaction.date
                });
            } catch(error) {
                alert(error)
            }
        }

        setTransaction({
            name: '',
            price: '',
            quantity: '',
            type: 'buy',
            date: ''
        });
    }

    const handleChange = e => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setTransaction({
        name: '',
        price: '',
        quantity: '',
        type: 'buy',
        date: ''
    })
    }, [])

    return (
        <div>
            <p className="text-xl text-center">New Transaction<i aria-hidden className="fas fa-money-check-alt ml-3 mb-5"></i></p>
            <form onSubmit={handleSubmit} className="sm:w-96 px-3 mx-auto">
                <label className="block">
                    Cryptocurrency Name
                    <input
                        value={transaction.name}
                        className="block rounded-sm w-full mt-1" 
                        onChange={handleChange} 
                        type="text" 
                        name="name"
                        placeholder="Bitcoin?" 
                        required>
                    </input>
                </label>
                <label className="block mt-3">
                    Price Per Coin in £
                    <input
                        value={transaction.price}
                        className="block rounded-sm w-full mt-1"
                        onChange={handleChange} 
                        type="number" 
                        name="price" 
                        placeholder="5000"
                        required>
                    </input>
                </label>
                <label className="block mt-3">
                    Quantity
                    <input 
                        value={transaction.quantity}
                        className="block rounded-sm w-full mt-1"
                        onChange={handleChange} 
                        type="number" 
                        name="quantity" 
                        placeholder="3"
                        required>
                    </input>
                </label>
                <p className="mt-3">What type of transaction is it?</p>
                <select className="w-full mt-2" name="type" value={transaction.type} onChange={handleChange} required>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                </select>
                <label className="block mt-3">
                    Date
                    <input
                        value={transaction.date} 
                        className="block rounded-sm w-full mt-1"
                        onChange={handleChange} 
                        type="date" 
                        name="date" 
                        placeholder="dd/mm/yyyy"
                        required>
                    </input>
                </label>
                <button className="p-2 bg-gray-800 text-white w-full mt-3" type="submit">Add Transaction</button>
            </form>
        </div>
    )
}
