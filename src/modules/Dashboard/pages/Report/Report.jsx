import React, { useContext, useEffect } from "react";
import ShoppingContext from "../../../../context/shopping/ShoppingContext";

const Report = () => {
  const { getIVA, report } = useContext(ShoppingContext);
  useEffect(() => {
    (async () => {
      await getIVA();
    })();
  }, []);
  return (
    <div className="card">
      <div className="table-responsive text-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>IVA</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {report && Object.entries(report).length > 0 ? (
              <>
                {report.sales.map((el, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{el.name}</strong>
                    </td>
                    <td>{el.amount}</td>
                    <td>{el.total}</td>
                    <td>{el.saleIVA}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={4}>No tienes compras</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            {report && Object.entries(report).length > 0 ? (
              <>
                <tr>
                  <td colSpan={2}>
                    <strong>Total</strong>
                  </td>
                  <td>{report.total}</td>
                  <td>{report.totalIVA}</td>
                </tr>
              </>
            ) : null}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Report;
