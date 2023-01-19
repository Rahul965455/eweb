import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Product() {
  const { id } = useParams();
  const [data, SetData] = useState([]);

  const [filter, Setfilter] = useState(data);

  const getdata = async () => {
    const get = await fetch(`https://fakestoreapi.com/products/${id}`);
    const res = await get.clone().json();
    const again = await get.json();
    console.log(again)
    SetData(res);
    Setfilter(again);
  };

  useEffect(() => {
    getdata();
  }, []);

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={filter.image}
            alt={filter.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{filter.category}</h4>
          <h1 className="display-5">{filter.title}</h1>
          <p className="lead fw-bolder">
            Rating {filter.rating && filter.rating.rate}
            <i className="fa fa-star"></i>
            <h3 className="display-6 fw-bold my-4">${filter.price}</h3>
            <p className="lead">{filter.description}</p>
          </p>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          <ShowProduct />
        </div>
      </div>
    </div>
  );
}

export default Product;
