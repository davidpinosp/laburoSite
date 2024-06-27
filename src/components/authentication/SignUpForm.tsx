import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import GoogleSignUp from "./GoogleSignUp";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // instantiate the auth service SDK
  const auth = getAuth();
  const navigate = useNavigate();
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Handle user sign up with email and password
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Pull out user's data from the userCredential property
      const user = userCredential.user;
      console.log(user);
      navigate("/dashboard");
    } catch (err: any) {
      // Handle errors here

      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email address is already in use by another account."
          );
          break;
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };

  return (
    <div className="signinContainer">
      <div className="signinContainer__box">
        <div className="signinContainer__box__inner">
          <h1>Registrarse</h1>
          <form className="signinContainer__box__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={password}
            />
            <button type="submit">Registrarse</button>
            {error && <p>{errorMessage}</p>}

            <GoogleSignUp />
          </form>

          <div className="signupContainer__box__login">
            <p>
              ¿Tienes una cuenta?{" "}
              <Link className="laburo-green" to="/ingresar">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
