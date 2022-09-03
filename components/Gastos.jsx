import { useState, useContext, useEffect } from "react";
import { BorrarGasto, GuardarGasto } from "../lib/firebase";
import ControlledInput from "./ControlledInput";
import { UserContext } from "../lib/context";
import dayjs from "dayjs";

export default function Gastos() {
  const [showInput, setShowInput] = useState(false);
  const [nombre, SetNombreGasto] = useState("");
  const [valor, SetValorGasto] = useState(0);
  const [categoria, SetCategoriaGasto] = useState("necesario");
  const [wipe, SetWipe] = useState(false);
  const userContext = useContext(UserContext);

  const handleShowNuevoGasto = (e) => {
    e.preventDefault();
    setShowInput(!showInput);
    SetWipe(showInput);
  };

  const ChangeGasto = (e) => {
    SetNombreGasto(e.value);
  };

  const ChangeValorGasto = (e) => {
    SetValorGasto(e.value);
  };

  const ChangeCategoriaGasto = (e) => {
    SetCategoriaGasto(e.target.value);
  };

  const sendNuevoGasto = (e) => {
    e.preventDefault();
    GuardarGasto({ nombre, valor, categoria }, userContext.user.uid);
    setShowInput(false);
    SetWipe(true);
  };

  return (
    <div className="gastos">
      <h1>Gastos</h1>
      <p onClick={handleShowNuevoGasto}>
        {!showInput ? "+ Nuevo gasto " : "Cancelar nuevo gasto"}
      </p>
      <div className="ingreso_input" hidden={!showInput}>
        <form onSubmit={sendNuevoGasto}>
          <label>
            Nombre:
            <ControlledInput
              type={"text"}
              maxLength={30}
              changeAction={ChangeGasto}
              wipe={wipe}
            />
          </label>

          <label>
            Cantidad
            <ControlledInput
              type={"number"}
              step={0.01}
              changeAction={ChangeValorGasto}
              wipe={wipe}
            />
          </label>
          <label>
            Categoria:
            <select
              name="categoria"
              onChange={ChangeCategoriaGasto}
              value={categoria}
            >
              <option value="necesario">Necesario</option>
              <option value="lujo">Lujo</option>
              <option value="cultura">Cultura</option>
              <option value="imprevisto">Imprevisto</option>
            </select>
          </label>
          <button>Enviar</button>
        </form>
      </div>
      <OperationList context={userContext} type={"gastos"} />
      <Total context={userContext} type={"gastos"} />
    </div>
  );
}

function OperationList(props) {
  const { context, type } = props;
  const { user, userData, fecha } = context;

  const handleDelete = (e, item) => {
    e.preventDefault();
    BorrarGasto(item, user.uid);
  };

  const getDate = (date) => new Date(date.date.seconds * 1000).toDateString();

  if (userData[type]) {
    const operaciones = userData[type].operaciones.filter(
      (item) =>
        dayjs(item.date.seconds * 1000).month() === dayjs(fecha).month() &&
        dayjs(item.date.seconds * 1000).year() === dayjs(fecha).year()
    );

    const getListWithOperations = (operaciones) =>
      operaciones.map((item, index) => (
        <li key={index}>
          {item.nombre} - {item.valor} - {getDate(item)} - {item.categoria} -{" "}
          <button onClick={(e) => handleDelete(e, item)} id={index}>
            X
          </button>
        </li>
      ));

    const getOperationsByType = (type, array) =>
      array.filter(
        (item) =>
          item.categoria === type &&
          dayjs(item.date.seconds * 1000).month() === dayjs(fecha).month() &&
          dayjs(item.date.seconds * 1000).year() === dayjs(fecha).year()
      );

    const listaNecesarios = getListWithOperations(
      getOperationsByType("necesario", operaciones)
    );
    const listaLujo = getListWithOperations(
      getOperationsByType("lujo", operaciones)
    );
    const listaCultura = getListWithOperations(
      getOperationsByType("cultura", operaciones)
    );
    const listaImprevistos = getListWithOperations(
      getOperationsByType("imprevisto", operaciones)
    );

    return (
      <>
        <h2>Necesarios</h2>
        <ul>{listaNecesarios}</ul>
        <h2>Lujo</h2>
        <ul>{listaLujo}</ul>
        <h2>Cultura</h2>
        <ul>{listaCultura}</ul>
        <h2>Imprevistos</h2>
        <ul>{listaImprevistos}</ul>
      </>
    );
  }
  return null;
}

function Total(props) {
  const { context, type } = props;
  const { userData, setTotalGastos, totalGastos, fecha } = context;

  const PorFecha = (arr) =>
    arr.filter((item) => {
      return (
        dayjs(item.date.seconds * 1000).month() === dayjs(fecha).month() &&
        dayjs(item.date.seconds * 1000).year() === dayjs(fecha).year()
      );
    });

  const NoFijos = (arr) => arr.filter((item) => item.categoria !== "fijo");

  useEffect(() => {
    if (userData[type]?.operaciones) {
      const gastosDelMes = PorFecha(userData[type]?.operaciones);
      const soloGastos = NoFijos(gastosDelMes);
      const suma = soloGastos.reduce(
        (accum, item) => accum + parseFloat(item.valor),
        0
      );
      setTotalGastos(suma.toFixed(2));
    }
  });

  return (
    <p>
      Total de {type}: {totalGastos}
    </p>
  );
}
