import firebase from "../firebase/initialiseFirebase";

export default function SignOut() {
  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="justify-center flex sm-navbar:block mb-2 sm-navbar:mb-0">
      <button className="sm-navbar:float-right" onClick={handleSignOut}>
        Sign out
        <i aria-hidden className="fas fa-sign-out-alt ml-2 text-lightBlue"></i>
      </button>
    </div>
  );
}
