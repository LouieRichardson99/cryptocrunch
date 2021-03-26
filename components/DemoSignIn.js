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
      className="p-2 text-darkerGray rounded-md bg-lightBlue"
      onClick={handleSignIn}
    >
      Demo Sign In
    </button>
  );
}
