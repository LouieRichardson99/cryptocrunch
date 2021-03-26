import { useState, createContext } from "react";

export const CurrencyContext = createContext();

export function CurrencyProvider(props) {
  const [currency, setCurrency] = useState(["£", "gbp"]);

  return (
    <CurrencyContext.Provider value={[currency, setCurrency]}>
      {props.children}
    </CurrencyContext.Provider>
  );
}
