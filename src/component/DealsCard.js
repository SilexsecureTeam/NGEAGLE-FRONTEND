import React from 'react'
import planeIcon from '../images/plane-tail.png'
import fetchImages from '../hooks/useFetchImages'

const DealsCard = ({ deal }) => {
  return (
    <div className="col-md-4 mb-4">
      <div style={{ height: '400px', width: '100%' }} className="bg-black mb-1">
        <img
          src={fetchImages(deal?.image)}
          // src={fetchImages('Deal', deal?.image)}
          alt=""
          className="img-fluid"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className="prime_bg1 ps-4 pb-4 text-white">
        <div className="d-flex justify-content-between align-items-end">
          <div className="">
            <p className="mb-0 fw-bold">{deal.place}</p>
            <span className="prime_text1 fw-light">Nigeria</span>
          </div>
          <div className="prime_bg2 p-2 mt-0">
            <p className="mb-0">From</p>
            <p className="mb-0 fw-semibold">₦{deal?.promoprice}</p>
          </div>
        </div>
        <div className="d-flex my-3">
          <div>
            <img src={planeIcon} alt="" width={45} className="img-fluid" />
          </div>
          <div className="fs_xsm ms-2">
            <p className="mb-0">Fri 24 Nov 2023</p>
            <p className="mb-0">Fri 24 Nov 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DealsCard
