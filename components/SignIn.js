import { useContext, useState } from "react";
import firebase from "../firebase/initialiseFirebase";
import { UserContext } from "../context/userContext";

export default function SignIn(props) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const handleFormClose = () => {
    props.closeForm();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        setResult("Login successful!");
        setError(null);
        setForm({ email: "", password: "" });
      })
      .catch((error) => {
        setError(error.message);
        setResult(null);
      });
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-darkGray sm:w-96 p-4 rounded-md flex flex-wrap content-center justify-center">
        <div>
          <div className="flex justify-between mb-4">
            <p className="text-center text-xl text-gray-100">Sign in</p>
            <button onClick={handleFormClose}>
              <i aria-hidden className="fas fa-times text-xl text-gray-100"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mb-3">
            <input
              className="p-2 rounded-md bg-gray-100 border-darkGray block mb-2 mx-auto w-80 font-light text-gray-800"
              name="email"
              type="text"
              onChange={handleChange}
              value={form.email}
              required
              placeholder="Email"
            />
            <input
              className="p-2 rounded-md bg-gray-100 border-darkGray block mb-2 mx-auto w-80 font-light text-gray-800"
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              required
              placeholder="Password"
            />
            <button
              type="submit"
              className="rounded-md bg-darkerGray text-white p-2 block mx-auto w-80 font-light"
            >
              Login
              <i aria-hidden className="fas fa-user ml-2 text-lightBlue"></i>
            </button>
            {result && (
              <p className="text-center text-green-500 font-light mt-4 -mb-3">
                {result}
              </p>
            )}
            {error && (
              <p className="text-center text-red-500 font-light mt-4 -mb-3">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
