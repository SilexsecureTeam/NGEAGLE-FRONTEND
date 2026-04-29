import React from "react";
import mainImg from "../images/travel_img.png";
import imgTwo from "../images/travel2.png";
import { Link } from "react-router-dom";

const TravelAgentSales = () => {
  return (
    <div className="pb-">
      <div className="bg_cover">
      <div className="position-relative">
        <div className="travels_bg"></div>
        <div className="w-100 position-absolute top-50">
          <div className="container w-100 bg-white">
            <div className="p-5">
              <div className="row">
                <div className="col-md-4">
                  <div>
                    <img src={imgTwo} alt="" className="img-fluid" />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="col-md-11 ps-md-5">
                    <h4 className="fw-bolder mb-4">Group Boking</h4>
                    <div>
                      <p>
                        Since inception in 1959, Aero has been providing
                        reliable and convenient air transport services.
                      </p>
                      <p>
                        Aero’s personalised air services provide flight(s) at
                        your own schedule and comfort to any destination.
                      </p>
                      <p>
                        As the first domestic airline, we are fully ready to
                        help achieve your mission with our excellent customer
                        service from booking to boarding.
                      </p>
                      <p>
                        Experience convenience, comfort and a welcoming service
                        on our charter flights Fly on your own schedule and from
                        any terminal that accommodates your aircraft choice.
                      </p>
                      <p>
                        Tailor your itinerary by choosing the schedule, origin,
                        and destinations that suits your needs
                      </p>
                      <p>
                        Let your group have lighthearted pleasure in the air
                      </p>
                      <p>
                        Lock in an all-inclusive price based on itinerary, fuel,
                        and pre-chosen menus.
                      </p>
                      <p>
                        Have your taste buds experience culinary selections with
                        beverage choices and alcoholic beverages for an extra
                        cost.
                      </p>
                      <p>
                        Enjoy remote check-in, the availability of private TSA
                        screening (where available) and other simplified travel
                        options.
                      </p>
                      <p>
                        Customer service agents are assigned to charter flights
                        and to work on manifests.
                      </p>
                      <p>
                        To learn more about moving your cargo with us, please
                        contact any of our dedicated staff via the e-mail
                        address below to answer your questions about booking
                        your shipments, billing inquiries and more 
                        <Link to={"/aero.cargoservices@ACN.Aero"} className="">
                          aero.cargoservices@ACN.Aero
                        </Link>
                      </p>
                    </div>
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

export default TravelAgentSales;
