import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  userData:null,
  totalGastos:0,
  setTotalGastos:(total)=>{},
  totalGastosFijos:0,
  setTotalGastosFijos:(total)=>{},
  totalIngresos:0,
  setTotalIngresos:(total)=>{},
  fecha:null,
  setFecha:(fecha) =>{}
});