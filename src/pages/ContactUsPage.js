import React, { useEffect } from "react";
// import contactImg from "../images/new-contact-img.jpg";
// import { Link } from "react-router-dom";
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'
import { Parser } from "html-to-react";

const ContactUsPage = () => {
  const { data, fetchData } = useRequest('contact', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-5">
        <img src={fetchImages(data[0]?.image)} alt="" className="img-fluid" />
      </div>
      <div className="container">
        <div className="px-3">
          <div className="my-5">
            <h2>{data[0]?.slide_title}</h2>
            <p>{Parser().parse(data[0]?.slide_description)}</p>
          </div>

          <div>
            <div className="green_bg py-3 text-white fw-semibold row">
              <div className="col-3">
                <span>phone</span>
              </div>
            </div>
            <p>{Parser().parse(data[0]?.phone_number)}</p>
          </div>

          <div>
            <div className="green_bg py-3 text-white fw-semibold row">
              <div className="col-3">
                <span>Whatsapp</span>
              </div>
            </div>
            <p>{Parser().parse(data[0]?.whatsapp)}</p>
          </div>

          <div>
            <div className="green_bg py-3 text-white fw-semibold row">
              <div className="col-3">
                <span>Emails</span>
              </div>
            </div>
            <p>{Parser().parse(data[0]?.emails)}</p>
          </div>

          <div className="px-3">
            <div className="my-5">
              <h2>{data[0]?.title}</h2>
              <p>{Parser().parse(data[0]?.description)}</p>
            </div>
          </div>

          {/* <div>
            <div className="green_bg py-3 text-white fw-semibold row">
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
                  <p>Abuja</p>
                </div>
                <div className="col-5 ">
                 <p><b>Address:</b> 1 Nwaora Close, Off Gana Street, Maitama. Abuja, Nigeria.</p>
                </div>
                <div className="col-5 col-md-4 ">
                  <p className="fw-bold">CUSTOMER RELATIONS</p>
                  <p>To provide Feedback on your travel experience with us:</p>
                  <span className="bg-warning px-3 py-1 rounded-pill"><b>NGWECARE</b></span>
                  <Link to={""} className="nav-link mt-3 fw-bold">
                   <b>E-mail</b> contactcentre@ngeagle.com 
                  </Link>
                  <Link to={""} className="nav-link text-break fw-bold">
                    <b>Email:</b> 07000064932273, 0906000079
                  </Link>
                </div>
              </div>
              <div className="row my-3 pb-3">
                <div className="col-2 col-md-3 fw-bold">
                  <p>Lagos</p>
                </div>
                <div className="col-5 ">
                  <ul>
                    <li>Terminal B, Nnamdi Azikiwe International Airport.</li>
                    <li>
                      Transcorp Hilton Hotel, 1, Aguiyi Ironsi Street, Maitama
                      FCT.
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
                    <li> Terminal B, Nnamdi Azikiwe International Airport.</li>
                    <li>Eastern Garden Office, 47, Aba Road, Port Harcourt.</li>
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
                    <li> Terminal B, Nnamdi Azikiwe International Airport.</li>
                  </ul>
                </div>
                <div className="col-5 col-md-4 ">
                  <p className="fw-bold">REFUNDS</p>
                  <p>
                    Is your flight cancelled and you seek a refund of your air
                    fare, send an email to;
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
