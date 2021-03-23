import { useContext } from "react";
import Percentage from "./Percentage";
import firebase from "../firebase/initialiseFirebase";
import { UserContext } from "../context/userContext";
import numeral from "numeral";

export default function SearchResult(props) {
    const user = useContext(UserContext);

    const handleCoinSave = () => {
        if (user[0]) {            
            const userUID = user[0].uid;

            const db = firebase.firestore();
            const coinsRef = db.collection('coins');
    
            coinsRef.where('uid', '==', userUID)
                .where('cryptoName', '==', props.cryptoSearchID)  
                .get()
                .then(snapshot => {
                    if (snapshot.docs.length == 0 && snapshot.docs.length < 100) {
                        coinsRef.add({
                            uid: userUID,
                            cryptoName: props.cryptoSearchID
                        })
                    }
                })

            props.closeResultBar();
        }
    };

    return (
        <div className="justify-center flex">
            <div className="w-11/12 sm:w-auto sm:inline-flex flex mx-auto bg-gray-100 mb-3 mt-3 justify-center px-3 py-3 rounded-sm text-gray-800 tex">
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
                {user[0] && 
                <div className="my-auto mr-3 ml-6 sm:ml-0">
                    <button onClick={handleCoinSave}>
                        <i aria-hidden className="fas fa-star text-xl text-yellow-500 hover:text-yellow-600"></i>
                    </button>
                </div>}
            </div>
        </div>
    )
}
