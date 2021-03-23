import { useState, useEffect, createContext } from "react";
import firebase from "../firebase/initialiseFirebase";

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            };
        });
    }, [])


    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
};


