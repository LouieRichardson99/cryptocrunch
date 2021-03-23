import firebase from "../firebase/initialiseFirebase";

export default function SignOut() {
    const handleSignOut = () => {
        firebase.auth().signOut();
    }

    return (
        <div>
            <button className="float-right" onClick={handleSignOut}>Sign out<i aria-hidden className="fas fa-sign-out-alt ml-2"></i></button>
        </div>
    )
}
