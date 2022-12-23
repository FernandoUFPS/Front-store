import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { ListGroup } from "reactstrap";
import CartContext from "../../../context/Cart/CartContext";
import ShoppingContext from "../../../context/shopping/ShoppingContext";
import CartOffCanvas from "./CartOffCanvas";
import logo from "/src/logo.png";
const Header = () => {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsLength, setProductsLength] = useState(0);

  /* Traemos del context los productos del carrito */
  const { cartItems, AddItemToCart, DeleteItemToCart } =
    useContext(CartContext);
  const { postDataCart } = useContext(ShoppingContext);

  /* Cada vez que se modifica el carrito, actualizamos la cantidad de productos */
  useEffect(() => {
    setProductsLength(
      cartItems.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  /* Obtenemos el precio total */
  const total = cartItems.reduce(
    (previous, current) => previous + current.amount * current.price,
    0
  );

  const toggle = () => setOpen(!open);
  
  const onBuyCart = async () => {
    if (cartItems.length < 1) {
      toast.error("Oops! Ha ocurrido un error. Intentalo mas tarde");
      return;
    }
    const productsCart = cartItems.map((el) => {
      return {
        product_id: el.id,
        amount: el.amount,
      };
    });
    const data = { products: productsCart };
    await postDataCart(data);
  };

  return (
    <header>
      <Toaster />
      <CartOffCanvas
        open={open}
        toggle={toggle}
        cartItems={cartItems}
        total={total}
        add={AddItemToCart}
        remove={DeleteItemToCart}
        buy={onBuyCart}
      />
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/home"}>
            <img src={logo} width={50} height={40} />
          </Link>
          <div className="d-flex">
            <button
              className={`navbar-toggler ${menu ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setMenu(!menu)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="cart-md-toggler">
              <button
                type="button"
                className="btn pe-0"
                onClick={() => toggle()}
              >
                <i className="bi bi-cart fs-5"></i>
              </button>
              {!open && <div className="products-number">{productsLength}</div>}
            </div>
          </div>

          <div
            className={`collapse navbar-collapse ${menu ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/home"}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/sales"}
                  end
                >
                  Compras
                </NavLink>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="cart-toggler">
            <button type="button" className="btn pe-0" onClick={() => toggle()}>
              <i className="bi bi-cart fs-5"></i>
            </button>
            {!open && <div className="products-number">{productsLength}</div>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
