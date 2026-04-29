/* global CraneSearchAPI, AvailabilityRequest, PassengerQuantity */
import {
  MdFlightLand,
  MdFlightTakeoff,
  MdMenuBook,
  MdOutlineFlight,
  MdAirlineSeatReclineNormal,
} from "react-icons/md";
import "../../style/FlightBookingNew.css";
import "../../style/PassangersControls.css";
import { FaWalking } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useState, useContext, useRef, Fragment } from "react";
import { useEffect } from "react";
import PassangersControls from "../../component/PassengerControl";
import { PassangersContext } from "../../context/FlightBookingContext";
// import moment from 'moment'

const FlightBookingNew = () => {
  const api = useRef(null);
  const [tabIndex, setTabIndex] = useState(1);
  const [portGroups, setPortGroups] = useState([]);
  const [defaultDateValue, setDefaultDateValue] = useState("");
  const [destPortGroups, setDestPortGroups] = useState(null);
  const [passangerVisible, setPassangerVisible] = useState(false);
  const [tripType, setTripType] = useState("ONE_WAY");
  const [departureCode, setDepartureCode] = useState(null);
  const [arrivalCode, setArrivalCode] = useState(null);
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [typeDepartureDate, setTypeDepartureDate] = useState("text");
  const [typeReturnDate, setTypeReturnDate] = useState("text");

  const passanger = useContext(PassangersContext);

  const totalPassangers = passanger.allPasangers;

  const passangerInputValue = totalPassangers.map((passanger) => [
    passanger.type,
    passanger.quantity,
  ]);

  const handleTripTypeChange = (selectedTripType) => {
    setTripType(selectedTripType);
  };

  const getTodayFormattedDate = () => {
    const d = new Date();
    const curDay = d.getDate();
    const curMonth = (d.getMonth() + 1).toString();
    const curMonthZero = curMonth.length === 1 ? "0" + curMonth : curMonth;
    const curYear = d.getFullYear();
    const finalDateStr = curYear + "-" + curMonthZero + "-" + curDay;

    return finalDateStr;
  };

  useEffect(() => {
    const todayObject = new Date();
    const todayISO = todayObject.toISOString().slice(0, 10);
    setDefaultDateValue(todayISO);
    setDepartureDate(getTodayFormattedDate());
    setReturnDate(getTodayFormattedDate());
  }, []);

  useEffect(() => {
    const getData = async () => {
      api.current = new CraneSearchAPI("https://book-ngeagle.crane.aero/ibe");

      api.current?.portGroups().then((value) => {
        // console.log(Object.values(value).filter(code !== 'NBK'))
        setPortGroups(Object.values(value));
      });
    };

    getData();
  }, []);

  useEffect(() => {
    if (
      departureCode &&
      portGroups.map((port) => port?.some((s) => s.code === departureCode))
    ) {
      const updatedGroupPort = portGroups.map((port) =>
        port?.filter((s) => s.code !== departureCode),
      );
      setDestPortGroups(updatedGroupPort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureCode]);

  const togglePassanger = () => {
    setPassangerVisible(!passangerVisible);
  };

  const handleDepPortChange = (e) => {
    setDepartureCode(e.target.value);
  };

  const handleArrPortChange = (e) => {
    setArrivalCode(e.target.value);
  };

  // const dateToFormattedDate = (date, dateRangePicker) => {
  //   const format = dateRangePicker[0].getAttribute('data-date-format').toUpperCase()
  //   return moment(date).format(format)
  // }

  // // Utility function to get input date format
  // const inputDateFormat = (dateRangePicker) => {
  //   if (dateRangePicker.length !== 0) {
  //     const format = dateRangePicker[0].getAttribute('data-date-format').toUpperCase()
  //     return format
  //   }
  // }

  const toggleTab = (index) => {
    setTabIndex(index);
  };

  const formatDate = (inputDate) => {
    if (inputDate) {
      // Split the date string into parts
      var parts = inputDate.split("-");
      // Rearrange the parts to the desired format (DD.MM.YYYY)
      var formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
      return formattedDate;
    }
    return inputDate;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const transformedObject = passanger.allPasangers.reduce(
      (acc, { type, quantity }) => {
        acc[type.toLowerCase()] = quantity;
        return acc;
      },
      {},
    );
    const { child, adult, infant } = transformedObject;

    // const departurePort = portGroups.map((port) =>
    //   port?.find((s) => s.code === departureCode)
    // )
    // const arrivalPort = portGroups.map((port) =>
    //   port?.find((s) => s.code === arrivalCode)
    // )

    let request = new AvailabilityRequest();
    request.lang = "EN";
    request.currency = "NGN";
    request.tripType = tripType;
    request.depPort = departureCode; //departurePort
    request.arrPort = arrivalCode; //arrivalPort
    request.departureDate = formatDate(departureDate);
    request.returnDate = formatDate(returnDate);
    let passengerQuantities = [];
    passengerQuantities.push(new PassengerQuantity("ADULT", "", adult));
    passengerQuantities.push(new PassengerQuantity("CHILD", "", child));
    passengerQuantities.push(new PassengerQuantity("INFANT", "", infant));
    request.passengerQuantities = passengerQuantities;
    // alert(request.depPort)
    api.current.searchV2(request);
  };

  // console.log(passanger.allPasangers)

  return (
    <div id="styled-flight-booking">
      <div className="d-flex">
        <div id="tabs-container">
          <div
            className={tabIndex === 1 ? "tabs activeTabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <MdOutlineFlight />

            <span>Book Flight</span>
          </div>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://book-ngeagle.crane.aero/ibe/reservation?_cid"
            className={tabIndex === 2 ? "tabs activeTabs" : "tabs"}
          >
            <MdMenuBook />

            <span>Manage Booking</span>
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://book-ngeagle.crane.aero/ibe/checkin/search?_cid"
            className={tabIndex === 3 ? "tabs activeTabs" : "tabs"}
          >
            <FaWalking />

            <span>Online Check-In</span>
          </a>
        </div>
        <div className="d-flex bfwhitejh">
          <div
            className={tabIndex === 1 ? "activeContent form-check" : "content"}
            onClick={() => handleTripTypeChange("ROUND_TRIP")}
          >
            {tripType === "ROUND_TRIP" ? (
              <input
                className="form-check-input inputRadio2"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked
              />
            ) : (
              <input
                className="form-check-input inputRadio2"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
            )}
            <label
              className="form-check-label inputRadioLabel"
              htmlFor="flexRadioDefault1"
            >
              Round trip
            </label>
          </div>
          <div
            className={
              tabIndex === 1 ? "activeContent form-check ms-4" : "content"
            }
            onClick={() => handleTripTypeChange("ONE_WAY")}
          >
            {tripType === "ONE_WAY" ? (
              <input
                className="form-check-input inputRadio2"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
            ) : (
              <input
                className="form-check-input inputRadio2"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
            )}
            <label
              className="form-check-label inputRadioLabel"
              htmlFor="flexRadioDefault2"
            >
              One way
            </label>
          </div>
        </div>
      </div>

      <div id="content_container">
        <form
          className={tabIndex === 1 ? "activeContent" : "content"}
          onSubmit={onSubmit}
        >
          {/* Inputs passangerVisibleContainer */}
          <div className="inputs-div">
            <div className="inputs-divInner">
              <div className="input-container2">
                <label htmlFor="from">From*</label>

                <div className="input-group" id="from">
                  <span className="IconSvgSize">
                    <MdFlightTakeoff />
                  </span>

                  <select
                    id="fromOptions"
                    onChange={handleDepPortChange}
                    value={departureCode}
                  >
                    <option>Select Departure city...</option>
                    {portGroups?.map((port, index) => (
                      <Fragment key={index}>
                        {port?.map((s, index) => (
                          <option value={s.code} key={index}>
                            {s.cityName}({s.code})
                          </option>
                        ))}
                      </Fragment>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-container2">
                <label htmlFor="to">To*</label>

                <div className="input-group" id="to">
                  <span className="IconSvgSize">
                    <MdFlightLand />
                  </span>

                  <select
                    id="toOptions"
                    onChange={handleArrPortChange}
                    value={arrivalCode}
                  >
                    <option>Select Arrival city...</option>
                    {departureCode ? (
                      <>
                        {destPortGroups?.map((port, index) => (
                          <Fragment key={index}>
                            {port.map((s, index) => (
                              <option value={s.code} key={index}>
                                {s.cityName} ({s.code})
                              </option>
                            ))}
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <option>...</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="input-container2">
                <label htmlFor="date">Date*</label>
                <div className="d-flex dateGroupInput" id="date">
                  <div className="inputGroup">
                    <span className="dataIconArea">
                      <BsFillCalendarDateFill />
                    </span>
                  </div>
                  <div className="mt-2 ms-2">
                    <input
                      className="removeIconDate"
                      placeholder="Departure"
                      type={typeDepartureDate}
                      onFocus={() => setTypeDepartureDate("date")}
                      onBlur={() => setTypeDepartureDate("text")}
                      min={defaultDateValue}
                      defaultValue={defaultDateValue}
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>

                  {tripType === "ROUND_TRIP" ? (
                    <>
                      <div className="me-2 mt-2">-</div>
                      <div className="mt-2">
                        <input
                          className="removeIconDate"
                          placeholder="Return"
                          type={typeReturnDate}
                          onFocus={() => setTypeReturnDate("date")}
                          onBlur={() => setTypeReturnDate("text")}
                          min={defaultDateValue}
                          defaultValue={defaultDateValue}
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="input-container2">
                <label htmlFor="cabin">Passenger & Cabin*</label>

                <div className="input-group" id="cabin">
                  <span>
                    <MdAirlineSeatReclineNormal />
                  </span>

                  <input
                    type="text"
                    name=""
                    id=""
                    value={passangerInputValue}
                    onClick={() => togglePassanger()}
                  />

                  {/* The dropdown for selecting the amount of passangers */}
                  <div
                    className={`pasangers-controls-container ${
                      passangerVisible ? "show" : ""
                    }`}
                    show={passangerVisible}
                  >
                    {totalPassangers.map((passanger, index) => (
                      <PassangersControls key={index} passanger={passanger} />
                    ))}

                    <button
                      type="button"
                      className="submit-button2"
                      onClick={() => togglePassanger()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="submit-button2 heiButtighh">
              Search Flight
            </button>
          </div>
        </form>

        <form
          className={
            tabIndex === 2 ? "manage-booking-form activeContent" : "content"
          }
        >
          <div className="bookingType">
            <div>
              <input
                type="radio"
                name="reservations"
                id="reservations_made_with_arik"
              />

              <label htmlFor="reservations_made_with_arik">
                Reservations Made With Ngeagle
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="reservations"
                id="reservations_made_with_tour_operators"
              />

              <label htmlFor="reservations_made_with_tour_operators">
                Reservations Made With Tour Operators
              </label>
            </div>
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

export default FlightBookingNew;
