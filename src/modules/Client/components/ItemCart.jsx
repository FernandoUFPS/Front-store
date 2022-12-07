import React from "react";
const ItemCart = ({ item, add, remove }) => {
  const url = "https://source.unsplash.com/random/?";
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <img
          className="rounded-2"
          style={{ objectFit: "cover" }}
          src={url + item.category.name + "&" + item.id}
          alt=""
          width={80}
          height={80}
        />
        <div>
          <button
            className="btn btn-outline-danger me-2"
            onClick={() => remove(item.id)}
          >
            -
          </button>
          <button className="btn btn-outline-primary" onClick={() => add(item)}>
            +
          </button>
        </div>
        <div className="d-flex flex-column">
          <span>
            Cantidad:{" "}
            <small>
              <b>{item.amount}</b>
            </small>
          </span>
          <span>
            SubTotal:{" "}
            <small>
              <b>{item.amount * item.price}</b>
            </small>
          </span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ItemCart;
