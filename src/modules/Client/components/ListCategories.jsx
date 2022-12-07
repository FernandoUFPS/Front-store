import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryContext from "../../../context/categories/CategoryContext";
const imgCategories = [
  "https://source.unsplash.com/random/?shoes",
  "https://source.unsplash.com/random/?books",
  "https://source.unsplash.com/random/?electronics",
];
const ListCategories = () => {
  const { getCategories, categories } = useContext(CategoryContext);
  useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);
  return (
    <div className="list-products">
      {categories && categories.length > 0
        ? categories.map((category, index) => (
            <div className="item" key={index}>
              <div className="content-box">
                <div className="image-product">
                  <Link to={"/"}>
                    <img src={imgCategories[index]} />
                  </Link>
                </div>
                <div className="product-info">
                  <h2 className="product-title">
                    <Link to={"/"}>{category.name}</Link>
                  </h2>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ListCategories;
