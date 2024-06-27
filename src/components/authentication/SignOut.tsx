import { signOut, getAuth } from "firebase/auth";

const SignOut = () => {
  // Instantiate the auth service SDK
  const auth = getAuth();

  return (
    <section className="home">
      <div className="home__container">
        <button
          onClick={() => signOut(auth)}
          className="txt-s4 "
          style={{ backgroundColor: "inherit", color: "white" }}
        >
          Cerrar Sesión
        </button>
      </div>
    </section>
  );
};

export default SignOut;
