/* global CraneSearchAPI, AvailabilityRequest, PassengerQuantity */
import { MdMenuBook, MdOutlineFlight } from "react-icons/md";
import { FaWalking } from "react-icons/fa";
import "../../style/FlightBookingNew.css";
import logo from "../../images/NGELogo.png";
import "../../style/PassangersControls.css";
import { useState, useContext, useRef, Fragment } from "react";
import { useEffect } from "react";
import PassangersControls from "../../component/PassengerControl";
import { PassangersContext } from "../../context/FlightBookingContext";

const FlightBookingNewMobile = () => {
  const api = useRef(null);
  const [tabIndex] = useState(1);
  const [portGroups, setPortGroups] = useState([]);
  // eslint-disable-next-line
  const [destPortGroups, setDestPortGroups] = useState(null);
  const [passangerVisible, setPassangerVisible] = useState(false);
  const [defaultDateValue, setDefaultDateValue] = useState("");
  const [tripType, setTripType] = useState("ONE_WAY");
  const [departureCode, setDepartureCode] = useState("");
  const [arrivalCode, setArrivalCode] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  //const [typeDepartureDate, setTypeDepartureDate] = useState("text");
  //const [typeReturnDate, setTypeReturnDate] = useState("text");

  const passanger = useContext(PassangersContext);

  const totalPassangers = passanger.allPasangers;

  const passangerInputValue = totalPassangers.map((passanger) => [
    passanger.type,
    passanger.quantity,
  ]);

  const handleTripTypeChange = (selectedTripType) => {
    setTripType(selectedTripType);
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

  const gfg_Run = () => {
    const today = new Date();
    const day = today.getDate();
    const month = (today.getMonth() + 1).toString(); // Add 1 as months are zero-based
    const monthWithZero = month.length === 1 ? `0${month}` : month; //append 0 to single month
    const year = today.getFullYear();
    const getDate = year + "-" + monthWithZero + "-" + day;

    return getDate;
  };

  useEffect(() => {
    const todayObject = new Date();
    const todayISO = todayObject.toISOString().slice(0, 10);
    setDefaultDateValue(todayISO);
    setDepartureDate(gfg_Run());
    setReturnDate(gfg_Run());
  }, []);

  useEffect(() => {
    const getData = async () => {
      api.current = new CraneSearchAPI("https://book-ngeagle.crane.aero/ibe");

      api.current?.portGroups().then((value) => {
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

  // const toggleTab = (index) => {
  //   setTabIndex(index);
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    // VALIDATION BLOCK
    if (!departureCode) {
      alert("Please select a departure city");
      return;
    }

    if (!arrivalCode) {
      alert("Please select an arrival city");
      return;
    }

    if (departureCode === arrivalCode) {
      alert("Departure and arrival cannot be the same");
      return;
    }

    if (!departureDate) {
      alert("Please select a departure date");
      return;
    }

    if (tripType === "ROUND_TRIP" && !returnDate) {
      alert("Please select a return date");
      return;
    }

    // Passenger validation
    const transformedObject = passanger.allPasangers.reduce(
      (acc, { type, quantity }) => {
        acc[type.toLowerCase()] = quantity;
        return acc;
      },
      {},
    );

    const { child = 0, adult = 0, infant = 0 } = transformedObject;

    if (adult === 0) {
      alert("At least one adult is required");
      return;
    }

    // ONLY NOW proceed
    let request = new AvailabilityRequest();
    request.lang = "EN";
    request.currency = "NGN";
    request.tripType = tripType;
    request.depPort = departureCode;
    request.arrPort = arrivalCode;
    request.departureDate = formatDate(departureDate);
    request.returnDate = formatDate(returnDate);

    let passengerQuantities = [];
    passengerQuantities.push(new PassengerQuantity("ADULT", "", adult));
    passengerQuantities.push(new PassengerQuantity("CHILD", "", child));
    passengerQuantities.push(new PassengerQuantity("INFANT", "", infant));

    request.passengerQuantities = passengerQuantities;

    api.current.searchV2(request);
  };

  return (
    <>
      <div className="d-flex justify-content-center tabsContainerMob flex flex-col">
        <div
          className="tabSectionMob  relative d-flex items-center justify-content-center  blueNavm "
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <MdOutlineFlight className="text-[18px] pb-[3px]" />

          <span className=" text-[18px] ">Book Flight</span>

          {/* <div className="rounded-full  h-[15px] w-[15px] absolute top-[20%] right-[37%] animate-pulse bg-green-500"/> */}
        </div>

        <div className="d-flex justify-content-center  tabsContainerMob flex greenNavm ">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://book-ngeagle.crane.aero/ibe/reservation?_cid"
            className="tabSectionMob d-flex justify-content-center"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop1"
          >
            <MdMenuBook />

            <span>Manage Booking</span>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://book-ngeagle.crane.aero/ibe/checkin/search?_cid"
            className="tabSectionMob d-flex justify-content-center whiteNavm "
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop2"
          >
            <FaWalking />

            <span>Online Check-In</span>
          </a>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title ModalLogo" id="staticBackdropLabel">
                <img src={logo} alt="NG logo" />
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center mb-2 mt-2">
                <div
                  className={
                    tabIndex === 1 ? "activeContent form-check" : "content"
                  }
                  onClick={() => handleTripTypeChange("ROUND_TRIP")}
                >
                  {tripType === "ROUND_TRIP" ? (
                    <input
                      className="form-check-input inputRadio"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      checked
                    />
                  ) : (
                    <input
                      className="form-check-input inputRadio"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                  )}
                  <label
                    style={{ color: "#000" }}
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
                      className="form-check-input inputRadio"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked
                    />
                  ) : (
                    <input
                      className="form-check-input inputRadio"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                  )}
                  <label
                    style={{ color: "#000" }}
                    className="form-check-label inputRadioLabel"
                    htmlFor="flexRadioDefault2"
                  >
                    One way
                  </label>
                </div>
              </div>
              <form onSubmit={onSubmit}>
                {/* Inputs passangerVisibleContainer */}
                <div className="inputs-divii">
                  <div className="inputs-divInnerii">
                    <div className="input-container28">
                      <div className="form-group" id="from">
                        <select
                          className="formcontrollg form-control-lg"
                          id="fromOptions"
                          onChange={handleDepPortChange}
                          value={departureCode}
                        >
                          <option>Select Depearture city...</option>
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

                    <div className="input-container28">
                      <div className="form-group" id="to">
                        <select
                          className="formcontrollg form-control-lg"
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

                    <div className="input-container28">
                      <input
                        className="formcontrollg form-control-lg"
                        placeholder="Departure Date"
                        type="date"
                        // onFocus={() => setTypeDepartureDate('date')}
                        // onBlur={() => setTypeDepartureDate('text')}
                        min={defaultDateValue}
                        defaultValue={defaultDateValue}
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                      />
                    </div>

                    {tripType === "ROUND_TRIP" ? (
                      <div className="input-container28">
                        <input
                          className="formcontrollg w-full form-control-lg"
                          type="date"
                          // onFocus={() => setTypeReturnDate('date')}
                          // onBlur={() => setTypeReturnDate('text')}
                          min={defaultDateValue}
                          defaultValue={defaultDateValue}
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </div>
                    ) : null}

                    <div className="input-container28">
                      <div className="" id="cabin">
                        <input
                          className="formcontrollg form-control-lg"
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
                            <PassangersControls
                              key={index}
                              passanger={passanger}
                            />
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
                  <button type="submit" className="submit-button289">
                    Search Flight
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title ModalLogo" id="staticBackdropLabel">
                <img src={logo} alt="NG logo" />
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="bookingTypeHR">
                  <div>
                    <input
                      type="radio"
                      name="reservations"
                      id="reservations_made_with_arik"
                    />

                    <label
                      htmlFor="reservations_made_with_arik"
                      className="reservations_made_with_arikt"
                    >
                      Reservations Made With Ngeagle
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="reservations"
                      id="reservations_made_with_tour_operators"
                    />

                    <label
                      htmlFor="reservations_made_with_tour_operators"
                      className="reservations_made_with_arikt"
                    >
                      Reservations Made With Tour Operators
                    </label>
                  </div>
                </div>

                <div className="bookingInputs mt-4">
                  <div className="bookingInputsFields">
                    <input
                      className="formcontrollg form-control-lg mb-4"
                      type="text"
                      name="surname"
                      placeholder="Reference Number"
                      id="surname"
                    />
                  </div>

                  <div className="bookingInputsFields">
                    <input
                      className="formcontrollg form-control-lg mb-4"
                      type="text"
                      name="pnrNumber"
                      placeholder="Last Name"
                      id="pnr_Number"
                    />
                  </div>

                  <button type="submit" className="submit-button289">
                    Check
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title ModalLogo" id="staticBackdropLabel">
                <img src={logo} alt="NG logo" />
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <b className="reservations_made_with_arikt">
                  Check in online and avoid the line at the airport !
                </b>

                <div className="bookingInputs mt-4">
                  <div className="bookingInputsFields">
                    <input
                      className="formcontrollg form-control-lg mb-4"
                      type="text"
                      name="surname"
                      placeholder="Surname"
                      id="surname"
                    />
                  </div>

                  <div className="bookingInputsFields">
                    <input
                      className="formcontrollg form-control-lg mb-4"
                      type="text"
                      name="pnrNumber"
                      placeholder="Reservation (PNR) No."
                      id="pnr_Number"
                    />
                  </div>

                  <button type="submit" className="submit-button289">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightBookingNewMobile;
