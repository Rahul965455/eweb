import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const HomeProd = () => {
  const [data, SetData] = useState([]);

  const [filter, Setfilter] = useState(data);

  const getdata = async () => {
    const get = await fetch("https://fakestoreapi.com/products");
    const res = await get.clone().json();
    const again = await get.json();
    SetData(res);
    Setfilter(again);
  };

  useEffect(() => {
    getdata();
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    Setfilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => Setfilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Cloths
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Cloths
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </button>
        </div>

        {filter.map((product) => {
          return (
        
              <div className="col-md-3 mb-4" key={product.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">$ {product.price}</p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
          
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <ShowProducts />
        </div>
      </div>
    </div>
  );
};

export default HomeProd;
