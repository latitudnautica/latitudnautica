import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const CategoriesContext = createContext({
  categories: {},
  isLoading: true,
  setCategories: () => {}
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/category/all`)
        .then((res) => {
          setCategories(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const populateSubCategories = (cid) => {//needs category id selected
    const subCats = categories.find((cat) => cat.id == cid).SubCategories;
    setSubCategories(subCats);
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        populateSubCategories,
        subCategories,
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
