import { useContext } from "react";
import { CurrencyContext } from "../context/currencyContext";

export default function CurrencySelector() {
  const [currency, setCurrency] = useContext(CurrencyContext);

  const handleCurrency = (currency) => {
    setCurrency(currency);
  };

  return (
    <div className="bg-lightBlue text-gray-100 rounded-l-md fixed right-0 bottom-5 py-1 px-2">
      <button
        className="text-lg block mb-1"
        onClick={() => handleCurrency(["£", "gbp"])}
      >
        £
      </button>
      <button
        className="text-lg block mb-1"
        onClick={() => handleCurrency(["$", "usd"])}
      >
        $
      </button>
      <button
        className="text-lg block"
        onClick={() => handleCurrency(["€", "eur"])}
      >
        €
      </button>
    </div>
  );
}
