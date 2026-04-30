/* eslint-disable no-undef */

import "../../style/FlightBookingNew.css";
import "../../style/PassangersControls.css";
import { useState, useContext, useRef, Fragment } from "react";
import { useEffect } from "react";
import PassangersControls from "../../component/PassengerControl";
import { PassangersContext } from "../../context/FlightBookingContext";

const NavBarSticky = () => {
  const api = useRef(null);
  // eslint-disable-next-line
  const [tabIndex, _setTabIndex] = useState(1);
  const [defaultDateValue, setDefaultDateValue] = useState("");
  const [passangerVisible, setPassangerVisible] = useState(false);
  const [portGroups, setPortGroups] = useState([]);
  const [destPortGroups, setDestPortGroups] = useState(null);
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

  const handleTripTypeChange = (selectedTripType) => {
    setTripType(selectedTripType);
  };

  const gfg_Run = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Add 1 as months are zero-based
    const year = today.getFullYear();
    const getDate = year + "-" + month + "-" + day;

    return getDate;
  };

  useEffect(() => {
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);
    setDefaultDateValue(dateString);
    setDepartureDate(gfg_Run);
    setReturnDate(gfg_Run);
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
  //   setTabIndex(index)
  // }

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
    // console.log(request)
    api.current.searchV2(request);
  };

  return (
    <div>
      <div className="d-flex justify-content-start">
        <div
          className={tabIndex === 1 ? "activeContent form-check" : "content"}
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
            className="form-check-label inputRadioLabelWht"
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
            className="form-check-label inputRadioLabelWht"
            htmlFor="flexRadioDefault2"
          >
            One way
          </label>
        </div>
      </div>
      <form className="navBkContent mb-4" onSubmit={onSubmit}>
        {/* Inputs passangerVisibleContainer */}
        <div className="inputs-div">
          <div className="inputs-divInner">
            <div className="input-container2">
              <label htmlFor="from">From*</label>

              <div className="input-group mobuiir" id="from">
                {/* <span className="IconSvgSize">
                    <MdFlightTakeoff />
                </span> */}

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

              <div className="input-group mobuiir" id="to">
                {/* <span className="IconSvgSize">
                    <MdFlightLand />
                </span> */}

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
                              {s.cityName}({s.code})
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
              <div className="d-flex dateGroupInputTop" id="date">
                <div>
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
                  <div className="d-flex">
                    <div className="me-2"> - </div>
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
                ) : null}
              </div>
            </div>

            <div className="input-container2">
              <label htmlFor="cabin">Passenger & Cabin*</label>

              <div className="input-group mobuiir" id="cabin">
                {/* <span>
                    <MdAirlineSeatReclineNormal />
                </span> */}

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
    </div>
  );
};

export default NavBarSticky;
