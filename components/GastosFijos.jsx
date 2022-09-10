import { useState, useContext, useEffect } from "react";
import { BorrarGasto, GuardarGasto } from "../lib/firebase";
import ControlledInput from "./ControlledInput";
import { UserContext } from "../lib/context";
import dayjs from "dayjs";

export default function GastosFijos() {
  const [showInput, setShowInput] = useState(false);
  const [nombre, SetNombreGasto] = useState("");
  const [valor, SetValorGasto] = useState(0);
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

  const sendNuevoGasto = (e) => {
    e.preventDefault();
    GuardarGasto({ nombre, valor, categoria: "fijo" }, userContext.user.uid);
    setShowInput(false);
    SetWipe(true);
  };

  return (
    <div className="gastos">
      <h1>Gastos Fijos</h1>
      <p onClick={handleShowNuevoGasto}>
        {!showInput ? "+ Nuevo gasto fijo" : "Cancelar nuevo gasto fijo"}
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
  const { user, userData,fecha } = context;

  const handleDelete = (e, item) => {
    e.preventDefault();
    BorrarGasto(item, user.uid);
  };

  const getDate = (date) => new Date(date.date.seconds * 1000).toDateString();

  if (userData[type]) {
    const operaciones = userData[type].operaciones.filter(
      (item) =>
        item.categoria === "fijo" &&
        dayjs(item.date.seconds * 1000).month() === dayjs(fecha).month()
        && dayjs(item.date.seconds * 1000).year() === dayjs(fecha).year()
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

    return (
      <>
        <ul>{getListWithOperations(operaciones)}</ul>
      </>
    );
  }
  return null;
}

function Total(props) {
  const { context, type } = props;
  const { userData, setTotalGastosFijos, totalGastosFijos, fecha } = context;

  const PorFecha = (arr) =>
    arr.filter((item) => {
      return dayjs(item.date.seconds * 1000).month() === dayjs(fecha).month() && dayjs(item.date.seconds * 1000).year() === dayjs(fecha).year()
    });

  const SoloFijos = (arr) => arr.filter((item) => item.categoria === "fijo");

  useEffect(() => {
    if (userData[type]?.operaciones) {
      const gastosFijosDelMes = PorFecha(userData[type]?.operaciones);
      const soloGastosFijos = SoloFijos(gastosFijosDelMes);
      const suma = soloGastosFijos.reduce(
        (accum, item) => accum + parseFloat(item.valor),
        0
      );
      setTotalGastosFijos(suma.toFixed(2));
    }
  },[userData[type]?.operaciones]);

  return (
    <p>
      Total de {type}: {totalGastosFijos}
    </p>
  );
}
