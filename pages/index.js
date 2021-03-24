import { useContext } from "react";
import Head from "next/head";
import { UserContext } from "../context/userContext";
import TopTenList from "../components/TopTenList"
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import CoinList from "../components/CoinList";
import Navbar from "../components/Navbar";
import NewTransaction from "../components/NewTransaction";

export default function Home() {
  const user = useContext(UserContext);

  return (
    <div>
        <Head>
          <title>Cryptocrunch | Price Tracker</title>
          <meta name="description" content="Cryptocrunch is a cryptocurrency price tracker which allows user sign ups to track their favourite cryptos and transactions"/>
        </Head>
        <Navbar />
        <SearchBar />
        {user[0] && <CoinList />}
        <TopTenList />
        {user[0] && <div className="md:flex justify-center mt-10 mb-10">
          <NewTransaction />
          <TransactionList />
        </div>}
        {user[0] ? null : <div className="max-w-screen-sm w-10/12 text-center mx-auto my-10">
          <p>
            Cryptocrunch is a cryptocurrency price tracker. It is designed to allow users to register to log their transactions and make a list of their favourite cryptocurrencies!
          </p>
          <p className="mt-3">
            Why not register? It only takes a second and you can see all the features this app has to offer.
          </p>
        </div>}
    </div>
  )
};
