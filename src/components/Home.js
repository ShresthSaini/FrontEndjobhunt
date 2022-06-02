import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <div className="container">
        <Navbar />
        <div
          id="carouselExampleCaptions"
          className="carousel slide carousel-dark my-6"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators ">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/three.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="fw-bolder">Welcome to JOB HUNT</h5>
                <p>Your one stop destination for every job</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/6.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="fw-bolder">Welcome to JOB HUNT</h5>
                <p>
                  we work to bring humanity and opportunity to the job market
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/two.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="fw-bolder">Welcome to JOB HUNT</h5>
                <p>
                  We help employers find not only the best quality candidates
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="container-fluid ">
          <h2 className="companies my-3">
            <p className=" text-center fw-bolder ">
              Trusted by 200+ Leading Compaines
            </p>
          </h2>
          <div className="d-flex justify-content-evenly">
            <img src="IC/paytm.png" alt="IC3" />
            <img src="IC/indianCompany (18).png" alt="IC1" />
            <img src="IC/indianCompany (14).png" alt="IC2" />
            <img src="IC/indianCompany (9).png" alt="IC4" />
            <img src="IC/indianCompany (12).png" alt="IC5" />
            <img src="IC/indianCompany (16).png" alt="IC6" />
          </div>
        </div>
        <div className="container-fluid my-6 ">
          <h2 className="companies my-3">
            <p className=" text-success text-center fw-bolder ">
              Success Stories
            </p>
          </h2>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 my-6">
          <div className="col">
            <div className="card">
              <img src="x/one.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Mayank Sharma</h5>
                <p className="card-text">
                  Business Development Executive/ Manager at Hindustan Unilever
                  Limited
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="x/two.jpg"
                className="card-img-top"
                alt="xUser2"
                width="800"
              />
              <div className="card-body">
                <h5 className="card-title">Vikram Singh</h5>
                <p className="card-text">SDE-1 at Paytm</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img src="x/three.jpg" className="card-img-top" alt="xUser3" />
              <div className="card-body">
                <h5 className="card-title">Ajay Mittal</h5>
                <p className="card-text">Sales Manager - Bajaj</p>
              </div>
            </div>
          </div>
        </div>
         
      </div>
    </div>
  );
}
