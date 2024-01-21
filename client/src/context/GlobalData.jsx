import { createContext, useEffect, useState } from "react";
import { API } from "../service/api";

export const DataContext = createContext(null);

const GlobalData = ({ children }) => {
  const [gdata, setGdata] = useState({
    fullname: "",
    email: "",
    adminID: "",
    categories: [],
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await API.getCategories();

      if (response.isSuccess) {
        setGdata({
          ...gdata,
          categories: response.data,
        });
      }
    } catch (error) {
      if (error.isError) {
        console.log(error.data);
      }
    }
  };

  return (
    <DataContext.Provider value={{ gdata, setGdata }}>
      {children}
    </DataContext.Provider>
  );
};

export default GlobalData;
