import { useState } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

export default function SearchBar() {
    const [coin, setCoin] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleResultBarClose = () => {
        setIsOpen(false);
        setCoin('');
    }

    const handleCoinName = e => {
        setSearchValue(e.target.value);
    }

    const handleCoinSearch = async (e) => {
        e.preventDefault();
        let searchResult = searchValue.toLowerCase();
        searchResult = searchResult.replace(/\s+/g, "-");

        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${searchResult}`);
            setCoin(data);
            setIsOpen(true);
            setError(false);
        } 
        catch {
            setError(true);
            setIsOpen(false);
        }

        setSearchValue('');
    }

    return (
        <div>
            <form onSubmit={handleCoinSearch} className="mx-auto flex justify-center mt-5">
                <input className=" bg-darkGray p-2 rounded-sm pl-3 w-64 text-md border-none placeholder-gray-400 border text-white" required value={searchValue} onChange={handleCoinName} type="text" placeholder="Search for a coin, e.g. 'Bitcoin'" />
                <button className="p-2 rounded-sm ml-1" type="submit"><i aria-hidden className="fas fa-search mr-2 text-lightBlue"></i></button>
            </form>
            {isOpen && <SearchResult
                cryptoRank={coin.market_cap_rank}
                cryptoImage={coin.image.small}
                cryptoName={coin.name}
                cryptoSymbol={coin.symbol}
                cryptoPrice={coin.market_data.current_price.gbp}
                cryptoPercentage={coin.market_data.price_change_percentage_24h.toFixed(2)}
                cryptoMarketcap={coin.market_data.market_cap.gbp}
                cryptoVolume={coin.market_data.total_volume.gbp}
                cryptoSearchID={coin.id}
                closeResultBar={handleResultBarClose}
            />}
            {error && <p className="text-center mt-3 text-white">There seems to have been an error.</p>}
        </div>
    )
}
