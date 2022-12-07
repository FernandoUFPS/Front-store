import React from "react";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import ListCategories from "./components/ListCategories";
import SimpleSlider from "./components/SimpleSlider";

const Index = () => {
  return (
    <div>
      <Header />

      <div className="m-3">
        <Carousel />
      </div>
      <div className="m-3">
        <ListCategories />
      </div>
      <div className="m-3 text-center text-uppercase">
        <h2>Destacados</h2>
      </div>
      <div className="m-3">
        <SimpleSlider />
      </div>
    </div>
  );
};

export default Index;
