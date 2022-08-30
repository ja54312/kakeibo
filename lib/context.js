import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  userData:null,
  totalGastos:0,
  setTotalGastos:(total)=>{},
  totalIngresos:0,
  setTotalIngresos:(total)=>{}
});