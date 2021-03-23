import firebase from "../firebase/initialiseFirebase";

export default function SignOut() {
    const handleSignOut = () => {
        firebase.auth().signOut();
    }

    return (
        <div>
            <button className="float-right" onClick={handleSignOut}>Sign out</button>
        </div>
    )
}
