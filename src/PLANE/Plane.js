import React, { useEffect } from "react";
import "../PLANE/planen.css";
import useRequest from "../hooks/useRequest";
import { Carousel } from "react-bootstrap";
import fetchImages from "../hooks/useFetchImages";
import FlightBookingNew from "../Layout/components/FlightBookingNew";
import FlightBookingNewMobile from "../Layout/components/FlightBookingNewMobile";

function Plane() {
  const { data, error, fetchData, loading } = useRequest("promo", "POST");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  return (
    <div className="main_hero">
      {!loading && !error ? (
        <Carousel controls={false} indicators={false}>
          {data?.map((slide, index) => (
            <Carousel.Item className="ppplan" key={index}>
              <div className="image-div auto-animation transformed">
                <div>
                  <img
                    className="img-fluid"
                    src={fetchImages(slide?.image)}
                    alt=""
                  />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
      <div className="booking_card bookingCardDesktop">
        <FlightBookingNew />
      </div>
      <div className="bookingCardMobile">
        <FlightBookingNewMobile />
      </div>
    </div>
  );
}

export default Plane;
