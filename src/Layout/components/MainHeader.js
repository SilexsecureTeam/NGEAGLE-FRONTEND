import React, { useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import './MainHeader.css'

export default function MainHeader({ selected }) {
  const [tripType, setTripType] = useState('')

  useEffect(() => {
    const getData = async () => {
      // eslint-disable-next-line no-undef
      const api = new CraneSearchAPI('https://xle-stage.crane.aero/ibe')
      //const api = new CraneSearchAPI('https://xle-stage.crane.aero/ibe');
      console.log(api.portCodes())
      console.log(api.portNames())
      console.log(api.portGroupsFor())
      console.log(api.languages())
      console.log(api.currencies())
      console.log(api.cabinClasses())
      console.log(api.portGroups())
      console.log(api.maxSegmentCount())
      console.log(api.maxPassengerCount())
    }

    getData()
  }, [])

  return (
    <React.Fragment>
      <div className="booking-div pb-4 mainHeaderContainer">
        {selected === 'book' ? (
          <div className="booking-column d-block d-md-flex">
            <select
              className="booking_select"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option>---Select Trip Type---</option>
              <option value="round">Round Trip</option>
              <option value="one-way">One Way</option>
            </select>
            {/* <div className="date-container">
              <input
                className="inp border-0"
                placeholder="dd/mm/yy"
                style={{ padding: '10px' }}
              />
            </div> */}

            {/* Previous input is below */}
            <div className="date-container">
              <DateTimePicker label="Depart" className="date-field" /> -{' '}
              {tripType !== 'one-way' ? (
                <DateTimePicker label="Return" className="date-field" />
              ) : null}
            </div>

            <select className="passenger_select">
              <option>1 Passenger</option>
              <option>2 Passengers</option>
              <option>3 Passengers</option>
            </select>
          </div>
        ) : selected === 'check-in' ? (
          <div className="ps-4 booking-column">
            <input placeholder="Reference Number" />
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
          </div>
        ) : selected === 'bookings' ? (
          <div className="ps-4 booking-column">
            <input placeholder="Reference Number" />
            <input placeholder="Last Name" />
          </div>
        ) : selected === 'flights' ? (
          <div className="booking-column">
            <input placeholder="Flight Number" />
            <input type="date" />
          </div>
        ) : null}
      </div>
    </React.Fragment>
  )
}
