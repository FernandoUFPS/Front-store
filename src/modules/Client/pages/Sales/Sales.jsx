import React, { useContext, useEffect } from "react";
import ShoppingContext from "../../../../context/shopping/ShoppingContext";
import Header from "../../components/Header";

const Sales = () => {
  const { getSales, sales } = useContext(ShoppingContext);
  useEffect(() => {
    (async () => {
      await getSales();
    })();
  }, []);
  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="card">
          <div className="table-responsive text-nowrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Fecha de Compra</th>
                  <th>Producto</th>
                  <th>Unidades</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {sales && sales.length > 0
                  ? sales.map((item, index) => (
                      <tr key={index}>
                        <td>{new Date(item.create_at).toDateString()}</td>
                        <td>
                          <strong>{item?.product?.name}</strong>
                        </td>
                        <td>{item.amount}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
