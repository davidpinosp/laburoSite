import React from "react";
import SignUpForm from "../../components/authentication/SignUpForm";
import Navbar from "../../components/Navbar";

function SignUp() {
  return (
    <React.Fragment>
      <Navbar scrollPast={true} hideSignIn={true} />

      <SignUpForm />
    </React.Fragment>
  );
}

export default SignUp;
