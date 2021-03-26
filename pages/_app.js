import "tailwindcss/tailwind.css";
import { UserProvider } from "../context/userContext";
import { CurrencyProvider } from "../context/currencyContext";

function MyApp({ Component, pageProps }) {
  return (
    <CurrencyProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </CurrencyProvider>
  );
}

export default MyApp;
