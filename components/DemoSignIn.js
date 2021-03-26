import { useContext } from "react";
import { UserContext } from "../context/userContext";
import firebase from "../firebase/initialiseFirebase";

export default function DemoSignIn() {
  const [user, setUser] = useContext(UserContext);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword("example@cryptocrunch.com", "password")
      .then((userCredentials) => {
        setUser(userCredentials.user);
      });
  };

  return (
    <button
      className="py-2 px-3 text-darkerGray rounded-md bg-lightBlue w-full sm:w-auto"
      onClick={handleSignIn}
    >
      Demo Account
    </button>
  );
}
