import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import SignOut from "../components/SignOut";
import LoginForm from "./SignIn";
import RegisterForm from "../components/RegisterForm";

export default function Navbar() {
    const user = useContext(UserContext);
    const [loginFormOpen, setLoginFormOpen] = useState(false);
    const [registerFormOpen, setRegisterFormOpen] = useState(false);

    const handleLoginForm = () => {
        setLoginFormOpen(true);
        setRegisterFormOpen(false);
    }

    const handleLoginFormClose = () => {
        setLoginFormOpen(false);
    }

    const handleRegisterForm = () => {
        setRegisterFormOpen(true);
        setLoginFormOpen(false);
    }

    const handleRegisterFormClose = () => {
        setRegisterFormOpen(false);
    }

    return (
        <div className="flex justify-between p-5 bg-gray-100">
            <a className="flex my-auto text-xl" href='/'><h1>CryptoCrunch</h1></a>
            {user[0] ? 
                <div>
                    <p>{user[0].email}</p>
                    <SignOut />
                </div> : 
                <div>
                    <button className="mr-6" onClick={handleLoginForm}>Sign in</button>
                    <button onClick={handleRegisterForm}>Register</button>
                </div>
            }   
            {loginFormOpen && <LoginForm closeForm={handleLoginFormClose}/>}
            {registerFormOpen && <RegisterForm closeForm={handleRegisterFormClose}/>}
        </div>
    )
}
