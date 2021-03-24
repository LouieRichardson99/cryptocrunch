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
        <nav className="navbar navbar-expand-sm navbar-light bg-darkGray px-8 text-white py-3 sm:py-4">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="/">CryptoCrunch</a>
                <button className="navbar-toggler bg-gray-200" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse sm-navbar:justify-end" id="navbarNav">
                <div className="navbar-nav">
                    {user[0] ? 
                        <div>
                            <p className="text-center mt-2 sm-navbar:mt-0 sm-navbar:mb-0 mb-1">{user[0].email}</p>
                            <SignOut />
                        </div> : 
                            <div className="sm-navbar:flex text-center my-2">
                                <button className="mr-6" onClick={handleLoginForm}>Sign in</button>
                                <button onClick={handleRegisterForm}>Register</button>
                            </div>
                    }   
                    {loginFormOpen && <LoginForm closeForm={handleLoginFormClose}/>}
                    {registerFormOpen && <RegisterForm closeForm={handleRegisterFormClose}/>}
                </div>
                </div>
            </div>
        </nav>
    )
}

