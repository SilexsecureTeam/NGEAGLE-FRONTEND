import React from 'react'
import { GrLocation } from 'react-icons/gr'

const TaxiRentalHeader = () => {
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="taxi-header">
      <div className="car-header">
        <form onSubmit={onSubmit}>
          <select>
            <option>---Select your car type---</option>
            <option></option>
            <option></option>
            <option></option>
          </select>

          <div className="input-container">
            <div className="icon">
              <GrLocation />
            </div>
            <input className="rest" type="text" />
          </div>

          <div className="input-container">
            <div className="icon">
              <GrLocation />
            </div>
            <div className="input-subcontainer">
              <input type="date" />
              <input type="time" />
            </div>
          </div>

          <div className="input-container">
            <div className="icon">
              <GrLocation />
            </div>
            <div className="input-subcontainer">
              <input type="date" />
              <input type="time" />
            </div>
          </div>

          <button className="btn">Continue Car Reservation</button>
        </form>
      </div>
    </div>
  )
}

export default TaxiRentalHeader
