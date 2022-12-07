import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../context/categories/CategoryContext";
import ProductContext from "../../context/products/ProductContext";
import ListTable from "./components/ListTable";
import ModalForm from "./components/ModalForm";

const Index = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [data, setData] = useState({
    name: "",
    description: "",
    stock: 10,
    price: 0,
    percent: 0,
    isOffSale: 0,
    category: {
      id: 1,
      name: "shoes",
    },
  });
  const { getProducts, products, postData, putData, isLoading } =
    useContext(ProductContext);
  const { getCategories, categories } = useContext(CategoryContext);
  useEffect(() => {
    (async () => {
      await getProducts();
      await getCategories();
    })();
  }, []);
  const addProduct = async () => {
    await postData(data);
    await getProducts();
    toggle();
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="fw-bold py-3 mb-4">
          <span className="text-muted fw-light">Admin/</span>Productos
        </h4>
        <ModalForm
          data={data}
          setData={setData}
          onSubmit={addProduct}
          toggle={toggle}
          open={open}
          categories={categories}
        />
      </div>

      <ListTable
        getProducts={getProducts}
        products={products}
        putData={putData}
        isLoading={isLoading}
        categories={categories}
      />
    </>
  );
};

export default Index;
