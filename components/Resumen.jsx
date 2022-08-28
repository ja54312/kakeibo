export default function Resumen() {
  const nomina = 2230;
  const objetivoAhorro = 536.74;
  const gastosFijos = 1336.65;

  const Presupuesto = (totalIngresos, objetivoAhorro, gastosFijos) =>
    totalIngresos - objetivoAhorro - gastosFijos;
  const Balance = (presupuesto, totalGastos) => presupuesto - totalGastos;
  return (
    <>
      <div className="resumen">
        <ul>
          <li>Objetivo de Ahorro: {objetivoAhorro}</li>
          <li>
            Presupuesto: {Presupuesto(nomina, objetivoAhorro, gastosFijos)}
          </li>
          <li>Total Gastos: </li>
          <li>
            Balance:{" "}
            {Balance(Presupuesto(nomina, objetivoAhorro, gastosFijos), 0)}
          </li>
        </ul>
      </div>
    </>
  );
}
