import { useContext } from "react";
import Head from "next/head";
import { UserContext } from "../context/userContext";
import TopTenList from "../components/TopTenList";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import CoinList from "../components/CoinList";
import Navbar from "../components/Navbar";
import NewTransaction from "../components/NewTransaction";
import DemoSignIn from "../components/DemoSignIn";

export default function Home() {
  const user = useContext(UserContext);

  return (
    <div className="text-gray-100">
      <Head>
        <title>Cryptocrunch | Price Tracker</title>
        <meta
          name="description"
          content="Cryptocrunch is a cryptocurrency price tracker which allows user sign ups to track their favourite cryptos and transactions"
        />
      </Head>
      <Navbar />
      {user[0] ? null : (
        <div className="max-w-screen-sm w-10/12 text-center mx-auto my-10">
          <h2 className="mt-6 mb-3 text-xl">
            About{" "}
            <i aria-hidden className="fas fa-comment ml-3 text-lightBlue"></i>
          </h2>
          <p className="text-left">
            Cryptocrunch is a cryptocurrency price tracker. It is designed to
            allow users to register to log their transactions and make a list of
            their favourite cryptocurrencies!
          </p>
          <p className="mt-3 text-left">
            Why not register? It only takes a second and you can see all the
            features this app has to offer.
          </p>
          <p className="mt-3 text-left mb-3">
            Or you can access the demo account!
          </p>
          <div className="justify-start flex">
            <DemoSignIn />
          </div>
        </div>
      )}
      <SearchBar />
      {user[0] && <CoinList />}
      <TopTenList />
      {user[0] && (
        <div className="md:flex justify-center sm:mt-14 mt-10 mb-10">
          <NewTransaction />
          <TransactionList />
        </div>
      )}
    </div>
  );
}
