import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import "../assets/slick.css";
import "../assets/slick-theme.css";
import CardProduct from "./CardProduct";
import ProductContext from "../../../context/products/ProductContext";

const SimpleSlider = () => {
  const { getProducts, products, isLoading } = useContext(ProductContext);

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products && products.length > 0
        ? products.map((product, index) => (
            <CardProduct key={index} product={product} />
          ))
        : null}
    </Slider>
  );
};

export default SimpleSlider;
