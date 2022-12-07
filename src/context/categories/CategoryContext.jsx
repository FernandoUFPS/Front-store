import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { helpHttp } from "../../helpers/helpHttp";
import { REACT_APP_API_URL } from "../../utils/constants";

const CategoryContext = createContext();
const CategoryProvider = ({ children }) => {
  let api = helpHttp();
  let url = REACT_APP_API_URL + "categories";
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    setIsLoading(true);
    await api.get(url).then((res) => {
      setCategories(res);
      setIsLoading(false);
    });
  };

  const postData = async (data) => {
    setIsLoading(false);
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    await api.post(url, options).then((res) => {
      if (!res.err) {
        toast.success("Registrado");
        setIsLoading(false);
      } else {
        toast.error("Oops! Error inesperado");
        setIsLoading(false);
      }
    });
  };
  const putData = async (data) => {
    let newData = data;
    let options = {
      body: newData,
      headers: { "content-type": "application/json" },
    };
    await api.put(url + `/${newData.id}`, options).then((res) => {
      if (!res.err) {
        console.log("Actualizado");
      } else {
        console.log("No Actualizado");
      }
    });
  };
  const delData = async (product_id) => {
    let endpoint = url + product_id;
    let options = {
      body: "",
      headers: { "content-type": "application/json" },
    };
    await api.del(endpoint, options).then((res) => {
      if (!res.err) {
        console.log("Eliminado");
      }
    });
  };
  const data = {
    getCategories,
    postData,
    putData,
    delData,
    categories,
    setCategories,
    isLoading,
    setIsLoading,
  };
  return (
    <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
  );
};

export { CategoryProvider };
export default CategoryContext;
