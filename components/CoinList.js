import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import firebase from "../firebase/initialiseFirebase";
import SavedCoin from "./SavedCoin";

export default function CoinsList() {
  const [coins, setCoins] = useState(null);
  const [searchIDs, setSearchIDs] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    const db = firebase.firestore();
    const coinsRef = db.collection("coins");

    if (user[0]) {
      const userUID = user[0].uid;
      coinsRef.where("uid", "==", userUID).onSnapshot((querySnapshot) => {
        const searchIDArr = [];
        querySnapshot.docs.map((doc) => {
          searchIDArr.push(doc.data().cryptoName);
        });
        const coinApiSearchString = searchIDArr
          .toLocaleString()
          .replaceAll(",", "%2C");
        setSearchIDs(coinApiSearchString);
      });
    } else {
      setSearchIDs("");
      setCoins(null);
    }
  }, [user, searchIDs]);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      if (searchIDs.length !== 0) {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&ids=${searchIDs}&price_change_percentage=24h`
        );
        setCoins(data);
      } else {
        setCoins(null);
      }
    }
  }, [searchIDs, user]);

  return (
    <div>
      {coins && (
        <p className="text-center text-gray-100 text-xl mt-10 mb-4">
          My Coins
          <i aria-hidden className="fas fa-coins ml-3 text-lightBlue"></i>
        </p>
      )}
      {coins &&
        coins.map((coin) => {
          return (
            <SavedCoin
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
          );
        })}
    </div>
  );
}
