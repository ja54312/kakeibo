import { useState, useContext,useEffect } from "react";
import { BorrarIngreso, GuardarIngreso } from "../lib/firebase";
import ControlledInput from "./ControlledInput";
import { UserContext } from "../lib/context";

export default function Ingresos() {
  const [showInput, setShowInput] = useState(false);
  const [nombre, SetNombre] = useState("");
  const [valor, SetValorIngreso] = useState(0);
  const [wipe, SetWipe] = useState(false);
  const userContext = useContext(UserContext);

  const handleShowNuevoIngreso = (e) => {
    e.preventDefault();
    setShowInput(!showInput);
    SetWipe(showInput);
  };

  const ChangeIngreso = (e) => {
    SetNombre(e.value);
  };

  const ChangeValorIngreso = (e) => {
    SetValorIngreso(e.value);
  };

  const sendNuevoIngreso = (e) => {
    e.preventDefault();
    GuardarIngreso({ nombre, valor }, userContext.user.uid);
    setShowInput(false);
    SetWipe(true);
  };

  return (
    <div className="ingresos">
      <h1>Ingresos</h1>
      <p onClick={handleShowNuevoIngreso}>
        {!showInput ? "+ Nuevo ingreso " : "Cancelar nuevo ingreso"}
      </p>
      <div className="ingreso_input" hidden={!showInput}>
        <form onSubmit={sendNuevoIngreso}>
          <label>
            Nombre:
            <ControlledInput
              type={"text"}
              maxLength={30}
              changeAction={ChangeIngreso}
              wipe={wipe}
            />
          </label>

          <label>
            Cantidad
            <ControlledInput
              type={"number"}
              step={0.01}
              changeAction={ChangeValorIngreso}
              wipe={wipe}
            />
          </label>
          <button>Enviar</button>
        </form>
      </div>
      <OperationList context={userContext} type={"ingresos"} />
      <Total context={userContext} type={"ingresos"} />
    </div>
  );
}

function OperationList(props) {
  const { context, type } = props;
  const { user, userData } = context;

  const handleDelete = (e, item) => {
    e.preventDefault();
    BorrarIngreso(item, user.uid);
  };

  if (userData[type]) {
    const operaciones = userData[type].operaciones;

    const list = operaciones.map((item, index) => (
      <li key={index}>
        {item.nombre} - {item.valor} -{" "}
        {new Date(item.date.seconds * 1000).toDateString()}
        <button onClick={(e) => handleDelete(e, item)} id={index}>
          X
        </button>
      </li>
    ));
    return <ul>{list}</ul>;
  }
  return null;
}

function Total(props) {
  const { context, type } = props;
  const { userData, totalIngresos, setTotalIngresos } = context;
  const suma = userData[type]?.operaciones.reduce(
    (accum, item) => accum + parseInt(item.valor),
    0
  );
  useEffect(() => {
    setTotalIngresos(suma);
  });
  return (
    <p>
      Total de {type}: {suma}
    </p>
  );
}
