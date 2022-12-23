import React, { useContext, useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import ProductContext from "../../../context/products/ProductContext";
import ShoppingContext from "../../../context/shopping/ShoppingContext";
import EditModalForm from "./EditModalForm";

const ListTable = ({
  getProducts,
  products,
  putData,
  isLoading,
  categories,
  delData
}) => {
  const { patchData } = useContext(ShoppingContext);
  const [modal, setmodal] = useState(false);
  const [data, setData] = useState({
    category: {
      id: 0,
      name: "",
    },
  });
  const [discount, setDiscount] = useState({
    product_id: "",
    percent: 0,
    isOffSale: true,
  });
  const toggle = () => setmodal(!modal);
  const editToggle = (item) => {
    setData(item);
    setDiscount({
      product_id: item.id,
      percent: item.percent,
      isOffSale: item.isOffSale,
    });
    toggle();
  };

  const deleteProduct = async (prod_id) => {
    if (prod_id) {
      await delData(prod_id);
      await getProducts();
      // toggle();
    }
  };

  const editProduct = async () => {
    if (discount.isOffSale) {
      await patchData(discount);
    }
    await putData(data);
    await getProducts();
    toggle();
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="card">
        <EditModalForm
          modal={modal}
          toggle={toggle}
          data={data}
          setData={setData}
          onSubmit={editProduct}
          categories={categories}
          discount={discount}
          setDiscount={setDiscount}
        />
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {products && products.length > 0
                ? products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>
                        <span className="badge bg-label-primary me-1">
                          {product.category.name}
                        </span>
                      </td>
                      <td>
                        <i
                          role={"button"}
                          className="bx bx-edit-alt me-3"
                          onClick={() => editToggle(product)}
                        ></i>

                        <i
                          role={"button"}
                          className="bx bx-trash me-1"
                          onClick={() => deleteProduct(product.id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListTable;
