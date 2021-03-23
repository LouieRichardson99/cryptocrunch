import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import firebase from "../firebase/initialiseFirebase";
import TransactionItem from "../components/TransactionItem";

export default function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    const user = useContext(UserContext);
    const db = firebase.firestore();
    const transactionsRef = db.collection('transactions');

    useEffect(() => {
        if (user[0]) {
            const userUID = user[0].uid;
            transactionsRef.where('uid', '==', userUID)
                .onSnapshot(querySnapshot => {
                    const transactions = querySnapshot.docs.map(doc => {
                        return {docData: doc.data(), docId: doc.id};
                    });

                setTransactions(transactions);
                });
        } else {
            setTransactions([]);
        }
    }, [user])
    
    return (
        <div className="w-full md:w-96 mt-10 md:mt-0">
            {transactions && <p className="text-xl text-center mb-5">My Transactions<i aria-hidden className="fas fa-wallet ml-3"></i></p>}
            {transactions.length == 0 && <p className="text-center">You don't seem to have any transactions</p>}
            {transactions && transactions.map(tx => {
                return <TransactionItem 
                    key={tx.docId}
                    txName={tx.docData.name}
                    txPrice={tx.docData.price}
                    txQuantity={tx.docData.quantity}
                    txType={tx.docData.type}
                    txDate={tx.docData.date}
                    txDocId={tx.docId}
                />
            })}
        </div>

    )
}
