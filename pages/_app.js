import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, userRef,userSnapshot } from "../lib/firebase";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      console.log(user.uid)
      const ref = userRef(user.uid);
      unsubscribe = userSnapshot(ref,(doc)=>{
        console.log(doc.data())
      })
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, username }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;