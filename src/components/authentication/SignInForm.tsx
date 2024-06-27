import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import "../../assets/styles/login.css";
const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Instantiate the auth service SDK
  const auth = getAuth();
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Sign in with email and password in firebase auth service
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // The signed-in user info
      const user = userCredential.user;

      console.log(user);
      navigate("/dashboard");
    } catch (err: any) {
      // Handle Errors here.

      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorMessage);

      switch (errorCode) {
        case "auth/invalid-credential":
          setErrorMessage(
            "Credenciales no validas. Por favor, inténtelo de nuevo."
          );
          break;
        case "auth/user-disabled":
          setErrorMessage(
            "Esta dirección de correo electrónico ha sido deshabilitada por el administrador."
          );
          break;
        case "auth/user-not-found":
          setErrorMessage(
            "Esta dirección de correo electrónico no está registrada."
          );
          break;
        case "auth/wrong-password":
          setErrorMessage(
            "La contraseña es inválida o el usuario no tiene una contraseña."
          );
          break;
        default:
          setErrorMessage(errorMessage);
          console.log(
            "Default case running. Error Code:" +
              (errorCode === "auth/invalid-email") +
              "",
            "" + errorCode
          );
          break;
      }
      setError(true);
    }
  };

  return (
    <div className="signinContainer">
      <div className="signinContainer__box">
        <div className="signinContainer__box__inner">
          <h1>Iniciar Sesión</h1>
          <form className="signinContainer__box__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
            />
            <button type="submit">Iniciar Sesión</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>

          <div className="signinContainer__box__signup">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to="/registrar" className="laburo-green">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
