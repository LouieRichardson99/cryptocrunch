import { useContext, useState } from "react";
import Percentage from "../components/Percentage";
import firebase from "../firebase/initialiseFirebase";
import { UserContext } from "../context/userContext";
import numeral from "numeral";

export default function SavedCoin(props) {
    const [isLoading, setIsLoading] = useState(false);
    const user = useContext(UserContext);

    const db = firebase.firestore();
    const coinsRef = db.collection('coins');

    const handleDelete = () => {
        if (user[0]) {
            setIsLoading(true);
            const userUID = user[0].uid;

            const searchQuery = coinsRef
                .where('uid', '==', userUID)
                .where('cryptoName', '==', props.cryptoId);

            searchQuery.get().then(snapshot => {
                snapshot.forEach(doc => {
                    coinsRef.doc(doc.id).delete();
                })
            })
        }      
    }

    return (
        <div className="justify-center flex">
            <div className="bg-gray-100 my-0.5 justify-center px-2 py-2 rounded-sm inline-flex text-gray-700 w-11/12 sm:w-auto">
                <div className="w-12 mr-2 object-cover flex justify-center">            
                    <img
                        className="h-8 my-auto rounded-full"
                        src={props.cryptoImage}
                        alt={props.cryptoName}>
                    </img>
                </div>
                <div className="w-28 sm:w-32 my-auto">
                    <p>{props.cryptoName}</p>
                    <p className="text-xs">{props.cryptoSymbol.toUpperCase()}</p>
                </div>
                <div className="sm:flex block my-auto">
                    <p className="w-24 sm:w-20 text-lg sm:my-auto font-light sm:mb-0 -mb-2 sm:ml-2 justify-end flex">£{numeral(props.cryptoPrice).format('0,0[.]00')}</p>
                    <div className="my-auto w-24 justify-end flex">
                        <Percentage 
                            cryptoPercentage={props.cryptoPercentage}
                        />
                    </div>
                </div>
                <div className="ml-3 w-24 my-auto hidden sm:block">
                    <p className="font-light"><span className="font-medium mr-2">MC</span>£{numeral(props.cryptoMarketcap).format('0a')}</p>
                    <p className="font-light"><span className="font-medium mr-2">Vol</span>£{numeral(props.cryptoVolume).format('0a')}</p>
                </div>
                <div className="my-auto mr-3 text-gray-700">
                    <button onClick={handleDelete} className="block mx-auto">
                        {isLoading ? <i aria-hidden className="fas fa-spinner animate-spin"></i> : <i aria-hidden className="fas fa-trash"></i>}
                    </button>
                </div>
            </div>
        </div>

    )
}
