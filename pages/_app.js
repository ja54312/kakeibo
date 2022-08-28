import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user }}>
      {!user ? <Login /> : <Component {...pageProps} />}
    </UserContext.Provider>
  );
}

export default MyApp;
