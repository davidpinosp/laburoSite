import React from "react";
import SignInForm from "../../components/authentication/SignInForm";
import Navbar from "../../components/Navbar";

function SignIn() {
  return (
    <React.Fragment>
      <Navbar scrollPast={true} highlightLogin={true} />

      <SignInForm />
    </React.Fragment>
  );
}

export default SignIn;
