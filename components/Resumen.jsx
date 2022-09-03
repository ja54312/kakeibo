import { UserContext } from "../lib/context";
import { useContext, useState } from "react";

export default function Resumen() {
  const {totalGastos,totalIngresos, totalGastosFijos} = useContext(UserContext);
  const[objetivo, setObjetivo] = useState(0)

  const objetivoAhorro = 536.74;

  const Presupuesto = (totalIngresos, objetivoAhorro, gastosFijos) =>
    totalIngresos - objetivoAhorro - gastosFijos;
  const Balance = (presupuesto, totalGastos) => presupuesto - totalGastos;

  const handleClick = (e) =>{
    e.preventDefault()

  }
  return (
    <>
      <div className="resumen">
        <ul>
          <li>Total Ingresos: {totalIngresos}</li>
          <li>Objetivo de Ahorro: {objetivoAhorro}</li>
          <li>Total Gastos Fijos: {totalGastosFijos}</li>
          <li>Total Gastos: {totalGastos}</li>
          <li>
            Presupuesto: {Presupuesto(totalIngresos, objetivoAhorro, totalGastosFijos).toFixed(2)}
          </li>
          <li>
            Balance:{" "}
            {Balance(Presupuesto(totalIngresos, objetivoAhorro, totalGastosFijos), totalGastos).toFixed(2)}
          </li>
        </ul>
      </div>
    </>
  );
}
