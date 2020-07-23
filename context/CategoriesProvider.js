import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CategoriesContext = createContext({
  categories: {},
  isLoading: true,
  setCategories: () => {}
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const [categorySelected, setCategorySelected] = useState(false);
  const [categoryHover, setCategoryHover] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    console.log(Router.query);
    const fetchData = async () => {
      await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`)
        .then((res) => {
          setCategories(res.data);
          const category = res.data.find((cat) => cat.id == Router.query.cid);
          setCategorySelected(category);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

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

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within an AuthProvider");
  }
  return context;
}
