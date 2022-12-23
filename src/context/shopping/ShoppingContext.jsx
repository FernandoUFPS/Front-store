import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { helpHttp } from "../../helpers/helpHttp";
import {
  REACT_APP_API_URL,
  REACT_APP_API_URL_SALES,
} from "../../utils/constants";

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const api = helpHttp();
  const UID = "a78c1c6e-bd04-4b7a-bdc2-837bfadda84b";
  const url = REACT_APP_API_URL_SALES;
  const urlProduct = REACT_APP_API_URL;
  const [sales, setSales] = useState([]);
  const [report, setReport] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSales = async () => {
    setIsLoading(true);
    let result = [];
    await api.get(url + `sales/${UID}`).then((res) => {
      result = [...res.body];
    });
    await Promise.all(
      result.map(async (el, index) => {
        const product = await fetch(urlProduct + `products/${el.product_id}`);
        const resJson = await product.json();
        result[index] = { ...el, product: resJson };
      })
    );
    console.log(result);
    setSales(result);
    setIsLoading(false);
  };
  const getIVA = async () => {
    setIsLoading(true);
    await api.get(url + "report").then((res) => {
      setReport(res.body);
      setIsLoading(false);
    });
  };
  const postData = async (data) => {
    setIsLoading(true);
    const options = {
      body: { ...data, uid: UID },
      headers: { "content-type": "application/json" },
    };
    await api.post(url + "buy", options).then((res) => {
      if (!res.err) {
        toast.success("Compra Exitosa");
      } else {
        toast.error("Oops! Ha ocurrido un error. Intentalo mas tarde");
      }
      setIsLoading(false);
    });
  };
  const postDataCart = async (data) => {
    setIsLoading(true);
    const options = {
      body: { ...data, uid: UID },
      headers: { "content-type": "application/json" },
    };
    await api.post(url + "buy-cart", options).then((res) => {
      if (!res.err) {
        toast.success("Compra Exitosa");
      } else {
        toast.error("Oops! Ha ocurrido un error. Intentalo mas tarde");
      }
      setIsLoading(false);
    });
  };
  const patchData = async (data) => {
    setIsLoading(true);
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    await api.patch(url + "create-offer", options).then((res) => {
      if (!res.err) {
        toast.success("Cambio Aplicado");
      } else {
        toast.error("Oops! Ha ocurrido un error. Intentalo mas tarde");
      }
      setIsLoading(false);
    });
  };

  return (
    <ShoppingContext.Provider
      value={{
        getSales,
        sales,
        setSales,
        isLoading,
        setIsLoading,
        postData,
        patchData,
        postDataCart,
        getIVA,
        report,
        setReport,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
