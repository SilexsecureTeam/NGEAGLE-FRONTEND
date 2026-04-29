import React from 'react'
import taxi from '../../images/taxi.png'
import cli1 from '../../images/cil_taxi.png'
import cli2 from '../../images/cil_taxi(1).png'
import taxi2 from '../../images/Rectangle 212(1).png'

const TaxiRentalBody = () => {
  return (
    <div className="rental-body">
      <div className="body-div">
        <img src={taxi} alt="" />
        <div className="grid-body">
          <div>
            <img src={cli1} alt="" />
            <h3>Special Rate on car booking</h3>
            <p>
              Millennium Park is the city’s largest public park. It is located in the
              Maitama neighborhood. It is close to the former Presidential Palace, as well
              as the city’s presidential and administrative buildings. The remarkable
              pedestrian architecture, solar-powered night lighting, and, most notably,
              the moving fountains are all features of Millennium Park.
            </p>

            <button className="btn">View Details</button>
          </div>
        </div>
      </div>
      <div className="body-div right">
        <img src={taxi2} alt="" />
        <div className="grid-body">
          <div>
            <img src={cli2} alt="" />
            <h3>Special Rate on car booking</h3>
            <p>
              Millennium Park is the city’s largest public park. It is located in the
              Maitama neighborhood. It is close to the former Presidential Palace, as well
              as the city’s presidential and administrative buildings. The remarkable
              pedestrian architecture, solar-powered night lighting, and, most notably,
              the moving fountains are all features of Millennium Park.
            </p>

            <button className="btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxiRentalBody
