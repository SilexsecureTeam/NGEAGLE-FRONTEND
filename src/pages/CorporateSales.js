import React from "react";
// import mainImg from "../images/corporate-image.png";
import imgTwo from "../images/corporate2.png";
import { Link } from "react-router-dom";

const CorporateSales = () => {
  return (
    <div className="pb-">
      <div className="bg_cover">
        <div className="position-relative">
          <div className="corporate_bg">
          </div>
          <div className="w-100 position-absolute top-50">
            <div className="container w-100 bg-white">
              <div className="p-5">
                <div className="row">
                  <div className="col-md-8">
                    <div className="col-md-10 pt-3">
                      <h4 className="fw-bold"> Charter Services</h4>
                      <div>
                        <p className="fw-semibold">NETWORK - STATIONS & HUBS</p>
                        <p>
                          We offer Cargo Services through accredited Freight
                          Forwarders and from all the airports we operate with
                          Lagos and Abuja as our main hubs. Our services
                          currently cover nine stations including; Benin, Asaba,
                          Port Harcourt, Calabar, Kano, Bauchi, Yola, Sokoto and
                          Maiduguri. As our routes continue to evolve, you can
                          rest assured we will provide seamless service to get
                          your cargo to its destination.
                        </p>
                      </div>
                      <div>
                        <p className="fw-semibold">CARGO HANDLING PROCEDURES</p>
                        <p>
                          Please note, shipment dimensions might be streamlined
                          based on specific loading procedures.
                        </p>
                        <p>
                          We expect all packaged goods/units to conform with
                          prescribed dimensions and weights as per our aircraft
                          type;
                        </p>
                        <p>B737 = 30 inches by 44 inches @ 50kg per piece</p>
                        <p>Dash-8 = 45 inches by 55 inches @ 30kg per </p>
                        <p>
                          WHY CHOOSE AERO
                          CARGO Professionalism Reliability Care Affordability
                        </p>
                        <p>
                          To learn more about moving your cargo with us, please
                          contact any of our dedicated staff via the e-mail
                          address below to answer your questions about booking
                          your shipments, billing inquiries and more
                          <Link
                            to={"/aero.cargoservices@ACN.Aero"}
                            className=""
                          >
                            aero.cargoservices@ACN.Aero
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <img src={imgTwo} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navy_blue py-5">
        <div className="container my-5">
          <div className="d-flex justify-content-between green_bottom">
            <div className="text-white">
              <p className="fs-5">NG Eagle Cargo Sales</p>
              <p>
                Download a shareable and printable document containing general
                information about this subsidiary.
              </p>
            </div>
            <div>
              <button className="btn green_border green_text py-2">
                chartered@ngeagle.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateSales;
