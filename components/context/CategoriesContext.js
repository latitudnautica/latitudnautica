import { useReducer, useContext, createContext, useState } from "react";

import fetcher from "../../lib/fetcher";
import useSWR from "swr";
import axios from "axios";

export const CategoriesContext = createContext();
export const CategoriesDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    case "INCREASE_BY":
      return state + action.payload;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const CategoriesProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, 10);

  return (
    <CategoriesDispatchContext.Provider value={dispatch}>
      <CategoriesContext.Provider value={{ state }}>
        {children}
      </CategoriesContext.Provider>
    </CategoriesDispatchContext.Provider>
  );
};

export const useCategory = () => useContext(CategoriesContext);
export const useDispatchCategory = () => useContext(CategoriesDispatchContext);
