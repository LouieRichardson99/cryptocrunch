import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import firebase from "../firebase/initialiseFirebase";
import SavedCoin from './SavedCoin';

export default function CoinsList() {
    const [coins, setCoins] = useState(null);
    const [searchIDs, setSearchIDs] = useState("");
    const user = useContext(UserContext);

    useEffect(() => {
        const db = firebase.firestore();
        const coinsRef = db.collection('coins');
        let unsubscribe;

        if (user[0]) {
            const userUID = user[0].uid;
            unsubscribe = coinsRef.where('uid', '==', userUID)
                .onSnapshot(querySnapshot => {
                    const searchIDArr = [];
                    querySnapshot.docs.map(doc => {
                        searchIDArr.push(doc.data().cryptoName);
                    });
                const coinApiSearchString = searchIDArr.toLocaleString().replaceAll(",", "%2C");
                setSearchIDs(coinApiSearchString);
                });
        } else {
            setSearchIDs("")
            setCoins(null);
            unsubscribe && unsubscribe();
        }
    }, [user, searchIDs]);

    useEffect(() => {
        if (searchIDs.length !== 0) {
            axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&ids=${searchIDs}`)
            .then(res => {
                console.log(res.data)
                const coinsArr = res.data;
                setCoins(coinsArr);
            }) 
        } else {
            setCoins(null)
        }
    }, [user, searchIDs])

    return (
        <div>
            {searchIDs && <p className="text-center my-3 text-xl sm:mt-8">My Coins<i aria-hidden className="fas fa-coins ml-3"></i></p>}
            {coins && coins.map(coin => {
                return <SavedCoin
                    key={coin.id}
                    cryptoName={coin.name}
                    cryptoId={coin.id}
                    cryptoSymbol={coin.symbol}
                    cryptoImage={coin.image}
                    cryptoPrice={coin.current_price}
                    cryptoPercentage={coin.price_change_percentage_24h.toFixed(2)}
                    cryptoMarketcap={coin.market_cap}
                    cryptoVolume={coin.total_volume}
                />
            })}
        </div>
    )
}
