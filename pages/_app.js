import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, snapshot, CreateInitialData, userSnapshot } from "../lib/firebase";
import { useEffect, useState } from "react";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [userData,setUserData] = useState({})

  async function getUserData(uid) {
    await CreateInitialData(uid);
  }

  useEffect(() => {
    if (user) {
      const { uid } = user;
      getUserData(uid);
      userSnapshot(uid,(doc)=>{
        setUserData(doc.data())
      })
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user,userData }}>
      {!user ? <Login /> : <Component {...pageProps} />}
    </UserContext.Provider>
  );
}

export default MyApp;
