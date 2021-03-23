import { useContext, useState } from "react";
import firebase from "../firebase/initialiseFirebase";
import { UserContext } from "../context/userContext";

export default function RegisterForm(props) {
    const [form, setForm] = useState({ email: '', password: ''});
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [user, setUser] = useContext(UserContext);

    const handleFormClose = () => {
        props.closeForm();
    }

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
            .then(userCredentials => {
                setUser(userCredentials.user);
                setError(null);
                setResult('Registration successful!');
                setForm({email: '', password: ''});
            }).catch(error => {
                setError(error.message);
                setResult(null);
            });     
    };

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-gray-100 w-96 p-4 rounded-md flex flex-wrap content-center justify-center">
                <div>
                    <div className="flex justify-between mb-4">
                        <p className="text-center text-xl">Register</p>
                        <button onClick={handleFormClose}><i aria-hidden className="fas fa-times text-xl"></i></button>
                    </div>
                    <form onSubmit={handleSubmit} className="mb-3">
                        <input
                            className="p-2 rounded-sm border-gray-800 block mb-2 mx-auto w-80 font-light" 
                            name="email" 
                            type="text" 
                            onChange={handleChange} 
                            value={form.email} 
                            required
                            placeholder="john@crypto.com"
                        />
                        <input 
                            className="p-2 rounded-sm border-gray-800 block mb-2 mx-auto w-80 font-light" 
                            name="password" 
                            type="password" 
                            onChange={handleChange} 
                            value={form.password} 
                            required
                            placeholder="Choose a password"
                        />
                        <button type="submit" className="rounded-sm bg-gray-800 text-white p-2 block mx-auto w-80 font-light">
                            Register
                            <i aria-hidden className="fas fa-user ml-2"></i>
                        </button>
                    </form>
                </div>
            {result && <p className="text-center text-green-500">{result}</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
        </div>
    </div>
    )
}