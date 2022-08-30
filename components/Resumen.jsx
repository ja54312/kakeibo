import { UserContext } from "../lib/context";
import { useContext } from "react";

export default function Resumen() {
  const {totalGastos,totalIngresos, totalGastosFijos} = useContext(UserContext);

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
            Presupuesto: {Presupuesto(totalIngresos, objetivoAhorro, (totalGastosFijos+totalGastos))}
          </li>
          <li>Total Gastos: {totalGastos}</li>
          <li>
            Balance:{" "}
            {Balance(Presupuesto(totalIngresos, objetivoAhorro, (totalGastosFijos+totalGastos)), 0)}
          </li>
        </ul>
      </div>
    </>
  );
}
