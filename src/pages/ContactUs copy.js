import React, { useEffect } from "react";
import bottomrec from "../images/bottomrec.png";
import grouping from "../images/grouping.png";
import infant from "../images/infant-img.png";
import travelFAQ from "../images/travel-fAQ.png";
import { Link } from "react-router-dom";
import ContactCard from "../component/ContactCard";
import { BsChevronDown } from "react-icons/bs";
import useRequest from "../hooks/useRequest";
import fetchImages from "../hooks/useFetchImages";

const ContactUs = () => {
  const { data, error, fetchData, loading } = useRequest("contact", "POST");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const services = [
    { id: 1, img: grouping, header: "Group Booking" },
    { id: 2, img: infant, header: "Travel with Infant" },
    { id: 3, img: travelFAQ, header: "Travel Planning FAQs" },
  ];

  const contactCard = services.map((service) => (
    <ContactCard key={service.id} service={service} />
  ));

  return (
    <>
      <div>
        {!loading && !error ? (
          <div className="mb-5">
            <div className="">
              <img
                src={fetchImages(data[0]?.image)}
                alt=""
                style={{ height: "500px", width: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="">
              <img
                src={bottomrec}
                alt=""
                className="img-fluid"
                style={{ width: "100%", height: "80px", objectFit: "cover" }}
              />
            </div>
          </div>
        ) : null}
        <div className="my-5">
          <div className="container">
            {/* <div className="row g-0">{contactCard}</div> */}
            <div className="col-md-11 my-5">
              <div>
                <h3 className="text-secondary my-3 fw-bolder">
                  Still Need to Contact Us?
                </h3>
                <div className="col-2 prime_border my-3"></div>
                <p>
                  If you purchased a ticket from a third-party travel site or
                  agency and need to make a change or cancellation, refer
                  directly to your third-party travel site or travel agent for
                  servicing/assistance needs.
                </p>
                <p>
                  If you purchased a NGEAGLE Vacations package, please visit
                  ngeagle.com/vacations.
                </p>
              </div>
              <div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex">
                    <Link
                      to={""}
                      className="nav-link prime_text1 fw-semibold mx-1"
                    >
                      <span>Expand All</span>
                    </Link>
                    <b>|</b>
                    <Link to={""} className="nav-link fw-semibold mx-1">
                      <span>Collapse All</span>
                    </Link>
                  </div>
                </div>
                <div className="prime_border"></div>
                <div>
                  <div className="d-flex my-2 justify-content-between">
                    <span>Additional Assistance</span>
                    <span>
                      <BsChevronDown />
                    </span>
                  </div>
                  <div>
                    <p>
                      To speak with a representative about a new or existing
                      reservation, call 800-221-1212. If you are a Medallion®
                      Member, check the Contact Us section in the Fly Delta
                      mobile app for your dedicated phone line. If you are a
                      SkyMiles member, have your SkyMiles account number
                      available to expedite your call.
                    </p>

                    <p>
                      You may contact Reservation Sales 24 hours/day, 7
                      days/week.
                    </p>
                    <p>
                      If you purchased a ticket from a third-party travel agency
                      and you end up needing to make a change or cancellation,
                      please refer directly to your travel agent for
                      servicing/assistance.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="prime_bg2 py-3 text-white fw-semibold row">
                    <div className="col-3">
                      <span>LOCATION</span>
                    </div>
                    <div className="col-5">
                      <span>INFORMATION</span>
                    </div>
                    <div className="col-5 col-md-4">
                      <span>CONTACT</span>
                    </div>
                  </div>
                  <div className="py-3">
                    <div className="row my-3 pb-3">
                      <div className="col-2 col-md-3 fw-bold">
                        <p>Lagos</p>
                      </div>
                      <div className="col-5 ">
                        <ul>
                          <li> Port Harcourt International Airport, Omagwa.</li>
                          <li>
                            Eastern Garden Office, 47, Aba Road, Port Harcourt.
                          </li>
                          <li>
                            Nigerian Air Force (NAF) Base, off Eliouzu Road,
                            Port Harcourt.
                          </li>
                        </ul>
                      </div>
                      <div className="col-5 col-md-4 ">
                        <p className="fw-bold">CUSTOMER RELATIONS</p>
                        <p>
                          To provide Feedback on your travel experience with us:
                        </p>
                        <Link to={""} className="nav-link fw-bold">
                          +234 (0) 8077791683
                        </Link>
                        <Link to={""} className="nav-link fw-bold">
                          +234 1 2799999
                        </Link>
                        <Link to={""} className="nav-link text-break fw-bold">
                          Email: talktous@arikair.com{" "}
                        </Link>
                      </div>
                    </div>
                    <div className="row my-3 pb-3">
                      <div className="col-2 col-md-3 fw-bold">
                        <p>Abuja</p>
                      </div>
                      <div className="col-5 ">
                        <ul>
                          <li>
                            Terminal B, Nnamdi Azikiwe International Airport.
                          </li>
                          <li>
                            Transcorp Hilton Hotel, 1, Aguiyi Ironsi Street,
                            Maitama FCT.
                          </li>
                          <li>
                            Silverbird Entertainment Centre, Central Business
                            District, FCT.
                          </li>
                        </ul>
                      </div>
                      <div className="col-5 col-md-4 ">
                        <p className="fw-bold">TRAVEL TRADE SALES</p>
                        <p>If you are Travel Agent and you have an enquiry :</p>
                        <Link to={""} className="nav-link fw-bold">
                          +234 (0) 8077791664
                        </Link>
                        <Link to={""} className="nav-link text-break fw-bold">
                          Email: travelagencydesk@arikair.com
                        </Link>
                      </div>
                    </div>
                    <div className="row my-3 pb-3">
                      <div className="col-2 col-md-3 fw-bold">
                        <p>River State</p>
                      </div>
                      <div className="col-5 ">
                        <ul>
                          <li>
                            {" "}
                            Terminal B, Nnamdi Azikiwe International Airport.
                          </li>
                          <li>
                            Eastern Garden Office, 47, Aba Road, Port Harcourt.
                          </li>
                        </ul>
                      </div>
                      <div className="col-5 col-md-4 ">
                        <p className="fw-bold">CHARTER SALES</p>
                        <p>For charter requests email: </p>
                        <Link to={""} className="nav-link text-break fw-bold">
                          chartersalesteam@arikair.com
                        </Link>
                      </div>
                    </div>
                    <div className="row my-3 pb-3">
                      <div className="col-2 col-md-3 fw-bold">
                        <p>Kano State</p>
                      </div>
                      <div className="col-5 ">
                        <ul>
                          <li>
                            {" "}
                            Terminal B, Nnamdi Azikiwe International Airport.
                          </li>
                        </ul>
                      </div>
                      <div className="col-5 col-md-4 ">
                        <p className="fw-bold">REFUNDS</p>
                        <p>
                          Is your flight cancelled and you seek a refund of your
                          air fare, send an email to;
                        </p>
                        <Link to={""} className="nav-link fw-bold">
                          +234 (0) 8077791683
                        </Link>
                        <Link to={""} className="nav-link fw-bold">
                          +234 1 2799999
                        </Link>
                        <Link to={""} className="nav-link text-break fw-bold">
                          Email: talktous@arikair.com{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
