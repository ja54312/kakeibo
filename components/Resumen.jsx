import { UserContext } from "../lib/context";
import { useContext } from "react";

export default function Resumen() {
  const {totalGastos,totalIngresos} = useContext(UserContext);

  const objetivoAhorro = 536.74;
  const gastosFijos = 0;

  const Presupuesto = (totalIngresos, objetivoAhorro, gastosFijos) =>
    totalIngresos - objetivoAhorro - gastosFijos;
  const Balance = (presupuesto, totalGastos) => presupuesto - totalGastos;
  return (
    <>
      <div className="resumen">
        <ul>
          <li>Objetivo de Ahorro: {objetivoAhorro}</li>
          <li>
            Presupuesto: {Presupuesto(totalIngresos, objetivoAhorro, (gastosFijos+totalGastos))}
          </li>
          <li>Total Gastos: {totalGastos}</li>
          <li>
            Balance:{" "}
            {Balance(Presupuesto(totalIngresos, objetivoAhorro, (gastosFijos+totalGastos)), 0)}
          </li>
        </ul>
      </div>
    </>
  );
}
