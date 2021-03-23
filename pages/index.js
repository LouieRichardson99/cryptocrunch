import { useContext } from "react";
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
        <Navbar />
        <SearchBar />
        {user[0] && <CoinList />}
        <TopTenList />
        {user[0] && <div className="md:flex justify-center mt-10 mb-10">
          <NewTransaction />
          <TransactionList />
        </div>}
    </div>
  )
};
