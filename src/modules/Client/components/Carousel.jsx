import React, { useEffect, useState } from "react";
const urlImage = "https://source.unsplash.com/collection/";
const imgs = ["345710", "PUNtUM4C8Cg", "874140", "9504046"];
const Carousel = () => {
  useEffect(() => {
    const myCarouselElement = document.querySelector(
      "#carouselExampleControls"
    );
    const carousel = new bootstrap.Carousel(myCarouselElement, {
      interval: 4000,
    });
  }, []);
  return (
    <div
      id="carouselExampleControls"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {imgs.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={urlImage + item + "/800x600"}
              className="d-block w-75 h-px-600 m-auto"
              alt="..."
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
