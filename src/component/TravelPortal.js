import React from 'react'
import image5 from '../images/Rectangle 212.png'

const TravelPortal = () => {
  return (
    <div>
      <div className="row g-0">
        <div className="col-md-6 order-md-2">
          <div>
            <img src={image5} alt="" className="img-fluid w-100" />
          </div>
        </div>
        <div className="col-md-6 order-md-1 prime_bg1 text-white">
          <div className="h-100  pt-5 pt-md-0 d-flex align-items-center">
            <div className="ms-md-2" style={{ padding: '0 15%' }}>
              <h5 className="prime_text1 mb-4 fw-bold">MORE ABOUT US</h5>
              <p className="fs-4 fw-semibold">Travel Planning Portal</p>
              <p className="mb-4">
                Millennium Park is the city’s largest public park. It is located in the
                Maitama neighborhood. It is close to the former Presidential Palace, as
                well as the city’s presidential and administrative buildings. The
                remarkable pedestrian architecture, solar-powered night lighting, and,
                most notably, the moving fountains are all features of Millennium Park.
              </p>
              <button className="border-0 p-2 prime_text1 fw-bold">VIEW DETAILS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelPortal
