import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import Modal from "react-modal";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"
chartjs.register(ArcElement, Tooltip, Tooltip);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
  },
};



const HomeProd = () => {
  const [data, SetData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, Setfilter] = useState(data);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    width: 600,
    height: 400,
  };

  const datas = {
    labels: categories,
    datasets: [
      {
        data: categories.map(
          (category) =>
            data.filter((product) => product.category === category).length
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#C45850"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#C45850"],
      },
    ],
  };
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await res.json();
      setCategories(categories);
    };
    getCategories();
  }, []);

  const getdata = async () => {
    const get = await fetch("https://fakestoreapi.com/products");
    const res = await get.clone().json();
    const again = await get.json();
    console.log(again)
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
          {categories.map((category) => (
            <button
              className="btn btn-outline-dark me-2"
              key={category}
              onClick={() => filterProduct(category)}
            >
              {category}
            </button>
          ))}
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
                    {product.description.slice(0, 150)}...
                  </h5>
                  <NavLink
                    to={`/products/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Read More
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
      <div className="container my-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center"> Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <ShowProducts />
        </div>
      </div>

      <div className="fixed-bottom d-flex justify-content-end pr-5 pb-3">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Analyze
        </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          ariaHideApp={false}
        >
<div className="d-flex justify-content-center">
  {categories.map((category, index) => (
    <div className="category-label d-flex align-items-center m-2" key={index}>
      <div className="category-color mr-2" style={{backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#C45850'][index]}}></div>
      <span className="text-center">{category}</span>
    </div>
  ))}
</div>

          <button onClick={handleCloseModal}>X</button>
          <Pie data={datas} options={options} />
        </Modal>
      </div>
    </div>
  );
};

export default HomeProd;
