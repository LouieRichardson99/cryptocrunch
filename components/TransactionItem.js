import { useContext, useState } from "react";
import firebase from "../firebase/initialiseFirebase";
import { UserContext } from "../context/userContext";
import { format } from "date-fns";
import numeral from "numeral";

export default function TransactionItem(props) {
    const [isLoading, setIsLoading] = useState(false);
    const user = useContext(UserContext);

    const db = firebase.firestore();
    const transactionsRef = db.collection('transactions');

    const handleDelete = () => {
        setIsLoading(true);
        if (user[0]) {
            transactionsRef.doc(props.txDocId)
                .delete();
        }
    }

    let date;
    if (props.txDate !== 'No date') {
        date = format(new Date(props.txDate), 'LLLL d yyyy');
    }
    
    return (
        <div className="flex justify-center mb-8 text-white">
            <div className="font-medium sm:w-8/12 md:w-10/12 w-11/12">
                <p>Name <span className="font-light float-right capitalize">{props.txName}</span></p>
                <p>Price per coin <span className="font-light float-right">£{numeral(props.txPrice).format('0,0[.]00')}</span></p>
                <p>Quantity <span className="font-light float-right">{props.txQuantity}</span></p>
                <p>Transaction type <span className={`font-light float-right capitalize ${props.txType == 'buy' ? 'text-green-500' : 'text-red-500'}`}>{props.txType}</span></p>
                <p>Date <span className="font-light float-right">{date}</span></p>
                <button onClick={handleDelete} className="w-full bg-lightBlue text-gray-800 rounded-md mt-2 p-1 sm:p-0">
                    {isLoading ? <i aria-hidden className="fas fa-spinner animate-spin"></i> : <i aria-hidden className="fas fa-trash"></i>}
                </button>
            </div>
        </div>
    )
}
