import React, { useState, useEffect, useContext, createContext } from "react";
import axiosBase from "../utils/axiosBase";
import useSWR from "swr";
import { useRouter } from "next/router";

const CategoriesContext = createContext({
  categories: {},
  isLoading: true,
  setCategories: () => {}
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryHover, setCategoryHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();
  const { data } = useSWR("/category/all");

  useEffect(() => {
    if (data) {
      setCategories(data.data);
      setIsLoading(false);
    }
  }, [Router, data]);

  useEffect(() => {
    const category = categories.find((cat) => cat.id == Router.query.cid);
    setCategorySelected(category);
  });

  const handleClickCategory = (cid) => {
    const category = categories.find((cat) => cat.id == cid);
    setCategorySelected(category);
  };

  const handleHoverCategory = (cid) => {
    const category = categories.find((cat) => cat.id == cid);
    setCategoryHover(category);
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        handleClickCategory,
        handleHoverCategory,
        categorySelected,
        categoryHover,
        isLoading
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

//hook
export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within an AuthProvider");
  }
  return context;
}
