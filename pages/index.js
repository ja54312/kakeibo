import { useAuthState } from "react-firebase-hooks/auth";
import Resumen from "../components/Resumen";
import { auth } from "../lib/firebase";

export default function Home() {
  const [user] = useAuthState(auth);

  const nomina = 2230
  const objetivoAhorro = 536.74
  const gastosFijos = 1336.65

  const Presupuesto = (totalIngresos, objetivoAhorro, gastosFijos) => totalIngresos - objetivoAhorro - gastosFijos
  const Balance = (presupuesto, totalGastos) => presupuesto - totalGastos

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <div>
        <h1>Agosto</h1>
        <Resumen/>
        
       
        
      </div>
    </div>
  );
}
