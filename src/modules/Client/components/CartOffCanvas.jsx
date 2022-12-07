import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import ItemCart from "./ItemCart";

const CartOffCanvas = ({
  open,
  toggle,
  cartItems,
  total,
  add,
  remove,
  buy,
}) => {
  return (
    <div>
      <Offcanvas direction="end" isOpen={open} toggle={toggle}>
        <OffcanvasHeader toggle={toggle}>Carrito</OffcanvasHeader>
        <OffcanvasBody>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ItemCart key={index} item={item} add={add} remove={remove} />
            ))
          ) : (
            <p>No tienes productos en el carrito</p>
          )}
          <div className="d-flex justify-content-between">
            <h4>
              <b>Total</b>
            </h4>
            <span>{total}</span>
          </div>
          <button className="btn btn-primary w-100" onClick={() => buy()}>
            Comprar
          </button>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default CartOffCanvas;
