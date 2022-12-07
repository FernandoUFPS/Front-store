import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Col, Input, Row, Spinner } from "reactstrap";
import CartContext from "../../../../context/Cart/CartContext";
import ProductContext from "../../../../context/products/ProductContext";
import ShoppingContext from "../../../../context/shopping/ShoppingContext";
import Header from "../../components/Header";
import SimpleSlider from "../../components/SimpleSlider";
const url = "https://source.unsplash.com/random/?";
const Detail = () => {
  const { id } = useParams();
  const { getProduct, product, isLoading } = useContext(ProductContext);
  const { postData } = useContext(ShoppingContext);
  const { AddItemToCart } = useContext(CartContext);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    (async () => {
      await getProduct(id);
    })();
  }, [id]);
  if (isLoading) {
    return <Spinner color="primary" />;
  }
  const handleAmount = (e) => setAmount(e);
  const onBuy = async (id) => {
    if (amount < 1) {
      toast.error("Por favor selecciona una cantidad");
      return;
    }
    const data = { productId: id, amount: amount };
    await postData(data);
    await getProduct(id);
  };
  return (
    <>
      <Header />
      <div className="container-lg">
        <Row className="p-2">
          <Col md={6}>
            <div className="border border-1">
              <img
                className="w-100 h-px-500"
                style={{ objectFit: "cover" }}
                src={url + product?.category?.name + "&" + product?.id}
                alt=""
              />
            </div>
          </Col>
          <Col md={6}>
            <h4 className="pt-2 p-md-0">{product?.name}</h4>
            <div className="d-flex text-warning mb-3">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star"></i>
            </div>
            {product.isOffSale ? (
              <div className="d-flex">
                <h6 className="fw-bold text-decoration-line-through me-2">
                  ${product?.price}
                </h6>
                <h5 className="fw-bold">
                  ${product.price * ((100 - product.percent) / 100)}
                </h5>
              </div>
            ) : (
              <h5 className="fw-bold">{product.price}</h5>
            )}
            <h6>
              <b>Stock disponible</b>{" "}
              <small>{product?.stock} disponible(s)</small>
            </h6>
            <div className="mb-3 w-px-250">
              <Input
                type="select"
                value={amount}
                onChange={(e) => handleAmount(e.target.value)}
              >
                <option value={0}>Selecciona una cantidad</option>
                {product?.stock > 0
                  ? [...new Array(product.stock)].map((el, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))
                  : null}
              </Input>
            </div>
            <Row>
              <Col md={6} className="mb-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => onBuy(product?.id)}
                >
                  <i className="bi bi-bag-check"></i> Comprar
                </button>
              </Col>
              <Col md={6} className="mb-3">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => AddItemToCart(product)}
                >
                  <i className="bi bi-cart"></i> Añadir al carrito
                </button>
              </Col>
            </Row>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
              dolores ut quisquam neque voluptates fuga ducimus facilis aperiam
              qui possimus autem officia quae nam, impedit eveniet, quam ex hic
              velit.
            </p>
          </Col>
        </Row>
        {/* lista de productos */}
        <div className="m-3 text-center text-uppercase">
          <h2>Destacados</h2>
        </div>
        <div className="m-3">
          <SimpleSlider />
        </div>
      </div>
    </>
  );
};

export default Detail;
