import React from "react";
import "../../Styles/Turist.css";

import { TuristJson } from "./TuristJson";
import { useState, useEffect } from "react";
import TouristPlaces from "./TouristPlaces";
function Turist() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(TuristJson);
  }, []);
  return (
    <div>
      <div>
        <div>
          <div className="">
            <img
              className="first-im img-fluid"
              src={require("./../../images/turist attract1.png")}
              alt="Plane"
            />
          </div>
          <div className="contai">
            <div className="about-and-brand row justify-content-between px-5 container m-auto">
              <div className="col-md-5">
                <div className="">
                  <p className="welcome">
                    <b>WECOME</b>
                  </p>
                  <div className="caree-about-si">
                    <p className="abou">
                      <b>About</b>
                    </p>
                    <p className="careers">
                      <b>Careers</b>
                    </p>
                    <p className="careers">
                      <b>News</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="brand-eco">
                  <p>
                    <b>TRAVEL DESTINATION IN NIGERIA</b>
                  </p>
                  <p>
                    <b>We craft beautifully useful marketing </b>
                  </p>
                  <p>
                    <b>and digital products that grow</b>{" "}
                  </p>
                  <p>businesses.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <TouristPlaces/>
          </div>
        </div>

        {Array.isArray(data) &&
          data.map((item) => {
            return (
              <div className="mainn col-sm-12 col-md-6 col-lg-4 col-xlg-3 d-flex justify-content-center">
                <div className='main-ddd pt-3 px-5 pb-4 data-aos="fade-down-left"'>
                  <img
                    className="mages my-3 img-fluid"
                    src={item.image}
                    alt="imagess"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Turist;
