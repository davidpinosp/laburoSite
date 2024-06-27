import googleLogo from "../../assets/images/googleLogo.png";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useState } from "react";

import "../../assets/styles/login.css";
const GoogleSignUp: React.FC = () => {
  const [error, setError] = useState(false);
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");

  // Instantiate the auth service SDK
  const auth = getAuth();

  // Handle user sign up with Google
  const handleGoogleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Instantiate a GoogleAuthProvider object
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with a pop-up window
      const result = await signInWithPopup(auth, provider);

      // Pull signed-in user credential.
      const user = result.user;
      console.log("User signed in:", user);

      // display success and move to other page
    } catch (err: any) {
      // Handle errors here.
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/operation-not-allowed":
          setGoogleErrorMessage("Email/password accounts are not enabled.");
          break;
        case "auth/operation-not-supported-in-this-environment":
          setGoogleErrorMessage(
            "HTTP protocol is not supported. Please use HTTPS."
          );
          break;
        case "auth/popup-blocked":
          setGoogleErrorMessage(
            "Popup has been blocked by the browser. Please allow popups for this website."
          );
          break;
        case "auth/popup-closed-by-user":
          setGoogleErrorMessage(
            "Popup has been closed by the user before finalizing the operation. Please try again."
          );
          break;
        default:
          setGoogleErrorMessage(errorMessage);
          break;
      }
    }
  };

  return (
    <div className="signupContainer__box__google">
      <button
        onClick={handleGoogleSignUp}
        className="signupContainer_button_google"
      >
        <img
          src={googleLogo}
          style={{ height: "auto", width: "20px" }}
          alt="Google Logo"
        />
        <div className="google-txt">Registrarse con Google</div>
      </button>
      {error && <p>{googleErrorMessage}</p>}
    </div>
  );
};

export default GoogleSignUp;
