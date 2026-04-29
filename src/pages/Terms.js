import React, { useState, useEffect } from "react";
// import BookingTerms from "../component/Terms/BookingTerms";
// import FlightTerms from "../component/Terms/FlightTerms";
// import BaggageTerms from "../component/Terms/BaggageTerms";
// import ChangesTerms from "../component/Terms/ChangesTerms";
// import PassengerTerms from "../component/Terms/PassengerTerms";
// import LiabilityTerms from "../component/Terms/LiabilityTerms";
// import GeneralTerms from "../component/Terms/GeneralTerms";
import useRequest from "../hooks/useRequest";
// import fetchImages from "../hooks/useFetchImages";
import { Parser } from "html-to-react";
import '../style/gen.css'

const Terms = () => {
  const [selectedComponent, setSelectedComponent] = useState(1);

  const { data, fetchData } = useRequest("termCondition", "GET");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div>
      <div className="navy_blue py-5">
        <div className="container text-white fw-bolder d-flex justify-content-center align-items-center my-5">
          <h1 className="fw-bolder">
            <span className=" tracking-widest display-1">TERMS</span> <br />{" "}
            <span className="fw-bolder ms-2 h2">AND CONDITION</span>
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="py-5">
          <div className="row">
            <div className="col-md-4 fw-semibold">
              {
                data?.map((item, key) => (
                  <div
                    onClick={() => handleButtonClick(item.id)}
                    className={
                      selectedComponent === item.id
                        ? "green_bg text-white px-4 py-2"
                        : "px-4 py-2"
                    }
                  >
                    <p className="pointer">{item.title}:</p>
                  </div>
                ))}
            </div>
            <div className="col-md-8">
              {
                data?.map((item, key) => (
                  <div key={key} className={selectedComponent === item.id ? "" : "displayBGnone"}>
                    <div>
                      <p>
                        {Parser().parse(item.content)}
                      </p>
                    </div>
                  </div>
                ))}


              {/* <h4>Content Article: 1</h4>
              <div>
                <p>
                  This Agreement ("Agreement") is entered into between the
                  individual ("Passenger" or "You") and NG Eagle Airlines ("Next
                  Generation Eagle" or "Airline"). By booking a flight or using
                  NG Eagle's services, you agree to comply with and be bound by
                  the following terms and conditions:
                </p>
              </div> */}
              {/* {selectedComponent === "booking" && <BookingTerms />}
              {selectedComponent === "flight" && <FlightTerms />}
              {selectedComponent === "baggage" && <BaggageTerms />}
              {selectedComponent === "changes" && <ChangesTerms />}
              {selectedComponent === "passenger" && <PassengerTerms />}
              {selectedComponent === "liability" && <LiabilityTerms />}
              {selectedComponent === "general" && <GeneralTerms />} */}
              {/* <p className="mt-5">
                By booking a flight with NG Eagle Airlines, you acknowledge that
                you have read, understood, and agree to abide by these terms and
                conditions. Failure to comply with these terms may result in
                denied boarding or other consequences as determined by NG Eagle.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
