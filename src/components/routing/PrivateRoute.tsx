// PrivateRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in");
        setIsSignedIn(true);
      } else {
        console.log("No user is signed in.");
        setIsSignedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isSignedIn === null) {
    // You can replace this with a spinner or a loading component
    return <div>Loading...</div>;
  }

  return <>{isSignedIn ? <>{children}</> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
