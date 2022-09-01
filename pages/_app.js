import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  snapshot,
  CreateInitialData,
  userSnapshot,
} from "../lib/firebase";
import { useEffect, useState } from "react";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalGastosFijos, setTotalGastosFijos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);

  async function getUserData(uid) {
    await CreateInitialData(uid);
  }

  useEffect(() => {
    if (user) {
      const { uid } = user;
      getUserData(uid);
      userSnapshot(uid, (doc) => {
        setUserData(doc.data());
      });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        totalGastos,
        setTotalGastos,
        totalGastosFijos,
        setTotalGastosFijos,
        totalIngresos,
        setTotalIngresos,
      }}
    >
      {!user ? <Login /> : <Component {...pageProps} />}
    </UserContext.Provider>
  );
}

export default MyApp;
