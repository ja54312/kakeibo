import { useState } from "react";
import ControlledInput from "./ControlledInput";

export default function Ingresos() {
  const [showInput, setShowInput] = useState(false);
  const [nombre,SetNombre] = useState('')
  const [valor, SetValorIngreso] = useState(0)
  const [wipe,SetWipe] = useState(false)

  const handleShowNuevoIngreso = (e) => {
    e.preventDefault();
    setShowInput(!showInput);
    SetWipe(showInput)
  };

  const ChangeIngreso = (e) =>{
    SetNombre(e.value)
  }

  const ChangeValorIngreso = (e) =>{
    SetValorIngreso(e.value)
  }

  const sendNuevoIngreso = (e) => {
    e.preventDefault()
    console.log({nombre,valor})
    //enviar a firebase
    setShowInput(true)
    SetWipe(true)
  };

  return (
    <div className="ingresos">
      <h2>Ingresos</h2>
      <p onClick={handleShowNuevoIngreso}>
        {!showInput ? "+ Nuevo ingreso " : "Cancelar nuevo ingreso"}
      </p>
      <div className="ingreso_input" hidden={!showInput}>
        <form onSubmit={sendNuevoIngreso}>
          <label>
            Nombre:
            <ControlledInput type={"text"} maxLength={30} changeAction={ChangeIngreso} wipe={wipe}/>

          </label>

          <label>
            Cantidad
            <ControlledInput type={'number'} step={0.01} changeAction={ChangeValorIngreso} wipe={wipe}/>
          </label>
          <button>Enviar</button>
        </form>
      </div>

      <ul>
        <li>Nomina: </li>
        <li>Total Ingresos</li>
      </ul>
    </div>
  );
}
