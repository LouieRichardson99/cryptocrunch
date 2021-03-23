import { useEffect, useState } from "react";
import PriceTile from "./TopTenCoin";
import axios from "axios";

export default function TopTenList() {
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(res => {
          setCoinData(res.data)
        })
    }, [])

    return (
        <div className="mt-8">
            <p className="text-xl text-center my-5">Cryptocurrency Market Top 10<i aria-hidden className="fas fa-funnel-dollar ml-3"></i></p>
            {coinData.map(coin => {
                return <PriceTile
                    key={coin.name}
                    cryptoImage={coin.image}
                    cryptoName={coin.name}
                    cryptoSymbol={coin.symbol}
                    cryptoPrice={coin.current_price}
                    cryptoPercentage={coin.price_change_percentage_24h.toFixed(2)}
                    cryptoMarketcap={coin.market_cap}
                    cryptoVolume={coin.total_volume}
                    cryptoSearchID={coin.id}
                />
            })}
        </div>
    )
}
