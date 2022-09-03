import { useAuthState } from "react-firebase-hooks/auth";
import Gastos from "../components/Gastos";
import Logout from '../components/Logout'
import GastosFijos from "../components/GastosFijos";
import Ingresos from "../components/Ingresos";
import Resumen from "../components/Resumen";
import { auth } from "../lib/firebase";
import { Date } from "../components/Date";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <Logout/>
      <div>
        {/* <h1>{new Date().toLocaleDateString("es-ES", { month: "long" })}</h1> */}
        <Date/>
        <Resumen />
        <Ingresos />
        <GastosFijos />
        <Gastos />
      </div>
    </div>
  );
}
