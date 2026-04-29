import React, { useEffect } from "react";
// import image from "../images/luggageImg.png";
import "../style/middle.css";
import QuestionsAccordion from "../component/QuestionsAccordion";
// import Baggage from "../component/Luggage/Baggage";
// import Cabin from "../component/Luggage/Cabin";
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'
import { Parser } from "html-to-react";

const LuggagePolicy = () => {
  const { data, fetchData } = useRequest('baggagePolicy', 'GET')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <div className="her">
          <img alt="" className="img-fluid hero_img" src={fetchImages(data[0]?.image)} />
        </div>
        <div className="prime_bg1 py-5">
          <div className="container">
            <div className="row my-5">
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="mb-4" style={{ maxWidth: '150px', maxHeight: '200px' }}>
                  <img
                    // src={bag}
                    src={fetchImages(data[0]?.icon)}
                    // src={fetchImages('baggageImage', data[0]?.image)}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-8 fs-3 text-white">
                <div>
                  <p className="fw-bold">{data[0]?.title}</p>
                  <p>{Parser().parse(data[0]?.content)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 mx-auto">
          {/* <Cabin /> */}
          <div>
            <div className="container">
              <div className="col-md-7 my-4">
                <h1 className="prime_text1 fw-bolder">
                  FREQUENTLY ASKED QUESTIONS
                </h1>
                {/* <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor i ncididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostru
                </p> */}
              </div>
              <div>
                <QuestionsAccordion />
              </div>
            </div>
          </div>
          <div className="prime_bg1 py-5">
            <div className="container">
              <div className="text-white text-center">
                <div className="d-md-flex align-items-center justify-content-between">
                  <h2 className="fw-bold display-1">Let's Talk.</h2>
                  <div className="my-3 my-md-0">
                    <button
                      className="rounded-pill inherit_bg text-white p-2"
                      style={{ border: "1px solid #71AE4D" }}
                    >
                      {data[0]?.email}
                    </button>
                  </div>
                  <h1 style={{ color: "#71AE4D" }}>{data[0]?.phone}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LuggagePolicy;
