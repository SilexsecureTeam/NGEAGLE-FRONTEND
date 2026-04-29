import React from 'react'
import '../style/Home/thirdpart.css'

const DealsAndOfferCard = () => {
  return (
    <div className="row justify-content-center g-0 pt-5">
      <div className="col-md-3">
        <div className="">
          <img
            className=" bg-grond "
            src={require('../images/smiley-woman.png')}
            alt=""
          />

          {/* <div className='speci'>
            <p className='greater-than'>{'>'}</p>
            <p className='less-than'>{'<'}</p>
          </div> */}
        </div>
      </div>
      <div className="px-5 third-main-part text-light col-md-3 font-weight-bold">
        <div>
          <div>
            <p>
              SERVICES THAT CAN
              <br />
              <b>TRANSFORM YOUR BUSINESS</b>
            </p>
          </div>
          <div className="d-flex d">
            <b />
            <span>01</span>
            <p>MILITARY DEAL</p>
          </div>
          <div className="d-flex d">
            <span>02</span>
            <p>NYSC DEAL</p>
          </div>
          <div className="d-flex d">
            <span>03</span>
            <p>SENIOR CITIZEN</p>
          </div>
          <div className="d-flex d">
            <span>03</span>
            <p>STUDENT DEALS</p>
          </div>
          <div className="d-flex d">
            <span>05</span>
            <p>GROUP BOOKING</p>
          </div>
        </div>
        <div className="deal-and-offer p-2 w-50 text-center text-dark">Deals & offer</div>
      </div>
      <div className="luxry-main-part shadow-sm col-md-6 px-4 py-4 d-flex justify-content-center">
        <div className="LUXURY-TRAVEL-EXPERIENCE p-5 mx-5">
          <p>
            <b>LUXURY TRAVEL EXPERIENCE</b>
          </p>
          <p>
            Learn how Ngeagle is continuing to evaluate, and make adjustments to your
            travel experience while staying in close coordination with the CDC and WHO to
            ensure your safety
          </p>
          <p className="book-naow py-2 mt-5">Book Now</p>
        </div>
      </div>
    </div>
  )
}

export default DealsAndOfferCard
