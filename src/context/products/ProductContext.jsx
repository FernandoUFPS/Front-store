import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { helpHttp } from "../../helpers/helpHttp";
import { REACT_APP_API_URL } from "../../utils/constants";

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  let api = helpHttp();
  let url = REACT_APP_API_URL + "products";
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async (id) => {
    setIsLoading(true);
    await api.get(url + `/${id}`).then((res) => {
      setProduct(res);
      setIsLoading(false);
    });
  };
  const getProducts = async () => {
    setIsLoading(true);
    await api.get(url).then((res) => {
      // console.log(res);
      let arrProduct = [];
      arrProduct = res.filter( prod => prod.status === "CREATED" )
      // console.log(arrProduct);
      setProducts(arrProduct);
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
    let endpoint = url + `/${product_id}`;
    let options = {
      body: "",
      headers: { "content-type": "application/json" },
    };
    await api.del(endpoint, options).then((res) => {
      if (!res.err) {
        toast.success("Producto eliminado");
        // console.log("Eliminado");
        // console.log(res);
      }else{
        toast.error("uffs perro jijijiputa no se puede eliminar");
      }
    });
  };
  const data = {
    getProducts,
    postData,
    putData,
    delData,
    products,
    setProducts,
    getProduct,
    product,
    setProduct,
    isLoading,
    setIsLoading,
  };
  return (
    <ProductContext.Provider value={data}>{children}</ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;
