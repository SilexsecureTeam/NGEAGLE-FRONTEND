/* eslint-disable no-undef */
import {
  MdMenuBook,
  MdOutlineFlight,
} from "react-icons/md";
import "../../style/FlightBooking.css";
import "../../style/PassangersControls.css";
import { FaWalking } from "react-icons/fa";
import { useState, useContext, useRef } from "react";
import { useEffect } from "react";
import { PassangersContext } from "../../context/FlightBookingContext";
import FlightSearchingBooking from "./BookFlight/FlightSearchingBooking";

const FlightBooking = () => {
  const api = useRef(null);
  const [tabIndex, setTabIndex] = useState(1);
  const [portGroups, setPortGroups] = useState([]);
  const [tripType] = useState("ONE_WAY");
  const [departureCode, setDepartureCode] = useState(null);
  const [arrivalCode, setArrivalCode] = useState(null);
  const [departureDate] = useState([]);
  const [returnDate] = useState(new Date());

  const passanger = useContext(PassangersContext);

  useEffect(() => {
    const getData = async () => {
      api.current = new CraneSearchAPI("https://xle-stage.crane.aero/ibe");

      api.current?.portGroups().then((value) => {
        setPortGroups(Object.values(value));
      });
    };

    getData();
  }, []);

  const handleDepPortChange = (e) => {
    setDepartureCode(e.target.value);
  };

  const handleArrPortChange = (e) => {
    setArrivalCode(e.target.value);
  };

  const toggleTab = (index) => {
    setTabIndex(index);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const transformedObject = passanger.allPasangers.reduce(
      (acc, { type, quantity }) => {
        acc[type.toLowerCase()] = quantity;
        return acc;
      },
      {}
    );
    const { child, adult, infant } = transformedObject;

    const departurePort = portGroups.map((port) =>
      port?.find((s) => s.code === departureCode)
    );
    const arrivalPort = portGroups.map((port) =>
      port?.find((s) => s.code === arrivalCode)
    );

    let request = new AvailabilityRequest();
    request.lang = "EN";
    request.currency = "NGN";
    request.tripType = tripType;
    request.depPort = departurePort;
    request.arrPort = arrivalPort;
    request.departureDate = departureDate;
    request.returnDate = returnDate;
    let passengerQuantities = [];
    passengerQuantities.push(new PassengerQuantity("ADULT", "", adult));
    passengerQuantities.push(new PassengerQuantity("CHILD", "", child));
    passengerQuantities.push(new PassengerQuantity("INFANT", "", infant));
    request.passengerQuantities = passengerQuantities;
    /*
    api.current.searchV2(request);
    */
  };

  return (
    <div id="styled-flight-booking">
      <div id="tabs-container">
        <div
          className={tabIndex === 1 ? "tabs activeTabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <MdOutlineFlight />

          <span>Book Flight</span>
        </div>

        <div
          className={tabIndex === 2 ? "tabs activeTabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <MdMenuBook />

          <span>Manage Booking</span>
        </div>

        <div
          className={tabIndex === 3 ? "tabs activeTabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <FaWalking />

          <span>Online Check-In</span>
        </div>
      </div>

      <div id="content_container">
        <div className={tabIndex === 1 ? "activeContent" : "content"}>
          <FlightSearchingBooking />
        </div>
        <form
          className={
            tabIndex === 2 ? "manage-booking-form activeContent" : "content"
          }
          onSubmit={onSubmit}
        >
          <div className="bookingType">
            <label>
              <input
                type="radio"
                name="reservations"
                id="reservations_made_with_arik"
              />

              <span >
                Reservations Made With Arik
              </span>
            </label>

            <label>
              <input
                type="radio"
                name="reservations"
                id="reservations_made_with_tour_operators"
              />

              <span >
                Reservations Made With Tour Operators
              </span>
            </label>
          </div>

          <div className="bookingInputs">
            <div className="bookingInputsFields">
              <input
                type="text"
                name="surname"
                placeholder="Reference Number"
                id="surname"
              />
            </div>

            <div className="bookingInputsFields">
              <input
                type="text"
                name="pnrNumber"
                placeholder="Last Name"
                id="pnr_Number"
              />
            </div>

            <div className="bookingInputsButton">
              <button type="submit">Check</button>
            </div>
          </div>
        </form>

        <form
          className={
            tabIndex === 3
              ? "online-checkin-container activeContent"
              : "content"
          }
          onSubmit={onSubmit}
        >
          <div className="checkInHeader">
            <h1>Check in online and avoid the line at the airport !</h1>
          </div>

          <div className="bookingInputs">
            <div className="bookingInputsFields">
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                id="surname"
              />
            </div>

            <div className="bookingInputsFields">
              <input
                type="text"
                name="pnrNumber"
                placeholder=" Reservation (PNR) No."
                id="pnr_Number"
              />
            </div>

            <div className="bookingInputsButton">
              <button type="submit">Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightBooking;
